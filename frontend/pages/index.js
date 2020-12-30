import React from "react";
import Link from "next/link";
import Items from "../components/Items";

function index() {
	return (
		<div>
			<h1>Home page</h1>
			<Items />
		</div>
	);
}

export default index;
