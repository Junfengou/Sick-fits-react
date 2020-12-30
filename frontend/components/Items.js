import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Item from "./Item";

const All_ITEMS_QUERY = gql`
	query All_ITEMS_QUERY {
		items {
			id
			title
			price
			description
			image
			largeImage
		}
	}
`;

export class Items extends Component {
	render() {
		return (
			<Center>
				<Query query={All_ITEMS_QUERY}>
					{/**(payload) => {} */}
					{({ data, error, loading }) => {
						console.log(data);
						if (loading) return <p>Loading...</p>;
						if (error) return <p>Error: {error.message}</p>;
						return (
							<ItemsList>
								{data.items.map((item, key) => (
									<Item item={item} key={item.id} />
								))}
							</ItemsList>
						);
					}}
				</Query>
			</Center>
		);
	}
}

const Center = styled.div`
	text-align: center;
`;

const ItemsList = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 60px;
	max-width: ${(props) => props.theme.maxWidth};
	margin: 0 auto;
`;

export default Items;
export { All_ITEMS_QUERY };
