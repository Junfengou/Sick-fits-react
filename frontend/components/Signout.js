import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";
import Router from "next/router";

const SIGNOUT_MUTATION = gql`
	mutation SIGNOUT_MUTATION {
		signout {
			message
		}
	}
`;

function Signout(props) {
	return (
		<Mutation
			mutation={SIGNOUT_MUTATION}
			refetchQueries={[{ query: CURRENT_USER_QUERY }]}
		>
			{(signout) => <button onClick={signout}>Sign Out</button>}
		</Mutation>
	);
}

export default Signout;
//{(signout) => <button onClick={signout}>Sign Out</button>}

/**
 * this.props.mutate(
 * {  variables:
 *  {    title: this.state.title,    content: this.state.content  },  refetchQueries:[{    query: fetchAllNotes  }] }).then(() => this.props.history.push('/notes'))
 *
 */
