
/************************************************
 * 
 * Usage: 
 *  > ./run.sh APPID APIKEY INDEX VERSION
 * 
 */

const algoliasearch = require('algoliasearch');

const appID     = process.argv.slice(2)[0];
const apiKey    = process.argv.slice(3)[0];
const indexName = process.argv.slice(4)[0];
const versionStr = process.argv.slice(5)[0];

const client = algoliasearch(appID, apiKey);
const index = client.initIndex(indexName);

// in-place transform of json rules 
function transformRules(rulesObj, versionStr) {
    for (var i = 0; i < rulesObj.length; i++) {
        var rule = rulesObj[i];
        if (! rule.tags) {
            rule.tags = [ versionStr ];
        } else {
            rule.tags.push(versionStr);
        }
    }
    return rulesObj;
}

index.browseRules({
  batch: function(batch) {
    const transformedObj = transformRules(batch, versionStr);
    console.log(JSON.stringify(transformedObj, null, 2));
    }
})
