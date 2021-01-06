/*
	A quick side note to as reminder to myself before reading this test case

	1. This test case is for Item.js which is just a component that renders out each individual item, there is no query or mutation going on
	2. Writing test cases with enzyme is just like writing any regular components in React
*/

import ItemComponent from "../components/Item";
import { shallow } from "enzyme";
//This is just an adaptor that helps snapshot testing little more readable (HTML format) by getting rid of the properties we don't need
import toJSON from "enzyme-to-json";

// To start off, we create a fake item and populate it with all the necessary fields. If you forget what fields are required, refer back to the component
const fakeItem = {
	id: "ABS123",
	title: "A cool item",
	price: 4000,
	description: "This item is really cool",
	image: "dog.jpg",
	largeImage: "largedog.jpg",
};

/*
	It's always good practice to name the test case the component you're testing
	
	The [shallow()] will only renders the top level component
	[debug()] will show you in console the HTML structure of said render item
*/
describe("<Item />", () => {
	it("render and matches the snapshow", () => {
		const wrapper = shallow(<ItemComponent item={fakeItem} />);
		expect(toJSON(wrapper)).toMatchSnapshot();
	});

	it("renders the image properly", () => {
		{
			/*
		const wrapper = shallow(<ItemComponent item={fakeItem} />);
		const Image = wrapper.find("img");
		*/
		}

		// console.log(wrapper.debug());
		{
			/*
		expect(Image.props().src).toBe(fakeItem.image);
		expect(Image.props().alt).toBe(fakeItem.title);
	 */
		}
	});

	it("renders the PriceTag properly", () => {
		{
			/* 
			const wrapper = shallow(<ItemComponent item={fakeItem} />);
		const PriceTag = wrapper.find("PriceTag");
		*/
		}

		// console.log(wrapper.debug());
		// console.log(PriceTag.children().debug());
		// console.log(Image.props());
		{
			/*
		expect(PriceTag.children().text()).toBe("$50");
		expect(wrapper.find("Title a").text()).toBe(fakeItem.title);
		*/
		}
	});

	it("renders the button properly", () => {
		{
			/*
		const wrapper = shallow(<ItemComponent item={fakeItem} />);
		const ButtonList = wrapper.find(".buttonList");
	 */
		}
		// console.log(ButtonList.children().debug());
		{
			/*
		expect(ButtonList.children()).toHaveLength(3);
		expect(ButtonList.find("Link")).toHaveLength(1);
		expect(ButtonList.find("Link").exists()).toBe(true);
		expect(ButtonList.find("AddToCart").exists()).toBe(true);
		expect(ButtonList.find("DeleteItem").exists()).toBe(true);
		*/
		}
	});
});
