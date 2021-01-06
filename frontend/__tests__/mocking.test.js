/*
    Sometime testing an component that contains a fucntion that calls an external API can be exhausting because each time 
    you fire off a test case, you will have to wait for it to gather the data back from that API. (not to mention that most api have it's own test folders)

    What [Mocking] do is it allows you to pretend what data you think will come back and proceed to test that component
*/

function Person(name, foods) {
	this.name = name;
	this.foods = foods;
}

/* This is a function that live on every person
   after 2 seconds, it will return the favorite food
   
   This is stimulate an existing api request
*/
Person.prototype.fetchFavFoods = function () {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(this.foods), 2000);
	});
};

describe("mocking", () => {
	it("mocks a reg function", () => {
		const fetchDogs = jest.fn();
		fetchDogs("snickers");
		expect(fetchDogs).toHaveBeenCalled();
		expect(fetchDogs).toHaveBeenCalledWith("snickers");
		fetchDogs("hugo");
		expect(fetchDogs).toHaveBeenCalledTimes(2);
	});

	it("can create a person", () => {
		const me = new Person("OG", ["pizza", "burgers"]);
		expect(me.name).toBe("OG");
	});

	it("it can fetch food", async () => {
		const me = new Person("OG", ["pizza", "burgers"]);
		// mock the favFoods function
		me.fetchFavFoods = jest.fn().mockResolvedValue(["sushi", "ramen"]);
		const favFoods = await me.fetchFavFoods();
		expect(me.name).toBe("OG");
		// console.log(favFoods);
		expect(favFoods).toContain("sushi");
	});
});
