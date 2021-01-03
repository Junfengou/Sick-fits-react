/*
  The purpose of this helper method is to calculate all the items added into the cart

  initial value is 0

  we take in the tally and item 

  if(the item still exist) => there is a possibility that the item is still in the cart but the actual item is already deleted
*/

export default function calcTotalPrice(cart) {
	return cart.reduce((tally, cartItem) => {
		if (!cartItem.item) return tally;
		return tally + cartItem.quantity * cartItem.item.price;
	}, 0);
}
