import React from "react";
import Link from "next/link";
import CreateItem from "../components/CreateItem";
import PleaseSignIn from "../components/PleaseSignIn";

function sell() {
	return (
		<div>
			<PleaseSignIn>
				<CreateItem />
			</PleaseSignIn>
		</div>
	);
}

export default sell;
