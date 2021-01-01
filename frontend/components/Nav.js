import React from "react";
import Link from "next/link";
import NavStyle from "./styles/NavStyles";
import User from "./User";

function Nav() {
	return (
		<NavStyle>
			<User>
				{/** [{ data: { me } }] this is two level destructuring data, it can go even deeper */}
				{({ data: { me } }) => {
					console.log(me);
					if (me) return <p>{me.name}</p>;
					return null;
				}}
			</User>
			<Link href="/items">
				<a>Shop</a>
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
