import React from "react";
import Reset from "../components/Reset";

function reset(props) {
	return (
		<div>
			<p>Reset your password {props.query.resetToken}</p>
			<Reset resetToken={props.query.resetToken} />
		</div>
	);
}

export default reset;
