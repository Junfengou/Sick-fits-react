import React from "react";
import Link from "next/link";
import NavStyle from "./styles/NavStyles";

function Nav() {
	return (
		<NavStyle>
			<Link href="/items">
				<a>Items</a>
			</Link>
			<Link href="/sell">
				<a>Sell</a>
			</Link>
			<Link href="/signup">
				<a>Signup</a>
			</Link>
			<Link href="/orders">
				<a>Orders</a>
			</Link>
			<Link href="/me">
				<a>Account</a>
			</Link>
		</NavStyle>
	);
}

export default Nav;
