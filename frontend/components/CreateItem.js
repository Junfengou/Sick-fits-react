import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";
import Router from "next/router";

/**
 * In order to send a form request to add an item, first we need to specify our action
 *  draft out mutation action with the required fields and type
 *      Then assign the specified fields to those variable [title : $title]
 *          Once that's done, it will return the id
 *
 */
const CREATE_ITEM_MUTATION = gql`
	mutation CREATE_ITEM_MUTATION(
		$title: String!
		$description: String!
		$price: Int!
		$image: String
		$largeImage: String
	) {
		createItem(
			title: $title
			description: $description
			price: $price
			image: $image
			largeImage: $largeImage
		) {
			id
		}
	}
`;

export class CreateItem extends Component {
	state = {
		title: "",
		description: "",
		image: "",
		largeImage: "",
		price: 0,
	};

	//by doing it this way, it will now work with every input field instead of writing seperate methods for each input onChange event
	handleChange = (e) => {
		const { name, type, value } = e.target;
		const val = type === "number" ? parseFloat(value) : value;
		this.setState({ [name]: val });
		// console.log(e.target.value);
		// this.setState({ title: e.target.value });
	};

	uploadFile = async (e) => {
		console.log("uploading file...");
		const files = e.target.files;
		const data = new FormData();
		data.append("file", files[0]);
		data.append("upload_preset", "sickfits");

		const res = await fetch(
			"https://api.cloudinary.com/v1_1/junworks/image/upload",
			{
				method: "POST",
				body: data,
			}
		);
		const file = await res.json();
		console.log(file);

		this.setState({
			image: file.secure_url,
			largeImage: file.eager[0].secure_url,
		});
	};

	render() {
		return (
			<Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
				{(createItem, { loading, error }) => (
					<Form
						onSubmit={async (e) => {
							//stop the from from submitting
							e.preventDefault();
							//call the mutation
							const res = await createItem();
							//change them to the single item page
							console.log(res);
							Router.push({
								pathname: "/item",
								query: { id: res.data.createItem.id },
							});
						}}
					>
						<Error error={error} />
						{/**fieldset have a option called disabled
						 *  it will basically disable the contents if a condition is true
						 *      in this case, form is disabled if loading is true
						 *      loading is only true when the user submitted the form
						 */}
						<fieldset disabled={loading} aria-busy={loading}>
							<label htmlFor="file">
								Image
								<input
									type="file"
									id="file"
									name="file"
									placeholder="Upload an image"
									required
									onChange={this.uploadFile}
								/>
								{this.state.image && (
									<img
										width="200"
										src={this.state.image}
										alt="Upload Preview"
									/>
								)}
							</label>

							<label htmlFor="title">
								Title
								<input
									type="text"
									id="title"
									name="title"
									placeholder="Title"
									required
									onChange={this.handleChange}
									value={this.state.title}
								/>
							</label>

							<label htmlFor="title">
								price
								<input
									type="number"
									id="price"
									name="price"
									placeholder="price"
									required
									onChange={this.handleChange}
									value={this.state.price}
								/>
							</label>

							<label htmlFor="title">
								Description
								<input
									id="description"
									name="description"
									placeholder="Enter a Description"
									required
									onChange={this.handleChange}
									value={this.state.description}
								/>
							</label>
							<button type="submit">Submit</button>
						</fieldset>
					</Form>
				)}
			</Mutation>
		);
	}
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
