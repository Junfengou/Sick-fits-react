import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { All_ITEMS_QUERY } from "./Items";
import gql from "graphql-tag";

const DELETE_ITEM_MUTATION = gql`
	mutation DELETE_ITEM_MUTATION($id: ID!) {
		deleteItem(id: $id) {
			id
		}
	}
`;

export class DeleteItem extends Component {
	/**
	 * VERY IMPORTANT
			 The method below [update()] is used to update the client side. For example: 
					 When the item is deleted on the frontend, it requires the user to manually refresh the page to show the item being deleted
					 The purpose of this method is to automatically refetch the items from the backend so the cache have the most up to dated information
	 * 
	 */

	//Cache is provided by apollo
	//cache is a list of items on the DOM
	//payload is the items that are coming back after a request
	update = (cache, payload) => {
		// manually update the cache on the client, so it matches the server
		// 1. Read the cache for the items we want
		const data = cache.readQuery({ query: All_ITEMS_QUERY });
		console.log(data, payload);
		// 2. Filter the deleted item out of the page
		data.items = data.items.filter(
			(item) => item.id !== payload.data.deleteItem.id
		);
		// 3. Put the items back!
		cache.writeQuery({ query: All_ITEMS_QUERY, data });
	};

	render() {
		return (
			<Mutation
				mutation={DELETE_ITEM_MUTATION}
				variables={{
					id: this.props.id,
				}}
				update={this.update}
			>
				{(deleteItem, { error }) => (
					<button
						onClick={() => {
							if (confirm("Are you sure you want to delete this?")) {
								deleteItem();
							}
						}}
					>
						{this.props.children}
					</button>
				)}
			</Mutation>
		);
	}
}

export default DeleteItem;
