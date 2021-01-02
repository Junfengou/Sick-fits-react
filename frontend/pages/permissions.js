import React from "react";
import PleaseSignIn from "../components/PleaseSignIn";
import Permissions from "../components/Permissions";
import User from "../components/User";

function permissions() {
	return (
		<User>
			{({ data: { me } }) => (
				<>{me ? <Permissions /> : <p>You have to log in to see this page</p>}</>
			)}
		</User>
	);
}

export default permissions;

/*
{me ? <Permissions /> : <p>Nothing to see here</p>}

*/
