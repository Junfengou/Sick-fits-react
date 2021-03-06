import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { Mutation } from "react-apollo";
import Router from "next/router";
import NProgress from "nprogress";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import calcTotalPrice from "../lib/calcTotalPrice";
import Error from "./ErrorMessage";
import User, { CURRENT_USER_QUERY } from "./User";

function totalItem(cart) {
	return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}

const CREATE_ORDER_MUTATION = gql`
	mutation createOrder($token: String!) {
		createOrder(token: $token) {
			id
			charge
			total
			items {
				id
				title
			}
		}
	}
`;

export class TakeMyMoney extends Component {
	onToken = (res, createOrder) => {
		console.log("On Token Called!");
		console.log(res.id);
		// manually call the mutation once we have the stripe token
		createOrder({
			variables: {
				token: res.id,
			},
		}).catch((err) => {
			alert(err.message);
		});
	};

	render() {
		return (
			<div>
				<User>
					{({ data: { me } }) => (
						<Mutation
							mutation={CREATE_ORDER_MUTATION}
							refetchQueries={[{ query: CURRENT_USER_QUERY }]}
						>
							{(createOrder) => (
								<StripeCheckout
									amount={calcTotalPrice(me.cart)}
									name="Sick Fits"
									description={`Order of ${totalItem(me.cart)} items!`}
									image={me.cart[0].item && me.cart[0].item.image}
									stripeKey="pk_test_51I5w86L6WESAJmN2ZO48bwEU8u16s8npi8Gii4KYBLPEQkpZdVlDjr6YHSJrEfTaQotgKs27tBxJQhWvRrixuLNp00q8G6TZ3S"
									currency="USD"
									email={me.email}
									token={(res) => this.onToken(res, createOrder)}
								>
									{this.props.children}
								</StripeCheckout>
							)}
						</Mutation>
					)}
				</User>
			</div>
		);
	}
}

export default TakeMyMoney;

/*

function TakeMyMoney(props) {
	return (
		<div>
			<User>{({ data: { me } }) => <p>{props.children}</p>}</User>
		</div>
	);
}

*/
