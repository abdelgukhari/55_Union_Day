# Niche Star — Eid Al Etihad 55

Next.js App Router, TypeScript, Tailwind CSS 4, Motion and Lucide. Static export, no backend.

## Run

`npm install` then `npm run dev`. Production: `npm run build` (output: `out/`).

## Sales configuration

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_WHATSAPP_NUMBER` to the verified sales number in international digits without `+`. Rebuild after changing it. Until configured, the form provides a copyable request and official company link instead of inventing a recipient.

Product copy is in `app/products.ts`. The six original SVG product illustrations are conceptual flat-print standees, not installation photographs; replace them with approved production photographs when available. All concepts require production review. No official campaign endorsement is claimed.

Arabic is default. The language toggle preserves quantities and form inputs. Browser-local storage retains drafts on the same device. The form only opens a prefilled WhatsApp message for manual sending; it does not transmit automatically.

Company reference: https://nichestaradvertising.com/ (consulted October 29, 2026). No testimonials or statistics are used.
