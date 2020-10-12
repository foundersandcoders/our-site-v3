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
  // wait until we have every response
  const kata = await Promise.all(responses);
  // sort kata by rank (they are negative numbers so need Math.abs to compare)
  kata.sort((a, b) => Math.abs(b.rank.id) - Math.abs(a.rank.id));
  return kata;
};
