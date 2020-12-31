const Mutations = {
	async createItem(parent, args, ctx, info) {
		// TODO: Check if they are logged in

		// Here is where we interface with the prisma database
		//The database is living in the /generated/prisma.graphql

		/*anymore question, refer back to createServer.js
					the database is injected into the context or ctx
				*/

		//[ctx.db.mutation.createItem] returns a promise
		const item = await ctx.db.mutation.createItem(
			{
				data: {
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
};

module.exports = Mutations;
