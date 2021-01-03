import React from "react";
import CartStyle from "./styles/CartStyles";
import Supreme from "./styles/Supreme";
import CloseButton from "./styles/CloseButton";
import SickButton from "./styles/SickButton";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import User from "./User";
import CartItem from "./CartItem";
import CalcTotalPrice from "../lib/calcTotalPrice";
import formatMoney from "../lib/formatMoney";

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
		<User>
			{({ data: { me } }) => {
				if (!me) return null;
				console.log("Me from cart: ", me);
				return (
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
												<Supreme>{me.name}'s cart</Supreme>
												<p>
													You have {me.cart.length} item
													{me.cart.length === 1 ? "" : "s"} in your cart
												</p>
											</header>

											<ul>
												{me.cart.map((cartItem) => (
													<CartItem key={cartItem.id} cartItem={cartItem} />
												))}
											</ul>

											<footer>
												<p>{formatMoney(CalcTotalPrice(me.cart))}</p>
												<SickButton>Checkout</SickButton>
											</footer>
										</CartStyle>
									);
								}}
							</Query>
						)}
					</Mutation>
				);
			}}
		</User>
	);
}

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
