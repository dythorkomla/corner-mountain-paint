# Corner Mountain Paint — website

Static marketing site for **Corner Mountain Paint**, the authorized Benjamin Moore
retailer at 1072C Main St, Pincher Creek, Alberta. Plain HTML, CSS, and a little
JavaScript — no build step, no framework. It runs anywhere that serves files and
is set up for **GitHub Pages**.

**Brand:** Corner Mountain Paint
**Descriptor:** Authorized Benjamin Moore Retailer
**Palette:** foothills navy + warm paper, with slate, amber, and brick accents
**Type:** Space Grotesk (display) · Work Sans (text) · IBM Plex Mono (labels), via Google Fonts

---

## Naming note — keep this

The business is branded as **"Corner Mountain Paint"** throughout, with
"Authorized Benjamin Moore Retailer" used only as a descriptor — never folded into
the company name. Putting "Benjamin Moore" into the business name would risk
trademark problems even for an authorized dealer. The footer of every page carries
the Benjamin Moore trademark acknowledgement; leave it in place.

---

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home |
| `paints.html` | Benjamin Moore lines carried — interior, exterior, stains, primers — plus a finish/sheen guide |
| `colour-consultation.html` | What the in-store colour consultation covers and how to prepare for it |
| `services.html` | Colour matching, tinting, sample pots, supplies, estimating; what we're *not* |
| `about.html` | The store, why a local dealer matters, photo gallery |
| `visit.html` | Address, map, parking; store-hours placeholder |
| `contact.html` | Contact details + message form |
| `404.html` | Friendly not-found page (self-contained) |

Shared styles: `assets/css/style.css` · Shared script: `assets/js/main.js`
(mobile menu, contact-form submit, photo lightbox). Images: `assets/img/`.

---

## Preview locally

Any static server works. With Python installed:

```bash
cd corner-mountain-paint
python -m http.server 8080
# open http://localhost:8080
```

Opening the files directly (`file://`) mostly works, but a server is closer to the
real thing (and the Google Map embed behaves better).

---

## Things to finish before launch

Stated as fact on the site: **Corner Mountain Paint**, authorized Benjamin Moore
retailer · contact **Samuel Reimer** · **1072C Main St, Pincher Creek, Alberta** ·
**403 627 5700** · **sales@cornermountainpaint.com** · **hours Mon–Fri
9 a.m.–5 p.m., closed weekends** (`visit.html`, `contact.html`, and every page
footer). Still left blank on purpose — fill in when you have it:

1. **Add the missing details.**
   - **Postal code** — not on the card; add it to the address on `visit.html`,
     `contact.html`, and the footer of every page when known.
   - **Service area / partner businesses** — none are named. Add them later if you
     want them.
   - **Trade / contractor pricing** — `services.html` mentions it as something to
     ask about; adjust or remove to match what you actually offer.

2. **Contact form.** The form on `contact.html` submits in the background to
   [Web3Forms](https://web3forms.com) and emails `sales@cornermountainpaint.com`.
   One-time setup (~2 min): create the free key with that address, then paste it
   over `PASTE-WEB3FORMS-ACCESS-KEY-HERE` in `contact.html`. Until then, the form
   shows a fallback asking visitors to email directly; the `mailto:` link always
   works. (To use Formspree instead, set the form `action` to your
   `https://formspree.io/f/XXXX` endpoint and delete the `access_key` field — the
   JavaScript handles both.)

3. **Popular colours strip** (`colour-consultation.html`). The six Benjamin Moore
   colours shown are real names/codes with *approximate* on-screen hex values —
   fine as illustration. Swap in whatever colours you actually get asked for most.

---

## Editing

- **Text:** edit the HTML directly. Each page is self-contained; the header and
  footer are copied into every file, so a nav or footer change has to be made in
  all of them.
- **Colours:** the palette is defined once at the top of `assets/css/style.css`
  in the `:root { --navy: …; }` block.
- **Photos:** drop a web-sized JPG into `assets/img/` (aim for ≤ 1600 px wide,
  ≤ 350 KB) and point an `<img src>` at it. Always write a real `alt` description.
  The originals from the phone belong in `images/` (ignored by git).
- **Gallery:** on `about.html`, each photo is a
  `<button><img src="…" data-full="…" alt="…"></button>` inside `.gallery`.
  `data-full` is the large version shown in the lightbox.
- **Social share image:** `assets/img/og-image.png` (1200×630).
- **Logo / favicon:** `assets/img/logo.svg` and `favicon.svg` (edit the SVG
  directly); `apple-touch-icon.png` is a 180×180 raster of the same mark.

---

## Deploy to GitHub Pages

Served from the **root** of the repository on the `main` branch. The local repo is
already initialised, committed on `main`, and pointed at
`https://github.com/dythorkomla/corner-mountain-paint.git`.

### First time

1. Create the repo: <https://github.com/new> → owner `dythorkomla`, name
   `corner-mountain-paint`, **Public**, do **not** add a README / .gitignore /
   licence → **Create repository**.
2. From `corner-mountain-paint/`:
   ```bash
   git push -u origin main
   ```
   (Git Credential Manager will prompt to sign in as `dythorkomla` the first time.)
3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a
   branch → Branch: `main` / `/ (root)` → Save.**

Live within a minute or two at
`https://dythorkomla.github.io/corner-mountain-paint/`.

### Updates

```bash
git add -A
git commit -m "Describe the change"
git push
```

---

## Custom domain (cornermountainpaint.com)

The site launched on the `github.io` URL, so there is **no `CNAME` file** yet, but
the SEO tags (`canonical`, `og:*`), `sitemap.xml`, and `robots.txt` still point at
`https://www.cornermountainpaint.com`. Two ways to reconcile that:

- **Point the domain at the site** — create a file named `CNAME` in the repo root
  containing one line, `www.cornermountainpaint.com`, then set up DNS (below).
- **Stay on github.io for now** — search-and-replace
  `https://www.cornermountainpaint.com` with
  `https://dythorkomla.github.io/corner-mountain-paint` across the `.html` files,
  `robots.txt`, and `sitemap.xml`. Internal links are relative and need no change.

### DNS (when moving to the custom domain)

1. At your DNS registrar:
   - `CNAME` record: `www` → `dythorkomla.github.io`
   - Four `A` records for the apex `@` → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
2. GitHub → **Settings → Pages** → set the custom domain to
   `www.cornermountainpaint.com`, then tick **Enforce HTTPS** once the certificate
   is issued. (Setting the custom domain here writes the `CNAME` file for you.)

---

## Photo credit

All photographs are the store's own and are **not** covered by this repository's
code. Do not reuse without permission from Corner Mountain Paint.
