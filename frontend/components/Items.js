import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Item from "./Item";
import Pagination from "./Pagination";
import { perPage } from "../config";

const All_ITEMS_QUERY = gql`
	query All_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
		items(first: $first, skip: $skip, orderBy: createAt_DESC) {
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
				<Pagination page={this.props.page} />
				<Query
					query={All_ITEMS_QUERY}
					//When a new item is added or deleted, the cache in each pagination is out of date unless the user manually refresh the page
					//one way to handle this issue is to use [fetchPolicy="network-only"] (IT'S NOT THE BEST WAY OF SOLVING IT BUT THERE'S NO OTHER CHOICE HMM...)
					fetchPolicy="network-only"
					variables={{
						//if it's on page two, we want to skip 2 * 4 - 4 = 4 items
						skip: this.props.page * perPage - perPage,
					}}
				>
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
				<Pagination page={this.props.page} />
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
