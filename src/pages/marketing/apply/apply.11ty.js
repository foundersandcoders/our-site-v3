const Markdown = require("markdown-it");
const md = new Markdown();

const html = require("../../../html");
const Heading = require("../../../_includes/components/heading");

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
  /*sticky: {
    text: "Applications are now open",
    cta: "Apply now",
    href:
      "https://docs.google.com/forms/d/e/1FAIpQLSdvlLQyjC6g_7SY6vbNKVrdZglnW-a5yyw_zHWM-IyDju_F4w/viewform",
  },*/
};

exports.render = data => {
  const {
    title,
    intro,
    cohortSection,
    apply,
    eligibility,
    candidate,
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
      ${Heading({ tag: "h2", children: cohortSection.title })}
      <ul class="grid cycle-colors">
        ${cohortSection.cohorts.map(Cohort)}
      </ul>
    </section>

    <section class="stack5">
      ${Heading({ tag: "h2", children: apply.title })}
      <div class="full-width xs stripes">
        <ol class="reel reel-xs steps cycle-colors" tabindex="0">
          ${apply.steps.map(Step)}
        </ol>
      </div>
    </section>

    <section class="stack5">
      ${Heading({ tag: "h2", children: eligibility.title })}
      <div class="stack document">
        ${md.render(eligibility.body)}
      </div>
    </section>

    <section class="stack5">
      ${Heading({ tag: "h2", children: candidate.title })}
      <div class="stack document">
        ${md.render(candidate.body)}
      </div>
    </section>

    <section class="stack5">
      ${Heading({ tag: "h2", children: prereqs.title })}
      <div class="stack document">
        ${md.render(prereqs.body)}
      </div>
    </section>

    <section class="stack">
      ${Heading({ tag: "h2", children: cohortImageSection.title })}
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
    <li class="stack" style="flex: 1 0 24rem">
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
