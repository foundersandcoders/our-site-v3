const html = require("../../html");

exports.data = {
  layout: "layouts/base",
};

exports.render = (data) => {
  return html`
    <main class="document">
      <header class="stack">
        <h1>${data.title}</h1>
        ${data.date &&
        html`<p><strong>${this.formatDate(data.date)}</strong></p>`}
      </header>
      ${data.content}
    </main>
  `;
};
