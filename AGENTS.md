# Portfolio site notes for AI coding tools

- Static site served by GitHub Pages from `main` (custom domain in `CNAME`). No server config; `.htaccess` is ignored.
- Tailwind CSS v3.4.17 is **compiled**, not loaded from the CDN. After adding or changing Tailwind classes in any `.html` file, run:
  `npm install` (first time) then `npm run build:css`
  and commit the updated `assets/css/tailwind.css`. Otherwise new classes won't have styles.
- `assets/css/tailwind.css` must stay the **last** stylesheet in `<head>` so utilities override page CSS, matching the old CDN behavior.
- Demo videos live in `assets/video/` as H.264 MP4 (1600px wide, no audio) with a matching `.jpg` poster. Don't commit HEVC or `.mov` files.
