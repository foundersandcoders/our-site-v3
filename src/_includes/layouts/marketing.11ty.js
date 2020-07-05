const html = require("../../html");

exports.data = {
  layout: "layouts/base",
};

exports.render = (data) => {
  return html`
    <main class="marketing">
      <h1 class="${data.permalink === "/" ? "giant-title" : ""}">
        ${data.title}
      </h1>
      ${data.content}
    </main>
  `;
};
