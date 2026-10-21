# Orangesoft website: static HTML reference

Static, self-contained HTML mockups for the Orangesoft "Lightning-fast website" (headless over WordPress, WooCommerce, Magento, Drupal, Kentico) and its add-ons. **These files are the design and behaviour reference. The production build is React / Next.js.** Match layout, copy, spacing and interactions; do not ship this HTML as is.

Audience: mid-market companies, e-commerce brands, publishers and enterprise SMEs in Malaysia. Brand and footer details follow https://www.orangesoft.com.my/.

## Preview locally

```
cd <this folder>
python3 -m http.server 8000
# open http://localhost:8000
```

Or connect the repo to Vercel / Netlify / GitHub Pages (no build step; `index.html` is the homepage).

## Pages

| File | Page | Primary action | Notes |
|---|---|---|---|
| `index.html` | Homepage | Free website audit | Hero, ecosystem cards, pricing teaser |
| `why-headless-page.html` | Lightning-fast website | Free website audit | Speed race demo, platform list |
| `solutions-page.html` | Add-ons hub | Book a free call | "How add-ons work" journey, chooser, plan table |
| `ai-search-page.html` | Found by AI search | Book a free call | |
| `ai-chatbot-page.html` | AI chatbot | Book a free call | "Meet Ollie" section, spotlight overlay |
| `app-experience-page.html` | App-like experience | Book a free call | "Install our site" section |
| `whatsapp-assistant-page.html` | WhatsApp AI assistant | Chat on WhatsApp | **Coming soon** |
| `pricing-page.html` | Pricing | Book a free call | |
| `about-page.html` | About | Book a free call | Team photos missing (see open items) |
| `faq-page.html` | FAQ | Chat on WhatsApp | |
| `contact-page.html` | Contact | Send enquiry form | |
| `audit-page.html` | Free website audit | Run the scan | Results flow, add-on checks, walkthrough form |
| `chat-demo-page.html` | Ollie demo page | Try Ollie | |
| `chatbot-mockup.html` | Standalone Ollie phone demo | n/a | Slang, short-form and multilingual demo, call, hand-over |

### CTA system (keep consistent)

Four labels only: **Get my free website audit** (audit page), **Book a free call** (Calendly), **Chat on WhatsApp** (`wa.me/60127888000` with a page-specific prefilled message), **Contact us** (footer link). The header button is "Free website audit" on awareness pages (home, lightning-fast website, FAQ, contact) and "Book a free call" on consideration and decision pages.

### Section rhythm

The first section after the hero is white, then alternate white and cream. Dark bands do not count. Every page ends with the dark closing CTA banner, then the footer.

## Design tokens

| Token | Value |
|---|---|
| Orange | `#ed7330` (light `#ff9142`, dark `#c9631d`, button hover `#d9611f`) |
| Ink | `#121212` |
| Body text | `#50525f`, `#3d3f4a` |
| Cream (all beige backgrounds) | `#f8f5f1` |
| Peach (callouts) | `#fdeede`, `#fff7ef` |
| Border | `#e2d6c8` |
| Red / green | `#d1432a` / `#2fa866` |
| WhatsApp green | `#25d366` |
| Font | Plus Jakarta Sans (Google Fonts) |
| Icons | Material Icons Round (Google Fonts) |

Buttons: `.btn` 16/28 padding, 15px text; `.btn-lg` / `.fc-btn` 18/32, 16px; `.header-cta` 12/22, 14px; fully rounded. States (hover, focus, disabled) are defined at the end of `assets/css/overrides.css`.

## Code layout

- `assets/css/orangesoft.css` is the shared base. `assets/css/overrides.css` is linked last and holds the button system, footer, Ollie launcher, install dialog and other normalisation.
- Most pages also carry a page-level `<style>` block. Treat these as the spec, then move to your component library.
- `assets/js/motion.js` (reveal animations), `accordion.js` (FAQ), `ollie.js` (chat launcher), `install.js` (install dialog).

## Behaviour that needs real implementation

These are **mock behaviour** in the HTML:

1. **Audit page** (`audit-page.html`): the scan is simulated. `AUDIT_DATA = { loadSec: 3.4 }` is a stub. Real build: PageSpeed Insights API for load time and scores, plus simple page checks for the four add-ons (AI bots allowed in robots.txt, web app manifest, chat widget present, WhatsApp link). Results show a speed score plus yes/no add-on checks. Estimates must be labelled as estimates.
2. **Ollie, the AI chatbot** (`assets/js/ollie.js`, `chatbot-mockup.html`, `chat-demo-page.html`): replies are scripted. Real build: an LLM with an Orangesoft system prompt and tools (website check, lead capture, hand-over). Requirements: any language, switch anytime, quick replies generated in the visitor's language, voice call, and a hand-over that opens a WhatsApp link with an English summary (`wa.me/<number>?text=<summary>`) and POSTs the same payload to the CRM. Placeholder: `HANDOFF_ENDPOINT` in `chatbot-mockup.html`. The same engine is the product we sell as the "AI chatbot" add-on, so build it configurable per client (knowledge base, tone, hand-over target).
3. **Install our site** (`assets/js/install.js`): uses the native `beforeinstallprompt` when available, otherwise shows steps per device. Real build: a web app manifest, icons and a service worker are required, or the native prompt never appears.
4. **Forms** (contact, audit walkthrough): front end only, no submit target yet.
5. **Calendly:** `https://calendly.com/daniel-orangesoft/45min` (opens in a new tab).

## Open items before launch

- **About page photos missing:** 15 team photos (`assets/team/`, filenames are referenced in `about-page.html`) and 3 office photos (`assets/about/`, see `assets/about/README.txt`).
- **Reviews:** replace sample content with real Google reviews.
- **Claims to verify with the business:** chat summaries, offline caching, voice call, WhatsApp assistant abilities, the "Quotation dalam 1 hari bekerja" line, the source for the 53% statistic, and any "was" prices.
- **Dead `#` links:** Cookie Settings in the footer.
- **Head tags:** favicon and Open Graph tags are not set.
- **Contrast:** white text on `#ed7330` is about 2.8:1. Decide whether to darken the button fill (about `#c2561a` meets 4.5:1).
- **Cleanup for the build:** reduce the many one-off colours and radii, raise text under 12px, remove `!important` and inline CSS.
- **Language review:** have a native speaker check the Tamil and Manglish copy in Ollie.
- **WhatsApp assistant** is "coming soon"; keep it labelled that way until it ships.
