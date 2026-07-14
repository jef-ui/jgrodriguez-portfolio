# [EDIT: Your Name] — Portfolio

A single-page developer portfolio. Plain HTML, Tailwind CSS (via CDN), and vanilla JavaScript — no framework, no build step.

## Project structure

```
.
├── index.html          # the entire page (hero, about, skills, projects, contact, footer)
├── css/
│   └── style.css        # custom styles beyond Tailwind utilities (reveal animations, focus states, etc.)
├── js/
│   └── main.js           # skills/projects data + all interactivity (theme toggle, mobile menu, scroll reveal, active-nav highlight)
├── assets/
│   ├── favicon.svg        # placeholder favicon
│   ├── og-image.svg       # placeholder social-share image
│   └── hero-graphic.svg   # placeholder hero illustration (see note below)
└── README.md
```

## Personalize it

Everything you need to change is marked `[EDIT: ...]` or `// EDIT: ...` in the code. The main spots:

| What | Where |
|---|---|
| Name, title, meta tags, OG/Twitter tags, canonical URL | `index.html` `<head>` |
| Logo initials, social links | `index.html` — `<header>` (desktop nav *and* the mobile menu panel both have their own copy) |
| Hero words/taglines ("developer" / "&lt;automator&gt;") | `index.html` — `#home` section |
| Bio, location, availability | `index.html` — `#about` section |
| Skills (add/remove/reorder) | `js/main.js` — the `skills` array |
| Projects | `js/main.js` — the `projects` array (each has a `category`, placeholder `icon` emoji, tags, and optional `live`/`repo` links) |
| Email / GitHub / LinkedIn links | `index.html` — `#contact` section |
| Accent palette (coral/mustard/teal/blue) | `css/style.css` `:root` variables **and** the `ACCENTS` array in `js/main.js` — keep both in sync |
| Favicon / social image / hero graphic | `assets/favicon.svg`, `assets/og-image.svg`, `assets/hero-graphic.svg` (see notes below) |
| Default theme (dark vs light) | `index.html` — the inline bootstrap script at the top of `<head>` (`var isDark = saved === 'dark';` — this design defaults to **light**) |

**About the hero graphic:** `assets/hero-graphic.svg` is an original abstract illustration (colorful on one side, grayscale on the other) built to evoke a "two sides of one developer" composition — it is **not** a real photo of you. Swap it for your own headshot or artwork whenever you have one; the `<img>` tag is in the `#home` section of `index.html`.

**About the OG image:** `assets/og-image.svg` is an SVG placeholder so the project ships with zero binary files. Some link-preview crawlers don't render SVG for `og:image` reliably — for best compatibility, replace it with a real 1200×630 PNG/JPG and update the `og:image` / `twitter:image` tags in `index.html` to match.

**Swapping the contact section for a form:** the Contact section uses a `mailto:` link by default. If you'd rather have an actual form (still no backend needed), there's a ready-to-uncomment [Formspree](https://formspree.io) snippet directly below the contact buttons in `index.html` — just uncomment it, drop in your Formspree form ID, and remove/hide the mailto button if you don't want both.

## Run locally

No build step, no dependencies to install. Any of these work:

**Just open the file**
```bash
open index.html        # macOS
xdg-open index.html     # Linux
```

**Or serve it** (recommended, so relative paths and any future `fetch()` calls behave like production):
```bash
# Python 3
python3 -m http.server 8000

# Node (no install needed)
npx serve .
```
Then visit `http://localhost:8000`.

## Notes

- **Design**: a solid black nav bar, a big split "developer / &lt;automator&gt;" hero with an abstract illustration in between, a light-gray "latest work" project grid, and a coral/mustard/teal/blue accent palette used throughout for borders, tags, and thumbnails.
- **Light mode is the default**; the ☀️/🌙 toggle in the nav switches to dark and remembers your choice in `localStorage`.
- **Accessibility**: skip-to-content link, visible focus states, `prefers-reduced-motion` support (scroll-reveal animations are skipped entirely if the user has that OS setting on), and `aria-current` on the active nav link.
- **Mobile menu**: the nav collapses to a hamburger menu (with the social icons folded in) below the `md` breakpoint.
- All animation/interaction code is vanilla JS in `js/main.js` — no dependencies beyond the Tailwind CDN script and Google Fonts.
