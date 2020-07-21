const Markdown = require("markdown-it");
const md = new Markdown();

const html = require("../../../html");
const Heading = require("../../../_includes/components/heading");

exports.data = {
  permalink: "/tech-for-better/",
  tags: ["nav"],
  navLabel: "Tech for Better",
  order: 4,
  sticky: {
    text: "Interested in the Tech for Better programme?",
    href: "https://airtable.com/shrMtNWdsGQQs65mO",
    cta: "Express interest",
  },
};

exports.render = data => {
  const { title, intro, image, quotes, faqSection, caseStudies } = data;
  return html`
    <h1>${title}</h1>
    <section class="stack4">
      <h2>${intro.title}</h2>
      <div class="intro">
        ${md.render(intro.body)}
      </div>
    </section>
    <hr class="divider" />
    <div class="circle-reveal">
      <img src="${image}" width="960" height="540" alt="" />
    </div>

   <section class="full-width stripes" aria-label="Testimonials">
      <div class="stack5">
        <div
          class="reel"
          style="--gap: var(--space4); --col: 28rem"
          tabindex="0" >
          ${quotes.map(Quote)}
        </div>
      </div>
    </section>
  
    <section class="stack4">
      ${Heading({ tag: "h2", children: faqSection.title })}
      <ul class="grid cycle-colors">
        ${faqSection.faqs.map(Info)}
      </ul>
    </section>

    <section class="stack4">
      ${Heading({ tag: "h2", children: caseStudies.title })}
      <ul class="stack">
        ${caseStudies.apps.map(App)}
      </ul>
    </section>

  `;
};

function Quote({ name, company, body }) {
  return html`
  <figure class="testimonial partner">
    <blockquote>${body}</blockquote>
    <figcaption>
      <h3>${name}</h3>
      <div>${company}</h3>
    </figcaption>
  </figure>
`;
}

function Info({ title, body }) {
  return html`
    <li class="stack top-stripe">
      ${Heading({ tag: "h3", children: title })} ${md.render(body)}
    </li>
  `;
}

function App({ title, body, url }) {
  return html`
    <li class="stack">
      <h3>${title}</h3>
      ${md.render(body)}
      <a href="${url}">Check it out</a>
    </li>
  `;
}
