const { forwardTo } = require("prisma-binding");
const { hasPermission } = require("../utils");
/**
 * async items(parent, args, ctx, info)
 *
 * [parent] => parent schema we have in graphql
 * [args] => arguments that's passed in
 * [ctx] => context is a way to surface the database
 * [info] => information coming in
 */

const Query = {
	items: forwardTo("db"),
	item: forwardTo("db"),
	itemsConnection: forwardTo("db"),

	me(parent, args, ctx, info) {
		//check if there is a current userId
		if (!ctx.request.userId) {
			//it's important to return null here becasuse someone might not be logged in
			return null;
		}
		return ctx.db.query.user({ where: { id: ctx.request.userId } }, info);
	},

	async users(parent, args, ctx, info) {
		// 1. Check if they are logged in
		if (!ctx.request.userId) {
			throw new Error("You must be logged in!");
		}
		console.log(ctx.request.userId);
		// 2. Check if the user has the permissions to query all the users
		hasPermission(ctx.request.user, ["ADMIN", "PERMISSIONUPDATE"]);

		// 2. if they do, query all the users!
		return ctx.db.query.users({}, info);
	},
};

module.exports = Query;
