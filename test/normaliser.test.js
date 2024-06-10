const { isClass } = require("./utils.js");
const Normaliser = require('../src/index');
let n = null;
describe("Normaliser", () =>{
    beforeEach(() => {
        n = new Normaliser();
    });
    describe("The normalise class", () => {
        test("should be a class", () => {
            expect(isClass(Normaliser)).toBe(true);
        });

        test("should have property titles", () => {
            expect(n).toHaveProperty("titles");
        });

        test("titles should be an array with at least two values", () => {
            expect(Array.isArray(n.titles)).toBe(true);  // Check if titles is an array
            expect(n.titles.length).toBeGreaterThanOrEqual(2);  // Check if titles has at least two values
        });

        test("titles should contain Software engineer and Accountant", () => {
            expect(n.titles).toEqual(expect.arrayContaining(["Software engineer", "Accountant"]));
        });
    });
});