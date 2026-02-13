# Your Project — Simple Website

A minimal, beautifully styled website with a warm editorial aesthetic. Built with vanilla HTML, CSS, and JavaScript.

## Quick Start

### Option 1: Open Directly in Browser (No installs)

Simply double-click `index.html` or drag it into your browser. The site works immediately with no setup.

### Option 2: Local Server with Node.js (Recommended)

If you have [Node.js](https://nodejs.org/) installed:

```bash
# Install dependencies (optional - uses npx, so this may work without install)
npm install

# Start the dev server
npm run dev
```

Then open **http://localhost:3000** in your browser.

> **Don't have Node.js?** [Download it here](https://nodejs.org/) (LTS version recommended). After installing, restart your terminal and run the commands above.

### Option 3: Live Server (VS Code / Cursor)

1. Install the **Live Server** extension in Cursor
2. Right-click `index.html` → **Open with Live Server**
3. The browser will open and auto-refresh when you save files

---

## Project Structure

```
new Project/
├── index.html          # Main HTML
├── css/
│   └── styles.css      # All styling (variables, layout, components)
├── js/
│   └── main.js         # Navigation, form, scroll effects
├── package.json        # For npm scripts (optional)
└── README.md           # This file
```

## Features

- **Responsive design** — Works on mobile, tablet, and desktop
- **Smooth animations** — Hero entrance, floating cards, hover effects
- **Accessible** — Semantic HTML, reduced-motion support
- **Custom design tokens** — Colors, spacing, and typography in CSS variables
- **No build step** — Edit and refresh. Add a bundler later if needed.

## Customization

- **Colors**: Edit the `:root` variables in `css/styles.css`
- **Fonts**: Swap the Google Fonts link in `index.html` and update `--font-display` / `--font-body`
- **Content**: Edit `index.html` to change text, add sections, or tweak structure

## Next Steps

- Add more sections or pages
- Connect the contact form to a backend or form service (e.g. Formspree, Netlify Forms)
- Deploy to GitHub Pages, Netlify, or Vercel when ready
