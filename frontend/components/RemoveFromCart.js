import React, { Component } from "react";
import { Mutation } from "react-apollo";
import styled from "styled-components";
import Proptypes from "prop-types";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";

const REMOVE_FROM_CART_MUTATION = gql`
	mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
		removeFromCart(id: $id) {
			id
		}
	}
`;

export class RemoveFromCart extends Component {
	static proptypes = {
		id: Proptypes.string.isRequired,
	};

	/* 
		get call as soon as we get a response back from teh server after a mutation has been performed
		cache => cache in apollo cache
	 	payload is the information we get back 
	 */
	update = (cache, payload) => {
		// 1. need the cache
		const data = cache.readQuery({ query: CURRENT_USER_QUERY });
		console.log("data : ", data);
		console.log("payload: ", payload);
		// 2. remove that item from the cart ([payload.data.removeFromCart.id] is selected item)
		const cartItemId = payload.data.removeFromCart.id;
		data.me.cart = data.me.cart.filter(
			(cartItem) => cartItem.id !== cartItemId
		);
		// 3. write it back to the cache
		cache.writeQuery({ query: CURRENT_USER_QUERY, data: data });
	};

	/* [optimisticResponse] is a way to display result before the DOM actually display it, that's if assuming that update function is working 100% of the time
		This will make deleting items on the frontend much faster. It's not required, but definitely a nice feature
	*/
	render() {
		return (
			<Mutation
				mutation={REMOVE_FROM_CART_MUTATION}
				variables={{ id: this.props.id }}
				update={this.update}
				optimisticResponse={{
					__typename: "Mutation",
					removeFromCart: {
						__typename: "cartItem",
						id: this.props.id,
					},
				}}
			>
				{(removeFromCart, { loading, error }) => (
					<BigButton
						disabled={loading}
						onClick={() => {
							removeFromCart().catch((err) => alert(err.message));
						}}
						title="Delete Item"
					>
						&times;
					</BigButton>
				)}
			</Mutation>
		);
	}
}

const BigButton = styled.button`
	font-size: 3rem;
	background: none;
	border: 0;
	&:hover {
		color: ${(props) => props.theme.red};
		cursor: pointer;
	}
`;

export default RemoveFromCart;
