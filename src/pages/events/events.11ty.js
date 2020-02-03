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
    <div class="stack5">
      <h1>${title}</h1>
      <ul class="stack">
        ${calendar.map(Day(data))}
      </ul>
      <div class="intro">
        ${md.render(intro)}
      </div>
    </div>
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
        class="dialog"
        style="--bg: var(--muted); border-left: 0.5rem solid ${border}"
      >
        ${NiceDate(date)}
        ${event &&
          html`
            <div>
              <h3><a href="${event.url}">${event.data.title}</a></h3>
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

function NiceDate(date) {
  if (!date) return "";
  const d = new Date(date);
  const parts = new Intl.DateTimeFormat("en-GB", {
    month: "short",
    day: "numeric",
    weekday: "short",
  }).formatToParts(d);
  const weekday = parts.find(p => p.type === "weekday");
  const day = parts.find(p => p.type === "day");
  const month = parts.find(p => p.type === "month");
  return html`
    <div>
      <div>${weekday.value}</div>
      <div style="font-size: var(--font6); font-weight: bold">${day.value}</div>
      <div>${month.value}</div>
    </div>
  `;
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
