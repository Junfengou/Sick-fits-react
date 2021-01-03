import withApollo from "next-with-apollo"; //handles server side rendering
import ApolloClient from "apollo-boost";
import { endpoint } from "../config";
import { LOCAL_STATE_QUERY } from "../components/Cart";

// This is Apollo store, basically like React Context API where it could store states at a high level

function createClient({ headers }) {
	return new ApolloClient({
		uri: process.env.NODE_ENV === "development" ? endpoint : endpoint,
		request: (operation) => {
			operation.setContext({
				fetchOptions: {
					credentials: "include",
				},
				headers,
			});
		},
		//local data
		clientState: {
			resolvers: {
				Mutation: {
					toggleCart(nothing, variables, { cache }) {
						// 1. read the cartOpen value in cache
						const { cartOpen } = cache.readQuery({ query: LOCAL_STATE_QUERY });
						console.log("cartOpen: ", cartOpen);

						// 2. write the cart state to be opposite
						// what's happening here is we query out cartOpen and immediately change it's value from true to false...vice versa
						const data = {
							data: { cartOpen: !cartOpen },
						};
						cache.writeData(data);
						console.log("data: ", data);
						return data;
					},
				},
			},
			defaults: {
				cartOpen: false,
			},
		},
	});
}

export default withApollo(createClient);
