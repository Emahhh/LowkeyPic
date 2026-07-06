# LowkeyPic

LowkeyPic is a browser-only static web app for making the current X/Twitter low-opacity hidden overlay image trend.

Positioning: **Make the hidden overlay trend in 10 seconds.**

Users upload a normal/public-facing photo, upload a hidden overlay photo, tune opacity, position, scale, rotation, blur, blend mode, grain, and export a final image. There is no backend, database, auth, server-side image processing, or paid API.

## Privacy

LowkeyPic is private by design:

- Images stay on the user’s device.
- Images are not uploaded, stored, or sent to a server.
- Image data, filenames, generated images, and user content are not tracked.
- No cookies are required.
- All image processing happens locally in the browser with Canvas APIs.

We may use privacy-friendly aggregate analytics to understand visits. Your images never leave your device.

## Safety and consent

Only use images of adults and images you own or have permission to use. LowkeyPic is a general creative tool for selfies, couples, artists, memes, fashion, photography, and trend posts. It is not positioned as an adult tool.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The static site is emitted to `dist/`. The committed GitHub Pages copy lives in `docs/`.

## Deploy to GitHub Pages

This repo commits the built static site in `docs/`, so GitHub Pages can publish without a deployment workflow.

In GitHub:

1. Go to repository Settings.
2. Open Pages.
3. Set Source to `Deploy from a branch`.
4. Select branch `main`.
5. Select folder `/docs`.
6. Save.

When the app changes, run:

```bash
npm run build
cp -R dist/. docs/.
touch docs/.nojekyll
```

## Custom domain

The root `CNAME` file and `public/CNAME` file contain:

```text
lowkeypic.emanuele.click
```

Configure DNS for the domain to point to GitHub Pages according to GitHub’s current Pages custom domain instructions.

## Cloudflare Web Analytics

There are comments in both `index.html` and `how-to-make-low-opacity-overlay-trend/index.html` where the optional Cloudflare Web Analytics script can be inserted.

Use only privacy-friendly aggregate page analytics. Do not track image data, filenames, generated images, or user content.

## Pages

- `/` - homepage, editor, short SEO tutorial, privacy sections.
- `/how-to-make-low-opacity-overlay-trend/` - crawlable SEO article targeting low opacity overlay trend searches.
