import formatMoney from "../lib/formatMoney";

//describe is used to group together all the tests
describe("sample test 101", () => {
	//test() and it() are the same, it comes down to preference
	it("works as expected", () => {
		const age = 100;
		expect(1).toEqual(1);
		expect(age).toEqual(100);
	});
});
