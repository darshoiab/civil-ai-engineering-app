# civil-ai-engineering-app
Civil Engineering AI App (JKSSR Estimation + BOQ + Soil Analysis)

A lightweight, dependency-free web app for civil engineering tasks. Plain
HTML/CSS/JS — no build step, no heavy frameworks.

## Structure
- `frontend/` — UI pages
  - `index.html` — landing page / tool launcher
  - `3d-model.html` — interactive 3D villa model (Three.js via CDN)
  - `estimator.html` — quantity takeoff + BOQ calculator
- `backend/` — logic
  - `estimate.js` — quantity takeoff + BOQ generation (also runnable in Node)
- `data/` — datasets
  - `house-plan.json` — digitized ground-floor plan (rooms, dimensions, plot, layout)
  - `ssr-rates.json` — sample JKSSR-style rate schedule (**placeholder rates**)
  - `*.js` — browser-loadable mirrors of the JSON (so pages work from `file://`)
- `utils/`
  - `build-data.js` — regenerate the `data/*.js` mirrors from the JSON

## Usage
Open `frontend/index.html` in a browser. The 3D model needs internet access
(loads Three.js from a CDN); the estimator works fully offline.

After editing any `data/*.json`, regenerate the browser mirrors:

```
node utils/build-data.js
```

## Notes
- SSR rates in `data/ssr-rates.json` are **placeholder samples** — replace them
  with the applicable Schedule of Rates before using totals for real work.
- The 3D model and the digitized layout are a schematic interpretation of the
  supplied drawings, not survey-accurate.
