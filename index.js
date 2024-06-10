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
        if (!input || input === "Unknown Title") {
            return "";
        };
        
        let strMatch = "";
        let q = 0.0;
        let threshold = 0.2; 
    
        //loop through the titles and chech if the score of that input and title[1] has the best match score
        for (const title of this.titles) {
            const score = this.jaccardSimilarity(input, title);
            //console.log(`Comparing "${input}" with "${title}": similarity score = ${score}`); // debugging
            if (score > q) {
                q = score;
                strMatch = title;
            }
        }
        // Return the best match if it exceeds the threshold, otherwise return an empty string
        //console.log(`Best match for "${input}": "${strMatch}" with score = ${q}`); // for debugging
        return q >= threshold ? strMatch : "";
    }
};

module.exports = Normaliser;

/*** initial testing
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

jt = "Unknown Title";
normalisedTitle = n.normalise(jt);
console.log(normalisedTitle);  // output: "Accountant"
***/