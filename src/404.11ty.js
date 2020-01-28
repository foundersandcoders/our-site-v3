const html = require("./html");

exports.data = {
  layout: "layouts/document",
};

exports.render = () => {
  return html`
    <h1>Page not found</h1>

    <p class="intro">We're sorry, that page doesn't seem to exist.</p>
  `;
};
