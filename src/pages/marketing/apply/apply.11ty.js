const Markdown = require("markdown-it");
const md = new Markdown();

const html = require("../../../html");

exports.data = {
  tags: ["nav"],
  navLabel: "Apply",
  order: 2,
  sticky: {
    text: "Applications are currently closed",
    cta: "Express interest",
    href:
      "https://docs.google.com/forms/d/e/1FAIpQLSepdNxKsrMjhfnbdkzKUgNpeWFmp8WLyiqTe_UY10TsPpFOEQ/viewform",
  },
};

exports.render = data => {
  const {
    title,
    intro,
    cohortSection,
    apply,
    prereqs,
    cohortImageSection,
  } = data;
  return html`
    <h1>${title}</h1>
    <div class="intro">
      ${md.render(intro)}
    </div>
    <hr class="divider" />

    <section class="stack5">
      <h2>${cohortSection.title}</h2>
      <ul class="grid cycle-colors">
        ${cohortSection.cohorts.map(Cohort)}
      </ul>
    </section>

    <section class="stack5">
      <h2>${apply.title}</h2>
      <ol class="grid steps cycle-colors" style="--min-width: 20rem">
        ${apply.steps.map(Step)}
      </ol>
    </section>

    <section class="stack5">
      <h2>${prereqs.title}</h2>
      <div class="stack">
        ${md.render(prereqs.body)}
      </div>
    </section>

    <section class="stack">
      <h2>${cohortImageSection.title}</h2>
      <div class="reel" tabindex="0">
        ${cohortImageSection.images.map(CohortImage)}
      </div>
    </section>
  `;
};

function Cohort(c) {
  return html`
    <li class="stack4 top-stripe">
      <h3>Cohort of ${c.name}</h3>
      ${c.dates.map(
        d => html`
          <h4>${d.title}</h4>
          <time datetime="${d.open}">${formatDate(d.open)}</time>
          -
          <time datetime="${d.close}">${formatDate(d.close)}</time>
        `
      )}
    </li>
  `;
}

function formatDate(d) {
  const date = new Date(d);
  // undefined locale should use user's browser language
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function Step(s) {
  return html`
    <li class="stack">
      <h3>${s.title}</h3>
      ${md.render(s.body)}
    </li>
  `;
}

function CohortImage({ name, image }) {
  return html`
    <figure style="flex: 1 0 100%">
      <figcaption>${name}</figcaption>
      <img src="${image}" alt="" />
    </figure>
  `;
}
