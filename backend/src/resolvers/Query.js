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

	/*async items(parent, args, ctx, info) {
     const items = await ctx.db.query.items();
     return items;
 } */
};

module.exports = Query;
