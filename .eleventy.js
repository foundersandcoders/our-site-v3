const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItDecorate = require("markdown-it-decorate");
const markdownItCheckbox = require("markdown-it-task-lists");
const slugify = require("@sindresorhus/slugify");

module.exports = (config) => {
  // Netlify CMS expects to be served from /admin
  config.addPassthroughCopy({ "src/pages/cms": "/admin" });
  // deploy fonts, media and OpenGraph images untouched
  config.addPassthroughCopy("src/assets/fonts");
  config.addPassthroughCopy("src/assets/media");
  config.addPassthroughCopy("src/assets/og");
  config.addPassthroughCopy("src/assets/js");
  // deploy favicons at the root for best browser support
  config.addPassthroughCopy({ "src/assets/icons": "/" });
  config.addPassthroughCopy("src/sw.js");

  // needed to merge tags from specific files with directory-level data
  config.setDataDeepMerge(true);

  // lets us show Stories excerpts
  // use "<!-- excerpt -->" to separate excerpt at beginning
  config.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->",
  });

  const md = markdownIt({
    html: true, // passthrough raw html in md files
    linkify: true, // auto-link URLs
    typographer: true, // smartquotes, other nicer symbols
  }).disable("code");

  md.use(markdownItAnchor, {
    slugify, // nicer url slugs
    permalink: true, // show link to headings
    permalinkSymbol: `<svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M18 8 C18 8 24 2 27 5 30 8 29 12 24 16 19 20 16 21 14 17 M14 24 C14 24 8 30 5 27 2 24 3 20 8 16 13 12 16 11 18 15"></path></svg>`,
    permalinkClass: "heading-anchor",
  });
  // allows us to add classes etc to markdown elements
  md.use(markdownItDecorate);
  // enable GitHub style checkbox lists
  md.use(markdownItCheckbox, { label: true, enabled: true });

  config.setLibrary("md", md);

  config.addFilter("formatDate", (d) => {
    const date = new Date(d);
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  config.addFilter("markdown", (s) => md.render(s));
  config.addFilter("disableForm", () => {
    const now = new Date();
    while (now.getDay() !== 3) {
      now.setDate(now.getDate() + 1);
    }
  });
  return {
    dir: {
      // configure Eleventy to look in src/ for everything
      input: "src",
    },
    markdownTemplateEngine: "njk",
  };
};
