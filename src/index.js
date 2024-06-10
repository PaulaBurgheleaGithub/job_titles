class Normaliser {
    constructor() {
        this.titles = ["Architect", "Software engineer", "Quantity surveyor", "Accountant"];
    }
    //get the set/list of characters from a string
    getCharSet(str) {
        return new Set([...str.toLowerCase()]);
    }
    //calculate Jaccard similarity between two strings
    jaccardSimilarity(a, b) {
        const setA = this.getCharSet(a);
        const setB = this.getCharSet(b);
        const intersection = new Set([...setA].filter(x => setB.has(x)));
        const union = new Set([...setA, ...setB]);
        return intersection.size / union.size;
    }
    
    normalise(input) {
        let strMatch = "";
        let q = 0.0;
    
        //loop through the titles and chech if the score of that input and title[1] has the best match score
        for (const title of this.titles) {
            const score = this.jaccardSimilarity(input, title);
            if (score > q) {
                q = score;
                strMatch = title;
            }
        }
        return strMatch;
    }
};

module.exports = Normaliser;

let jt = "Java engineer";
let n = new Normaliser();
let normalisedTitle = n.normalise(jt);
console.log(normalisedTitle);  // output: "Software engineer"

jt = "C# engineer";
normalisedTitle = n.normalise(jt);
console.log(normalisedTitle);  // output: "Software engineer"

jt = "Chief Accountant";
normalisedTitle = n.normalise(jt);
console.log(normalisedTitle);  // output: "Accountant"