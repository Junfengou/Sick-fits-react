/*
    [shallow] will only render 1 level deep, meaning it will show all the necessary items
    [mount] will show the entire component item include className and all the other stuff (this will require mocking the apollo store)
*/
import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";
import CartCount from "../components/CartCount";

// Important note: ALWAYS make sure it renders before creating the snapshot

describe("<CartCount />", () => {
	it("renders", () => {
		shallow(<CartCount count={10} />);
	});

	it("matches the snapshot", () => {
		const wrapper = shallow(<CartCount count={10} />);
		expect(toJSON(wrapper)).toMatchSnapshot();
	});

	it("updates via props", () => {
		const wrapper = shallow(<CartCount count={50} />);
		expect(toJSON(wrapper)).toMatchSnapshot();
		wrapper.setProps({ count: 10 });
		expect(toJSON(wrapper)).toMatchSnapshot();
	});
});
