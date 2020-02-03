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
  const { title, intro } = data;
  const calendar = getWeek();
  return html`
    <h1>${title}</h1>
    <ul class="stack">
      ${calendar.map(Day(data))}
    </ul>
    <div class="intro">
      ${md.render(intro)}
    </div>
    <hr class="divider" />
  `;
};

function Day({ schedule, collections: { events }, site }) {
  return function(date) {
    const isToday = new Date().getDate() === date.getDate();
    const border = isToday ? "var(--primary)" : "transparent";
    const scheduledEvent = schedule.find(e => equalDates(e.date, date));
    const event =
      scheduledEvent && events.find(e => e.fileSlug === scheduledEvent.type);
    return html`
      <li
        class="box"
        style="--bg: var(--muted); border-left: 0.5rem solid ${border}"
      >
        <div>${formatDate(date)}</div>
        ${event &&
          html`
            <div>
              <h3><a href="/${event.fileSlug}">${event.data.title}</a></h3>
              <span>${event.data.who.title}</span>
              <span>${last(site.address.split(", "))}</span>
            </div>
          `}
      </li>
    `;
  };
}

function equalDates(a, b) {
  const dateA = new Date(a);
  const dateB = new Date(b);
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
}

function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
}

function getWeek(start) {
  const today = start || new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return date;
  });
}

function last(array) {
  return array[array.length - 1];
}
