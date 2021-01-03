import React from "react";
import CartStyle from "./styles/CartStyles";
import Supreme from "./styles/Supreme";
import CloseButton from "./styles/CloseButton";
import SickButton from "./styles/SickButton";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

// This query is STRICTLY client side only
// By doing this [cartOpen @client], React will know not to go to the backend to query this piece of data.

//cartOpen can be found and decleared in /lib/withData (apollo store)
const LOCAL_STATE_QUERY = gql`
	query {
		cartOpen @client
	}
`;

const TOGGLE_CART_MUTATION = gql`
	mutation {
		toggleCart @client
	}
`;

function Cart() {
	return (
		// the props[open={true}] means the cart will appear.
		// This prop is passed into the CartStyle component, so refer to that for styling if you get confused
		<Mutation mutation={TOGGLE_CART_MUTATION}>
			{(toggleCart) => (
				<Query query={LOCAL_STATE_QUERY}>
					{({ data: { cartOpen } }) => {
						console.log("client side local data: ", cartOpen);
						return (
							<CartStyle open={cartOpen}>
								<header>
									<CloseButton title="close" onClick={toggleCart}>
										&times;
									</CloseButton>
									<Supreme>Your cart</Supreme>
									<p>You have __ items in your cart</p>
								</header>
								<footer>
									<p>$10.10</p>
									<SickButton>Checkout</SickButton>
								</footer>
							</CartStyle>
						);
					}}
				</Query>
			)}
		</Mutation>
	);
}

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
