const html = require("../../html");

module.exports = data => {
  // get all the pages that should appear in the nav
  const pages = [...data.collections.nav]
    // unpublished pages (i.e. with permalink: false) have no URL
    .filter(page => page.url)
    // nav order is manual (from page data)
    .sort((a, b) => a.data.order - b.data.order)
    .map(n => ({ label: n.data.navLabel, url: n.url, title: n.data.title }));

  const nextPage = pages[(data.order + 1) % pages.length];

  const pageTitle = `${data.title} - ${data.site.title}`;
  const description = data.intro ? data.intro.body || data.intro : data.excerpt;
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>
          ${data.title || "Coding Bootcamp in London"} - ${data.site.title}
        </title>
        <meta name="description" content="${description}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="/assets/css/styles.css" />
        <link
          rel="preload"
          href="/assets/fonts/GT-Eesti-Text-Light-subset.woff2"
          as="font"
          type="font/woff2"
          crossorigin
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0805ec" />
        <meta name="theme-color" content="#121212" />

        <meta property="og:title" content="${pageTitle}" />
        <meta property="og:description" content="${description}" />
        <meta
          property="og:image"
          content="/assets/og/${data.page.fileSlug}.png"
        />
        <meta
          name="twitter:image"
          content="/assets/og/${data.page.fileSlug}.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="600" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-35597887-2"
        ></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            dataLayer.push(arguments);
          }
          gtag("js", new Date());

          gtag("config", "UA-35597887-2");
        </script>
        ${Header({ pages, currentUrl: data.page.url })}${data.content}
        ${data.sticky && Sticky(data.sticky)}
        ${Footer({ nextPage, site: data.site })}
      </body>
      <script
        async
        src="https://identity.netlify.com/v1/netlify-identity-widget.js"
      ></script>
      <script>
        if (window.netlifyIdentity) {
          window.netlifyIdentity.on("init", user => {
            if (!user) {
              window.netlifyIdentity.on("login", () => {
                document.location.href = "/admin/";
              });
            }
          });
        }
        // remove all service workers (from the old site)
        if (navigator.serviceWorker) {
          navigator.serviceWorker
            .getRegistrations()
            .then(function(registrations) {
              for (let registration of registrations) {
                registration.unregister();
              }
            });
        }
        // delete old cached files
        if (caches) {
          caches.keys().then(function(names) {
            for (let name of names) caches.delete(name);
          });
        }
      </script>
    </html>
  `;
};

function Header({ pages, currentUrl }) {
  // home page shouldn't appear in nav
  const navPages = pages.filter(p => p.url !== "/");
  return html`
    <header class="site-header">
      <a href="/" aria-label="Home page">
        ${Logo()}
      </a>
      <nav>
        <ul style="--cols: ${navPages.length}">
          ${navPages.map(NavItem(currentUrl))}
        </ul>
      </nav>
    </header>
  `;
}

function NavItem(currentUrl) {
  return ({ url, label }) => {
    const current = currentUrl === url ? "page" : "false";
    return html`
      <li>
        <a href="${url}" aria-current="${current}">${label}</a>
      </li>
    `;
  };
}

function Sticky({ text, href, cta }) {
  return html`
    <div class="sticky">
      <div>${text}</div>
      <a href="${href}">${cta}</a>
    </div>
  `;
}

function Footer({ nextPage, site }) {
  const nextPageLabel = nextPage
    ? nextPage.url === "/"
      ? "Back to home page"
      : nextPage.title
    : null;
  return html`
    <footer
      class="${nextPage ? "site-footer full-height" : "site-footer"}"
      id="footer"
    >
      <div>
        ${nextPage &&
          html`
            <div class="next-page">
              <h2>Next</h2>
              <a href="${nextPage.url}" rel="next">${nextPageLabel}</a>
            </div>
          `}
        <div class="site-info stack2">
          <div id="contact">${site.email}</div>
          <address>${site.address}</address>
          <div class="links">
            <a href="/code-of-conduct">Code of Conduct</a>
            <a href="/privacy-policy">Privacy Policy</a>
          </div>
          <div class="copyright">
            © ${new Date().getFullYear()} Founders and Coders. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  `;
}

function Logo() {
  return html`
    <div>
      <svg
        viewBox="-1 0 301 141"
        fill="none"
        width="140"
        class="site-logo"
        stroke-width="1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="diagonalHatch"
            patternUnits="userSpaceOnUse"
            width="5"
            height="5"
          >
            <path
              d="M-1,1 l2,-2 M0,5 l5,-5 M4,6 l2,-2"
              stroke="black"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <g id="square">
          <rect width="100" height="100" stroke="black" />
          <rect width="100" height="50" fill="black" />
          <rect
            width="50"
            height="50"
            x="50"
            y="50"
            fill="url(#diagonalHatch)"
          />
        </g>

        <g id="triangle" transform="translate(8, 0)">
          <polygon points="100,100 150,0 200, 100" stroke="black" />
          <polygon points="100,100 125,50 150,100" fill="black" />
          <polygon points="150, 100 175,50, 200,100" fill="black" />
          <polygon points="125,50 150,100 175,50" fill="url(#diagonalHatch)" />
        </g>

        <g id="circle">
          <ellipse cx="250" cy="50" rx="50" ry="50" stroke="black" />
          <ellipse
            cx="250"
            cy="50"
            rx="22"
            ry="22"
            fill="url(#diagonalHatch)"
          />
          <path d="M250,0 a1,1 0 0,1 0,100" fill="black" />
        </g>
        <text
          x="0"
          y="128"
          text-length="301"
          length-adjust="spacingAndGlyphs"
          stroke="none"
          fill="black"
          style="font-size: 26px; text-transform: uppercase;"
        >
          Founders and coders
        </text>
      </svg>
    </div>
  `;
}
