module.exports = {
  layout: "layouts/document",
  tags: ["stories"],
  eleventyComputed: {
    permalink: (data) => {
      // external links don't need pages on our site
      if (data.url) return false;
      return `/stories/${data.page.fileSlug}/index.html`;
    },
  },
};
