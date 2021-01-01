import React from "react";
import styled from "styled-components";
import SignupPage from "../components/Signup";

function signup(props) {
	return (
		<Columns>
			<SignupPage />
			<SignupPage />
			<SignupPage />
		</Columns>
	);
}

const Columns = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	grid-gap: 20px;
`;

export default signup;
