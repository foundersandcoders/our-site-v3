const Markdown = require("markdown-it");
const md = new Markdown();

const html = require("../../html");
const Heading = require("../../_includes/components/heading");

exports.render = data => {
  const { site, title, who, info } = data;
  return html`
    <div class="stack5">
      <section class="stack4">
        <header class="stack">
          <h1>${title}</h1>
          <address>
            ${site.address}
          </address>
        </header>

        <div class="dialog">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12" y2="16"></line>
          </svg>
          <div class="stack2">
            <h2>${who.title}</h2>
            ${md.render(who.body)}
          </div>
        </div>
      </section>

      <section class="stack4">
        <h2>${info.title}</h2>
        <ul class="grid cycle-colors" style="--min-width: 22rem">
          ${info.questions.map(Question)}
        </ul>
      </section>
    </div>
  `;
};

function Question({ title, body }) {
  return html`
    <li class="stack top-stripe">
      ${Heading({ tag: "h3", children: title })} ${md.render(body)}
    </li>
  `;
}
