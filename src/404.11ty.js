const html = require("./html");

exports.data = {
  layout: "layouts/document",
  title: "Page not found",
  permalink: "404.html",
};

exports.render = () => {
  return html`
    <p class="intro">We're sorry, that page doesn't seem to exist.</p>
  `;
};
