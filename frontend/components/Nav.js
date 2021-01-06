import React from "react";
import Link from "next/link";
import NavStyle from "./styles/NavStyles";
import User from "./User";
import Signout from "./Signout";
import CartCount from "./CartCount";
import { Mutation } from "react-apollo";
import { TOGGLE_CART_MUTATION } from "./Cart";

function Nav() {
	return (
		<User>
			{/** [{ data: { me } }] this is two level destructuring data, it can go even deeper */}
			{({ data: { me } }) => {
				console.log("me: ", me);
				return (
					<NavStyle data-test="nav">
						<Link href="/items">
							<a>Shop</a>
						</Link>

						{/**
						 * To display multiple elements, you'll need either div or fragment
						 */}

						{me ? (
							<>
								<Link href="/sell">
									<a>Sell</a>
								</Link>

								<Signout />
								<Mutation mutation={TOGGLE_CART_MUTATION}>
									{(toggleCart) => (
										<button onClick={toggleCart}>
											My cart
											<CartCount
												count={me.cart.reduce(
													(tally, cartItem) => tally + cartItem.quantity,
													0
												)}
											></CartCount>
										</button>
									)}
								</Mutation>
							</>
						) : (
							<>
								<Link href="/signup">
									<a>Sign In</a>
								</Link>
							</>
						)}
					</NavStyle>
				);
			}}
		</User>
	);
}

export default Nav;
