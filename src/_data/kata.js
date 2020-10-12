const CacheAsset = require("@11ty/eleventy-cache-assets");
const required = require("./requirements/codewars.json");

const CW_URL = "https://www.codewars.com/api/v1/code-challenges/";

module.exports = async () => {
  const responses = required.map((slug) => {
    // cache response in .cache/ folder for 5 mins
    // otherwise we might get rate-limited during dev
    return CacheAsset(CW_URL + slug, {
      duration: "5m",
      type: "json",
    }).then(({ id, name, rank, url }) => ({ id, name, rank, url }));
  });
  // return a single promise that will resolve to an array of responses
  return Promise.all(responses);
};
