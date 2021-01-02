const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "variables.env" });
const createServer = require("./createServer");
const db = require("./db");

const server = createServer();

/**
 *
 * In order to authenticate user, we will be using JWT in cookies instead of localstorage
 */

// TODO Use express middlware to handle cookies (JWT)
//This will allow us to access all the cookie objects
server.express.use(cookieParser());

// Middleware: decode the JWT so we can get user id on each request
server.express.use((req, res, next) => {
	const { token } = req.cookies;
	// console.log("token: ", token);

	// decode the token
	if (token) {
		const { userId } = jwt.verify(token, process.env.APP_SECRET);
		//put the userID onto the request for future requests to access
		req.userId = userId;
	}
	next();
});

// TODO Use express middlware to populate user on each request (THIS IS FOR PERMISSION CHECK)
server.express.use(async (req, res, next) => {
	// if they aren't logged in, skip this
	if (!req.userId) return next();

	// ['{id, permission, email, name}'] is being passed in as graphql query
	try {
		const user = await db.query.user(
			{ where: { id: req.userId } },
			"{id, permissions, email, name}"
		);
		req.user = user;
		next();
	} catch (err) {
		next(err);
	}
});

server.start(
	{
		//cors() use for frontend to talk to backend
		//credentials will only allow access if the user is authenticated
		cors: {
			credentials: true,
			origin: process.env.FRONTEND_URL,
		},
	},
	(deets) => {
		console.log(`Server is now running on port http:/localhost:${deets.port}`);
	}
);
