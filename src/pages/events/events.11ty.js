const Markdown = require("markdown-it");
const md = new Markdown();

const html = require("../../html");

exports.data = {
  permalink: "/events/index.html",
  layout: "layouts/marketing",
  tags: ["nav"],
  navLabel: "Events",
  order: 5,
};

exports.render = data => {
  const { title, intro, schedule } = data;
  return html`
    <h1>${title}</h1>
    <div class="intro">
      ${md.render(intro)}
    </div>
    <hr class="divider" />
    <ul>
      ${schedule.map(Event)}
    </ul>
  `;
};

function Event({ date, type }) {
  return html`
    <li><a href="/events/${type}">${formatDate(date)} ${type}</a></li>
  `;
}

function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
