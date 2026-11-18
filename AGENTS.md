# Portfolio site notes for AI coding tools

- Static site served by GitHub Pages from `main` (custom domain in `CNAME`). Plain HTML + one stylesheet: `assets/css/site.css`. No build step.
- Design system ("quiet"): Inter 300/400, warm charcoal text, lots of white space, color only in small splashes. Each project owns one shade, set by a body class: `t-butter` (Scoping Pro), `t-blue` (ATLAS), `t-blush` (Content Engine), `t-sage` (Cost Compass), `t-peach` (Order Management), `t-teal` (Forecast Analysis), `t-lilac` (Wonder 3D Prints). Pick an unused shade for new projects.
- Every case study follows the same strategy-first order: headline as the decision → meta row → hero → In 30 seconds → situation → reframe → 3 strategic decisions (Chose / Said no to) → experience model (line diagram) → proof → outcome (honest status) → reflection → next project.
- Independent/client projects use the same template; set the eyebrow and Work-page context to "Independent · Client name".
- Only state outcomes that are confirmed. Label status explicitly (shipped, POC, proposed, not yet measured).
- Demo videos live in `assets/video/` as H.264 MP4 (1600px wide, no audio) with a matching `.jpg` poster. Don't commit HEVC or `.mov` files.
