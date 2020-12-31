import React from "react";
import Link from "next/link";
import Items from "../components/Items";

function Home(props) {
	return (
		<div>
			<h1>Home page</h1>
			<Items page={parseFloat(props.query.page) || 1} />
		</div>
	);
}

export default Home;
