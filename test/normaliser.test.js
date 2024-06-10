const { isClass } = require("./utils.js");
const Normaliser = require('../index.js');
let n = null;
describe("Normaliser", () =>{
    beforeEach(() => {
        n = new Normaliser();
    });
    describe("The Normalise class", () => {
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
    describe("the normalise method", () => {
        test("it exists on the Normalise class", () => {
            expect(n).toHaveProperty("normalise"); 
        });
        test("should normalise 'Java engineer' to 'Software engineer'", () => {
            let jt = "Java engineer";
            let normalisedTitle = n.normalise(jt);
            expect(normalisedTitle).toBe("Software engineer");
        });
        test("should normalise 'C# engineer' to 'Software engineer'", () => {
            let jt = "C# engineer";
            let normalisedTitle = n.normalise(jt);
            expect(normalisedTitle).toBe("Software engineer");
        });
        test("should normalise 'Chief Accountant' to 'Accountant'", () => {
            let jt = "Chief Accountant";
            let normalisedTitle = n.normalise(jt);
            expect(normalisedTitle).toBe("Accountant");
        });
        // Edge cases
        test("should handle an empty string", () => {
            let jt = "";
            let normalisedTitle = n.normalise(jt);
            expect(normalisedTitle).toBe("");
        });

        test("should return an empty string for an unknown title", () => {
            let jt = "Unknown Title";
            let normalisedTitle = n.normalise(jt);
            expect(normalisedTitle).toBe("");
        });

        test("should be case insensitive", () => {
            let jt = "JavaScript ENGINEER";
            let normalisedTitle = n.normalise(jt);
            expect(normalisedTitle).toBe("Software engineer");
        });
        test("should handle special characters", () => {
            let jt = "soft$ware en*gi?neer";
            let normalisedTitle = n.normalise(jt);
            expect(normalisedTitle).toBe("Software engineer");
        });

        test("should handle numeric input", () => {
            let jt = "12345";
            let normalisedTitle = n.normalise(jt);
            expect(normalisedTitle).toBe("");
        });

        test("should handle a mix of known and unknown titles", () => {
            let jt = "Java engineer and Chief Accountant";
            let normalisedTitle = n.normalise(jt);
            expect(normalisedTitle).toBe("Software engineer");
        });
    });
});