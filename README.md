# Shashank Pawar — Developer Portfolio

Production-ready static developer portfolio built with semantic **HTML5**, **CSS3**, and **Vanilla JavaScript**. Engineered for speed, accessibility, technical SEO, and clean deployment on **Vercel** via GitHub.

## Overview

- **Developer:** Shashank Pawar
- **Focus:** Full Stack Development, Python Backend Systems (Flask / FastAPI), VPS Hosting & Cloud Deployment
- **Location:** Satara, Maharashtra, India
- **Academic Background:** B.Sc. Data Science (CGPA: 9.7/10)

## Tech Stack

- **HTML5:** Semantic landmarks, structured data (JSON-LD), Open Graph & Twitter metadata
- **CSS3:** Custom dark design system (`#080B12` / `#0E1421` / `#111827` / `#3B82F6`), CSS Grid & Flexbox, responsive breakpoints (`360px`, `390px`, `768px`, `1024px`, `1440px`), `prefers-reduced-motion` support
- **Vanilla JavaScript:** Centralized configuration (`PORTFOLIO_CONFIG`), accessible mobile drawer & modal focus management, scroll-spy active navigation, `IntersectionObserver` reveal animations, clipboard helper, dynamic footer year
- **Typography & Icons:** Google Fonts (`Space Grotesk`, `Inter`, `JetBrains Mono`) and lightweight inline SVG icons

## Directory Structure

```text
/
├── index.html
├── robots.txt
├── sitemap.xml
├── README.md
├── assets/
│   ├── icons/
│   │   ├── apple-touch-icon.png
│   │   ├── favicon-32x32.png
│   │   └── favicon.svg
│   ├── images/
│   │   ├── monogram-grid.svg
│   │   └── og-cover.png
│   └── screenshots/
│       ├── mahajan-hospital-placeholder.svg
│       ├── mama-pedhewale-placeholder.svg
│       └── sk-relax-placeholder.svg
├── css/
│   ├── responsive.css
│   └── style.css
└── js/
    ├── animations.js
    └── main.js
```

## Configuring Placeholders

All optional or pending portfolio assets are centralized inside `PORTFOLIO_CONFIG` at the top of `js/main.js` so you do not need to hunt through HTML:

1. **Resume PDF:**
   - Place your PDF inside `assets/` (e.g., `assets/Shashank_Pawar_Resume.pdf`).
   - Update `PORTFOLIO_CONFIG.resume.url = "assets/Shashank_Pawar_Resume.pdf"`.

2. **Client Project Screenshots & Live URLs:**
   - Save optimized `.webp` or `.png` screenshots inside `assets/screenshots/`.
   - Update `screenshot`, `screenshotAlt`, and `liveUrl` under `PORTFOLIO_CONFIG.featuredProjects` (`mamaPedhewale`, `skRelax`, `mahajanHospital`).
   - If a client project later has a public repository, set `isRepoPublic: true` and provide `repoUrl` to reveal the **View Code** button automatically.

3. **Additional Engineering Project Repositories:**
   - Update `repoUrl` entries under `PORTFOLIO_CONFIG.engineeringProjects` (`aiAttendance`, `creditRisk`, `heartDisease`). (`clinicSync` is already linked to `https://github.com/shashankpawar/clinic-sync-ml`.)

4. **Canonical Domain, `robots.txt`, and `sitemap.xml`:**
   - Replace `https://shashankpawar.vercel.app` in `index.html` (`canonical`, `og:url`, `og:image`, `twitter:image`), `robots.txt`, and `sitemap.xml` with your final Vercel or custom domain.

## Local Development

Run any static HTTP server from the repository root:

```bash
# Option 1: Python built-in HTTP server
python -m http.server 8000

# Option 2: Node static server
npx serve .
```

Then open `http://localhost:8000` in your browser.

## Deploying to Vercel via GitHub

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial developer portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Sign in to [vercel.com](https://vercel.com) and click **Add New → Project**.
   - Import your GitHub repository.
   - Leave **Framework Preset** as **Other** (static site), **Build Command** empty, and **Output Directory** as `.` (root).
   - Click **Deploy**.

3. **Automatic Deployments:**
   - Every push to `main` automatically triggers a production deployment on Vercel, and pull requests generate preview URLs.
