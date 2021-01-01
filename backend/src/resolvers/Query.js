const { forwardTo } = require("prisma-binding");

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
};

module.exports = Query;
