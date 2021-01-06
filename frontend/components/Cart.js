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

// import TakeMyMoney from "./TakeMyMoney";

// This name import is to deal with all the nested query/mutation and make them little easier to read
import { adopt } from "react-adopt";

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

// Both solution work just fine. The one that's not rendering children will throw an error in the console but it shouldn't really affect anything
const Composed = adopt({
	user: ({ render }) => <User>{render}</User>,
	toggleCart: ({ render }) => (
		<Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>
	),
	localState: <Query query={LOCAL_STATE_QUERY} />,
});

function Cart() {
	return (
		// the props[open={true}] means the cart will appear.
		// This prop is passed into the CartStyle component, so refer to that for styling if you get confused
		<Composed>
			{({ user, toggleCart, localState }) => {
				const me = user.data.me;
				if (!me) return null;
				return (
					<CartStyle open={localState.data.cartOpen}>
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
							{/* <TakeMyMoney>
								<SickButton>Checkout</SickButton>
							</TakeMyMoney> */}
							<SickButton>Checkout</SickButton>
						</footer>
					</CartStyle>
				);
			}}
		</Composed>
	);
}

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
