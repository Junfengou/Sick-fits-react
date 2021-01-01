const bcrypt = require("bcryptjs");
const salt = 10;

const jwt = require("jsonwebtoken");

const { randomBytes } = require("crypto");
const { promisify } = require("util"); // take callback base function and turn them into promise base

const { transport, makeANiceEmail } = require("../mail");

const Mutations = {
	async createItem(parent, args, ctx, info) {
		// TODO: Check if they are logged in
		if (!ctx.request.userId) {
			throw new Error("You must be logged in to do that");
		}

		// Here is where we interface with the prisma database
		//The database is living in the /generated/prisma.graphql

		/*anymore question, refer back to createServer.js
					the database is injected into the context or ctx
				*/

		//[ctx.db.mutation.createItem] returns a promise
		//[...args] is essentially spreading all the incoming fields like image, title, price, description into the data
		const item = await ctx.db.mutation.createItem(
			{
				data: {
					// this is how we create a relationship between item and user
					user: {
						connect: {
							id: ctx.request.userId,
						},
					},
					...args,
				},
			},
			/*The [info] tag below is basically fetching query command from
				the frontend and send it to the database
			*/
			info
		);

		console.log(item);

		return item;
	},

	async updateItem(parent, args, ctx, info) {
		//first take a copy of the updates
		const updates = { ...args };

		//removes the ID from the update because you don't wanna change the id of the item
		delete updates.id;

		//run the update method
		//we should await this too right?
		return await ctx.db.mutation.updateItem(
			{
				data: updates,
				where: {
					id: args.id,
				},
			},
			info
		);
	},

	async deleteItem(parent, args, ctx, info) {
		const where = { id: args.id };

		// 1. find the item
		//[`{ id title }`] is passing in raw graphql
		const item = await ctx.db.query.item({ where }, `{ id title }`);

		// 2. check if they own that item, or have the permission
		//TODO

		// 3. delete it
		return ctx.db.mutation.deleteItem({ where }, info);
	},

	async signup(parent, args, ctx, info) {
		// lowercase their email
		args.email = args.email.toLowerCase();

		// hash their password
		const password = await bcrypt.hash(args.password, salt);

		// create the user in the database
		// if you ever get confused on what to call [ctx.db.mutation], refer to [/generated/prisma.graphql] and find the method under Mutation
		const user = await ctx.db.mutation.createUser(
			{
				data: {
					...args,
					password,
					permissions: { set: ["USER"] },
				},
			},
			info
		);

		// create the JWT token for them
		const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

		// We set the jwt as a cookie on the response
		ctx.response.cookie("token", token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
		});
		// return user to the browser
		return user;
	},

	async signin(parent, { email, password }, ctx, info) {
		const user = await ctx.db.query.user({ where: { email: email } });

		// 1. check if there is a user with that email
		if (!user) {
			throw new Error(`No such user found for email ${email}`);
		}

		// 2. check if their password is correct (compare the hashed password [both passwords passed in at the point is already hashed])
		const valid = await bcrypt.compare(password, user.password);
		if (!valid) {
			throw new Error("Invalid password!");
		}

		// 3. generate the JWT token
		const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

		// 4. set the cookie with the token
		ctx.response.cookie("token", token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
		});

		// 5. return the user
		return user;
	},

	async signout(parent, args, ctx, info) {
		ctx.response.clearCookie("token");
		return { message: "You have successfully logged out!" };
	},

	async requestReset(parent, args, ctx, info) {
		// 1. check if the user is real
		const user = await ctx.db.query.user({ where: { email: args.email } });
		if (!user) {
			throw new Error(`No such user found for email ${args.email}`);
		}

		// 2. set a reset token and expiry on that user
		const randomBytesPromiseified = promisify(randomBytes);
		const resetToken = (await randomBytesPromiseified(20)).toString("hex");
		const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

		const res = await ctx.db.mutation.updateUser({
			where: { email: args.email },
			data: { resetToken: resetToken, resetTokenExpiry: resetTokenExpiry },
		});
		console.log(res);

		//TODO 3. email them the reset token
		// VERY IMPORTANT
		//<a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click here to reset</a>
		//[${process.env.FRONTEND_URL}] NEED TO BE SWAP OUT FOR PRODUCTION
		const mailResponse = await transport.sendMail({
			from: "junfengou@gmail.com",
			to: user.email,
			subject: "Your password reset token",
			html: makeANiceEmail(
				`Your password reset token is here! \n\n <a href="${
					process.env.FRONTEND_URL
				}/reset?resetToken=${resetToken}">Click here to reset</a> `
			),
		});

		// 4. return a message
		return { message: "Goodbye" };
	},

	async resetPassword(parent, args, ctx, info) {
		// 1. check if the passwords match
		if (args.password !== args.confirmPassword) {
			throw new Error("Yo Passwords don't match!");
		}

		// 2. check if its a legit reset token
		// 3. Check if its expired
		const [user] = await ctx.db.query.users({
			where: {
				resetToken: args.resetToken,
				resetTokenExpiry_gte: Date.now() - 3600000,
			},
		});
		if (!user) {
			throw new Error("This token is either invalid or expired!");
		}
		// 4. Hash their new password
		const password = await bcrypt.hash(args.password, 10);

		// 5. Save the new password to the user and remove old resetToken fields
		const updatedUser = await ctx.db.mutation.updateUser({
			where: { email: user.email },
			data: {
				password,
				resetToken: null,
				resetTokenExpiry: null,
			},
		});
		// 6. Generate JWT
		const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);

		// 7. Set the JWT cookie
		ctx.response.cookie("token", token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365,
		});

		// 8. return the new user
		return updatedUser;
	},
};

module.exports = Mutations;
