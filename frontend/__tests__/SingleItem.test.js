import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import wait from "waait";
import SingleItem, { SINGLE_ITEM_QUERY } from "../components/SingleItem";
import { MockedProvider } from "react-apollo/test-utils";
import { fakeItem } from "../lib/testUtils";

/*
    What's happening here is we are making testing a component that contains Query 
    Normally a ApolloProvider wrap the App at the highest level, thus all the components inside the App is able to do query/mutation.
    However, in testing we don't have that option...


    IMPORTANT: 
    One way to go around this problem is to create a MockProvider to mimic the ApolloProvider and give it a "mock query" request 
    and specify what data are suppose to return
*/
describe("<SingleItem />", () => {
	it("render with proper data", async () => {
		const mocks = [
			{
				// When someone make a request with this query and variable combo
				request: { query: SINGLE_ITEM_QUERY, variables: { id: "123" } },
				// return this mock data
				result: { data: { item: fakeItem() } },
			},
		];

		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<SingleItem id="123" />
			</MockedProvider>
		);
		// console.log(wrapper.debug());
		expect(wrapper.text()).toContain("Loading...");
		await wait();
		wrapper.update();
		// console.log(wrapper.debug());
		expect(toJSON(wrapper.find("h2"))).toMatchSnapshot();
		expect(toJSON(wrapper.find("img"))).toMatchSnapshot();
		expect(toJSON(wrapper.find("p"))).toMatchSnapshot();
	});

	it("Not found item", async () => {
		const mocks = [
			{
				// When someone make a request with this query and variable combo
				request: { query: SINGLE_ITEM_QUERY, variables: { id: "123" } },
				// return this mock data
				result: {
					errors: [{ message: "Item not found" }],
				},
			},
		];

		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<SingleItem id="123" />
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		// console.log(wrapper.debug());
		const item = wrapper.find('[data-test="graphql-error"]');
		// console.log(item.debug());
		expect(item.text()).toContain("Item not found");
		expect(toJSON(item)).toMatchSnapshot();
	});
});
