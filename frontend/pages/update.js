import React from "react";
import UpdateItem from "../components/UpdateItem";

const Sell = ({ query }) => (
	<div>
		{/* <UpdateItem /> */}
		<h2>Update page</h2>
		<UpdateItem id={query.id} />
	</div>
);

export default Sell;
