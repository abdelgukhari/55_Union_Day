# Niche Star — Beyond the Frame

Existing Eid Al Etihad 55 campaign, redesigned in place. Next.js App Router, TypeScript, Tailwind CSS 4, Motion and Lucide. Static export; no backend.

## Run and validate

- `npm install`
- `npm run dev`
- `npm run build` creates `out/`.
- `node scripts/verify-site.mjs` checks the built site with local headless Chrome. Override the browser location with `CHROME_PATH` when necessary. Screenshots are saved to ignored `outputs/qa/`. The test intercepts WhatsApp requests and sends no messages.

## Sales configuration

The user-confirmed default is **+971 56 793 3174**. Override `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local` with international digits and rebuild. Product links immediately open `wa.me` with the active language, product name and code. No form, cart, selection, quantity controls or confirmation step.

Product copy: `app/products.ts`. Messages: `app/whatsapp.ts`. SVG contour coordinates: `app/artwork.ts`. Artwork presentation: `app/StandeeArt.tsx`. The original `Standee.tsx` and `globals.css` are retained as unused legacy source.

## Assets

The supplied logo is copied byte-for-byte to `public/niche-star-logo.png`; its colors, proportions and lettering are unchanged. All six standee visuals come from the supplied asset directory, retain their original aspect ratios, and are labelled **Concept Visual** / **تصميم تصوّري**. They are not claimed to be completed installations. WebP versions are in `public/designs/`, with source filenames recorded in `sources.json`. Regenerate optimized copies with `node scripts/prepare-assets.mjs "F:/CUT OUT 55"`. No AI images were generated for this redesign.

## Languages and motion

Arabic defaults to RTL. English uses LTR. Only language preference is saved in browser-local storage. The old quote draft is removed on first load. Product content is always accessible without hover. Scroll tracing, frame overlaps and directional arrows use SVG/CSS/Motion; reduced-motion mode disables animation and displays complete outlines.

## Campaign analytics

Every WhatsApp link pushes `whatsapp_cta_click` into `window.dataLayer` and dispatches `niche:whatsapp-click`. Event properties: `product_code`, `product_name`, `language`, `placement`. A general contact CTA has a null product code. Connect a tag manager/analytics listener to collect the events externally. No analytics service is installed; events represent link clicks only, never sent messages or confirmed inquiries. No customer details are collected.

Company capability reference: https://nichestaradvertising.com/ (consulted October 29, 2026). The studio section only references its published design/artwork, large-format printing and finishing services. No fake reviews, prices or delivery promises.
