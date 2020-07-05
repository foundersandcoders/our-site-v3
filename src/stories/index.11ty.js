const html = require("../html");

exports.data = {
  layout: "layouts/marketing",
  tags: ["nav"],
  title: "Stories by and about us",
  navLabel: "Stories",
  order: 5,
};

exports.render = (data) => {
  const byUs = [...data.collections["by-us"]].reverse();
  const aboutUs = [...data.collections["about-us"]].reverse();
  const press = [...data.collections.press].reverse();

  return html`
    <p class="intro">
      Curious to learn more about us? Here you’ll find stories by and about our
      diverse community of founders and coders making a social impact with
      technology all over the world.
    </p>
    <hr class="divider" />

    <section class="stack">
      <h2>Stories by us</h2>
      <div class="full-width xs stripes">
        <div class="reel" tabindex="0">
          ${byUs.map(Story)}
        </div>
      </div>
    </section>

    <section class="stack">
      <h2>Stories about us</h2>
      <div class="full-width xs stripes">
        <div class="reel" tabindex="0">
          ${aboutUs.map(Story)}
        </div>
      </div>
    </section>

    <section class="stack">
      <h2>In the press</h2>
      <div class="full-width xs stripes">
        <div class="reel" tabindex="0">
          ${press.map(Story)}
        </div>
      </div>
    </section>
  `;
};

function Story({ data: { title, image, url, page, author, date } }) {
  return html`
    <div class="card">
      <div class="image">
        <img
          src="${image || placeholder(title)}"
          style="object-fit: ${image ? "cover" : "contain"}"
          alt=""
          width="400"
          height="225"
        />
      </div>
      <div class="stack2 body">
        <h3>
          ${url ? html` <a href="${url}">${title}</a> ` : title}
        </h3>
        ${page.excerpt && html` <p>${page.excerpt}</p> `}
        <footer>
          <span>${author}</span>
          ${author &&
          date &&
          html` <span aria-hidden="true" class="dot">⦁</span> `}
          <time>${formatDate(date)}</time>
        </footer>
      </div>
    </div>
  `;
}

const images = [
  "/assets/media/placeholder-0.svg",
  "/assets/media/placeholder-1.svg",
  "/assets/media/placeholder-2.svg",
];
function placeholder(title) {
  const random = title.length % 3;
  return images[random];
}

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
