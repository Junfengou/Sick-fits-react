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
	// createDog(parent, args, ctx, info) {
	//   global.dogs = global.dogs || [];
	//   // create a dog
	//   const newDog = { name: args.name };
	//   global.dogs.push(newDog);
	//   return newDog;
	// },
};

module.exports = Mutations;
