# Meridian Consulting — Corporate Landing Page

> A premium, fully responsive single-page corporate website built with pure HTML5, CSS3, and Vanilla JavaScript. No frameworks. No dependencies. Just clean, production-grade front-end craft.

---

## 🔗 Live Demo

**[→ View Live Site](https://akerolos.github.io/meridian-consulting/)**

---

## 📋 Table of Contents

- [Overview](#overview)
- [Core Features](#core-features)
- [Technologies Used](#technologies-used)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## Overview

**Meridian Consulting** is a fully hand-coded, single-page marketing website for a fictional corporate advisory firm. The project was built to demonstrate mastery of foundational front-end development — semantic HTML5, modern CSS3 architecture, and modular Vanilla JavaScript — without relying on any external CSS frameworks or JavaScript libraries.

The design language prioritizes restraint and professionalism: a deep navy and slate color palette, generous white space, and refined Poppins typography create a credible, high-trust aesthetic appropriate for B2B consulting, financial services, or professional advisory firms.

---

## ✨ Core Features

### Responsive Layout & Design
- **Mobile-first architecture** — built from the smallest viewport up, with clean breakpoints at `640px` (tablet) and `1024px` (desktop)
- **CSS Grid and Flexbox** used throughout for robust, adaptive layouts that reflow gracefully at every screen size
- **Fluid typography** using `clamp()` so headings scale proportionally between screen sizes without abrupt jumps
- **No horizontal overflow** — every section has been stress-tested on narrow viewports

### Modern, Clean UI/UX
- Restrained color palette: Deep Navy `#0F172A`, Slate Gray `#64748B`, Light Gray `#F8F9FA`, and White
- **Google Fonts (Poppins)** loaded with `font-display: swap` for performance
- Subtle depth via layered `box-shadow`, `backdrop-filter` blur on the sticky header, and CSS `radial-gradient` decorative accents
- Elegant hover states on all interactive elements (cards lift, links underline, buttons shift)
- **No flashy or aggressive animations** — all motion is purposeful and subdued, respecting user attention

### Accessible Navigation
- **Sticky navbar** with a scroll-triggered border and shadow for clear visual context
- **Hamburger menu** with a smooth animated ☰ → ✕ transition and full ARIA support (`aria-expanded`, `aria-controls`, `aria-hidden`)
- Mobile drawer closes automatically on link click or `Escape` key press
- All interactive elements are reachable and styled via `:focus-visible` for keyboard users
- `prefers-reduced-motion` media query disables all transitions for users who have requested reduced motion in their OS settings

### Dynamic FAQ Accordion
- **Single-open pattern** — opening one panel automatically collapses the previously open one, keeping the UI uncluttered
- Smooth expand/collapse animation driven by CSS `max-height` transitions (no layout-breaking `height: auto` hacks)
- Fully keyboard navigable with `Home`/`End` key support to jump between items
- Correct ARIA semantics: `aria-expanded` on triggers, `role="region"` on panels, `aria-labelledby` linking panels to their buttons

### Client-Side Form Validation
- **Real-time inline validation** — errors appear on field blur and clear as the user begins correcting them
- Per-field rules: required, minimum character length, and email regex pattern matching
- Clear, accessible error messages rendered in `role="alert"` / `aria-live="polite"` containers for screen reader announcements
- Visual loading state on submit (spinner animation) simulating an async API call
- Success confirmation message displayed on completion — no page reload required
- A clearly marked integration point in the code for connecting a real back-end or third-party form API

---

## 🛠 Technologies Used

| Layer | Technology | Notes |
|---|---|---|
| **Structure** | HTML5 (Semantic) | `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<address>` |
| **Styling** | CSS3 with Custom Properties | Design token system via `:root` variables; no preprocessor required |
| **Layout** | CSS Grid + Flexbox | Grid for page regions; Flexbox for component-level alignment |
| **Typography** | Google Fonts — Poppins | Weights 300, 400, 500, 600, 700 |
| **Scripting** | Vanilla JavaScript (ES6+) | IIFE module pattern; no build step, no bundler |
| **Icons** | Inline SVG | Zero HTTP requests; fully styleable via CSS `currentColor` |
| **Fonts** | Google Fonts CDN | Loaded asynchronously via `<link rel="preconnect">` |

### CSS Architecture Highlights
- **14 clearly commented sections** — tokens, reset, utilities, buttons, navbar, hero, about, services, FAQ, contact, footer, and three responsive breakpoint blocks
- **CSS Custom Properties (variables)** for every design token: colors, spacing scale, type scale, border radii, shadows, and transition durations
- No `!important` declarations — specificity is managed deliberately through the cascade
- Naming follows a flat BEM-inspired convention (`block`, `block-element`, `block--modifier`) for readability without tooling

### JavaScript Architecture Highlights
- **Six self-contained IIFEs** (Immediately Invoked Function Expressions) — each module encapsulates its own scope with zero global variable pollution
- Execution order: navbar scroll state → hamburger toggle → mobile link closer → FAQ accordion → form validation → footer year
- All DOM queries are performed inside each IIFE to avoid stale references
- The form submit handler is `async/await` ready with a clearly annotated `fetch()` integration point

---

## 📁 File Structure

```
meridian-consulting/
│
├── index.html          # Single-page markup — all sections, ARIA attributes, SVG icons
├── style.css           # Full stylesheet — design tokens, components, responsive breakpoints
├── main.js             # Vanilla JS — navbar, hamburger, accordion, form validation
└── README.md           # Project documentation (this file)
```

> The project is intentionally zero-dependency. There is no `package.json`, no `node_modules`, no build pipeline. Open `index.html` in any modern browser and it works.

---

## 🚀 Getting Started

No installation or build step is required.

### Option 1 — Open directly in a browser

```bash
# Clone the repository
git clone https://github.com/yourusername/meridian-consulting.git

# Navigate into the project folder
cd meridian-consulting

# Open in your default browser (macOS)
open index.html

# Open in your default browser (Windows)
start index.html

# Open in your default browser (Linux)
xdg-open index.html
```

### Option 2 — Use a local development server

For a more accurate preview (avoids browser file-protocol quirks with fonts):

```bash
# Using VS Code Live Server extension — right-click index.html → "Open with Live Server"

# Or using Python's built-in server
python3 -m http.server 8080
# Then visit: http://localhost:8080

# Or using Node.js (npx, no install needed)
npx serve .
# Then visit: http://localhost:3000
```

### Option 3 — Deploy to GitHub Pages

```bash
# Push the repository to GitHub, then enable Pages under:
# Settings → Pages → Source: Deploy from branch → main → / (root)

# Your site will be live at:
# https://yourusername.github.io/meridian-consulting
```

---

## 🔮 Future Improvements

The following enhancements are planned or suggested for production hardening and feature expansion:

### Back-End & API Integration
- **Form submission API** — Replace the simulated `setTimeout` in `main.js` with a real `fetch()` POST to a back-end endpoint (Node.js/Express, Django, or a serverless function on Vercel/Netlify). Add server-side validation as a second layer of defence
- **Email delivery** — Integrate a transactional email provider (e.g. SendGrid, Resend, or Postmark) to route contact form submissions directly to the team inbox with auto-reply confirmation
- **CMS integration** — Connect the Services and FAQ sections to a headless CMS (e.g. Contentful, Sanity, or Strapi) so non-technical stakeholders can update copy without touching code

### Internationalization (i18n) & Localization (l10n)
- Add multi-language support using a lightweight JSON-based translation layer so the site can serve Arabic, French, or other language markets without duplicating HTML
- Implement `lang` attribute toggling and `dir="rtl"` switching for right-to-left language support (Arabic, Hebrew)
- Externalize all hard-coded strings into a `translations/en.json` file as the first step toward a proper i18n pipeline

### Performance & SEO
- Add `loading="lazy"` and `srcset` once real images are introduced
- Implement a `sitemap.xml` and `robots.txt` for search engine indexing
- Add Open Graph and Twitter Card `<meta>` tags for rich social sharing previews
- Audit and inline critical CSS to eliminate render-blocking resources

### Accessibility & Quality
- Conduct a full WCAG 2.1 AA audit and remediate any contrast or interaction gaps
- Add end-to-end tests (Playwright or Cypress) to verify accordion, form validation, and menu behaviour across browsers
- Add a `manifest.json` and service worker for Progressive Web App (PWA) installability

### UI Enhancements
- Add a **dark mode** toggle respecting `prefers-color-scheme`, powered by the existing CSS custom property system — the token architecture already makes this straightforward
- Introduce a **testimonials / case studies** section with a minimal CSS-only carousel
- Add subtle **scroll-triggered reveal animations** using `IntersectionObserver` for section entrances

---

## 📄 License

This project is released under the [MIT License](LICENSE).

You are free to use, modify, and distribute this code for personal or commercial projects. Attribution is appreciated but not required.

---

<div align="center">

**Built with precision — zero frameworks, zero dependencies.**

*HTML · CSS · JavaScript*

</div>
