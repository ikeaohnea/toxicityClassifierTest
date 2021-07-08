

const fs = require('fs')

const data = fs.readFileSync('merged_reduced.json', 'utf8')

const headersList = JSON.parse(data)

var headers = [];
for(var i in headersList.articles)
    //headers.push(headersList.articles[i].title.toString()); 
    headers.push(headersList.articles[i].description);
console.log(headers[i]) 

//const sentences = ['you suck', 'I love you'];

require('@tensorflow/tfjs');
const toxicity = require('@tensorflow-models/toxicity');

var finalResults = [];

// The minimum prediction confidence.
const threshold = 0.85;

// Load the model. Users optionally pass in a threshold and an array of
// labels to include.
toxicity.load(threshold).then(model => {    
    headers.forEach(header => {
        model.classify(header).then(predictions => {
            // `predictions` is an array of objects, one for each prediction head,
            // that contains the raw probabilities for each input along with the
            // final prediction in `match` (either `true` or `false`).
            // If neither prediction exceeds the threshold, `match` is `null`.
            console.log(predictions);
            finalResults.push([header,predictions]);
            console.log(finalResults[0]);   
            var jsonString = JSON.stringify(finalResults);
            fs.writeFile('finalResults_description.json', jsonString, err => {
                if (err) {
                    console.log('Error writing file', err)
                } 
            })    
        });
    });    
});

