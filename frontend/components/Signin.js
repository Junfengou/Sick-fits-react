import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import { formatError, GraphqlError } from "graphql";
import { CURRENT_USER_QUERY } from "./User";
import Router from "next/router";

const SIGNIN_MUTATION = gql`
	mutation SIGNIN_MUTATION($email: String!, $password: String!) {
		signin(email: $email, password: $password) {
			id
			email
			name
		}
	}
`;

class Signin extends Component {
	state = {
		name: "",
		password: "",
		email: "",
	};
	saveToState = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	render() {
		return (
			<Mutation
				refetchQueries={[{ query: CURRENT_USER_QUERY }]}
				mutation={SIGNIN_MUTATION}
				variables={this.state}
			>
				{(signin, { error, loading, data }) => {
					// console.log("return data: ", data);
					return (
						/**
						 * VERY IMPORTANT
						 *  When the form is submitted, often time the information in the form will come back as url form and the email and password are exposed
						 *  This could lead to various of serious security issues as these information will be saved in history and exposed to outside threats
						 *
						 * To prevent this from happening, use [method="post"]
						 */
						<Form
							method="post"
							onSubmit={async (e) => {
								e.preventDefault();
								const res = await signin();
								console.log(res);
								this.setState({ name: "", email: "", password: "" });
								Router.push({ pathname: "/" });
							}}
						>
							<fieldset disabled={loading} aria-busy={loading}>
								<h2>Sign In</h2>
								<Error error={error} />
								<label htmlFor="email">
									Email
									<input
										type="email"
										name="email"
										placeholder="email"
										value={this.state.email}
										onChange={this.saveToState}
									/>
								</label>

								<label htmlFor="password">
									Password
									<input
										type="password"
										name="password"
										placeholder="password"
										value={this.state.password}
										onChange={this.saveToState}
									/>
								</label>

								<button type="submit">Sign In!</button>
							</fieldset>
						</Form>
					);
				}}
			</Mutation>
		);
	}
}
export default Signin;
