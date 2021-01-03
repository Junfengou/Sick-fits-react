import React from "react";
import formatMoney from "../lib/formatMoney";
import styled from "styled-components";
import PropTypes from "prop-types";
import RemoveFromCart from "./RemoveFromCart";

CartItem.propTypes = {
	cartItem: PropTypes.object.isRequired,
};

function CartItem({ cartItem }) {
	// 1. check if that item exist
	if (!cartItem.item)
		return (
			<CartItemsStyles>
				<p>This item has been removed</p>
				<RemoveFromCart id={cartItem.id} />
			</CartItemsStyles>
		);
	return (
		<div>
			<CartItemsStyles>
				<img width="100" src={cartItem.item.image} alt={cartItem.item.title} />
				<div className="cart-item-details">
					<h3>{cartItem.item.title}</h3>
					<p>
						{formatMoney(cartItem.item.price * cartItem.quantity)}
						{" - "}
						<em>
							{cartItem.quantity} &times; {formatMoney(cartItem.item.price)}{" "}
							each
						</em>
					</p>
				</div>
				<RemoveFromCart id={cartItem.id} />
			</CartItemsStyles>
		</div>
	);
}

const CartItemsStyles = styled.div`
	padding: 1rem 0;
	border-bottom: 1px solid ${(props) => props.theme.lightgrey};
	display: grid;
	align-items: center;
	grid-template-columns: auto 1fr auto;
	img {
		margin-right: 10px;
	}

	h3,
	p {
		margin: 0;
	}
`;

export default CartItem;
