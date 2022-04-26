
/************************************************
 * 
 * Usage: 
 *  > node rollback.js 932LAAGOT3 APIKEY micah.garside-white@algolia.com#atis-prods
 */

const algoliasearch = require('algoliasearch');
const fetch = require('node-fetch');

const appID     = process.argv.slice(2)[0];
const apiKey    = process.argv.slice(3)[0];
const indexName = process.argv.slice(4)[0];

const client = algoliasearch(appID, apiKey);
const index = client.initIndex(indexName);
 
(async function() {

    const hash = "512b4c46c4b7c156fd0217c8232109d6c144448d";
    const fileName = `https://raw.githubusercontent.com/mgarside-algolia/mvp-commit/${hash}/export.json`;

    // grab the data from GH based on specific version
    const res = await fetch(fileName);
    const rules = await res.json();

    // push the rules data back to the index
    index.saveRules(rules).then(() => {
        console.log("done!");
    });
})();