import React from "react";
import styled from "styled-components";
import SignupPage from "../components/Signup";
import SigninPage from "../components/Signin";
import RequestReset from "../components/RequestReset";

function signup(props) {
	return (
		<Columns>
			<SignupPage />
			<SigninPage />
			<RequestReset />
		</Columns>
	);
}

const Columns = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	grid-gap: 20px;
`;

export default signup;
