import React from "react";
import SingleItem from "../components/SingleItem";

function Item({ query }) {
	return (
		<div>
			<SingleItem id={query.id} />
		</div>
	);
}

export default Item;
