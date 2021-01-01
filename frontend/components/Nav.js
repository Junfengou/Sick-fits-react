import React from "react";
import Link from "next/link";
import NavStyle from "./styles/NavStyles";
import User from "./User";
import Signout from "./Signout";

function Nav() {
	return (
		<User>
			{/** [{ data: { me } }] this is two level destructuring data, it can go even deeper */}
			{({ data: { me } }) => (
				<NavStyle>
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
							<Link href="/orders">
								<a>Orders</a>
							</Link>
							<Link href="/me">
								<a>Account</a>
							</Link>
							<Signout />
						</>
					) : (
						<>
							<Link href="/signup">
								<a>Sign In</a>
							</Link>
						</>
					)}
				</NavStyle>
			)}
		</User>
	);
}

export default Nav;
