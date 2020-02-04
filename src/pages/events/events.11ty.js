const isBefore = require("date-fns/isBefore");
const isToday = require("date-fns/isToday");
const startOfToday = require("date-fns/startOfToday");

const html = require("../../html");

exports.data = {
  permalink: "/events/index.html",
  layout: "layouts/marketing",
  tags: ["nav"],
  navLabel: "Events",
  order: 5,
};

exports.render = data => {
  const { title, schedule } = data;
  return html`
    <div class="stack5">
      <h1>${title}</h1>
      <ul class="stack">
        ${schedule.map(Day(data))}
      </ul>
    </div>
  `;
};

function Day({ collections: { events }, site }) {
  return function(scheduledEvent) {
    const date = new Date(scheduledEvent.date);
    // don't show dates before today at midnight
    if (isBefore(date, startOfToday())) return null;
    const event = events.find(e => e.fileSlug === scheduledEvent.type);
    // if there's no event that matches show nothing
    // this is a content mistake: scheduled events need an existing type
    if (!event) return null;

    const border = isToday(date) ? "var(--primary)" : "transparent";
    return html`
      <li
        class="dialog${event && " big"}"
        style="border-left: 0.5rem solid ${border};"
      >
        ${NiceDate({ date })}

        <div class="stack2">
          <h3 style="font-size: var(--font5)">
            <a class="inherit" href="${event.url}">${event.data.title}</a>
          </h3>
          <div>
            <span>${event.data.who.title}</span>
            <span aria-hidden="true">•</span>
            <span>${last(site.address.split(", "))}</span>
          </div>
        </div>
      </li>
    `;
  };
}

function NiceDate({ date }) {
  if (!date) return "";
  const d = new Date(date);
  const parts = new Intl.DateTimeFormat("en-GB", {
    month: "long",
    day: "2-digit",
    weekday: "long",
  }).formatToParts(d);
  const weekday = parts.find(p => p.type === "weekday");
  const day = parts.find(p => p.type === "day");
  const month = parts.find(p => p.type === "month");
  return html`
    <div style="display: grid; justify-items: center">
      <span>${weekday.value}</span>
      <span style="font-size: var(--font7); font-weight: bold">
        ${day.value}
      </span>
      <span>${month.value}</span>
    </div>
  `;
}

function last(array) {
  return array[array.length - 1];
}
