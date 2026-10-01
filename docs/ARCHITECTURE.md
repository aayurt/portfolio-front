# Architecture — portfolio-front

Public Next.js 16 site at https://aayurtshrestha.com.np. Data comes from
Payload (`portfolio-admin`); this app also serves its own `/api/*` routes
(search, track, publications, password gate).

Binding decisions live in `docs/adr/`; this document states the standing
rules any change must respect.

## Rules

1. **Payload is the source of truth.** Page/blog/work content is fetched
   from `NEXT_PUBLIC_API` (`/admin/api`). Never hardcode content that
   belongs in the CMS. Degrade to empty on fetch failure — never crash
   the route (see `DEPLOY.md` troubleshooting).
2. **API routes are governed.** `src/app/api/**` is governed by ADR-0001
   (API + Payload contract). Changes there require referencing ADR-0001.
3. **Docs are the contract.** A change that contradicts
   `docs/ARCHITECTURE.md`, `docs/CONVENTIONS.md`, or `docs/TESTING.md`
   must update them in the same change set.
4. **Boundary discipline.** Never read or write outside the repo root.
   Never touch `.env`, `.env.prod`, `.next/`, or `node_modules/`.
5. **Layer direction is mechanical.** `mcp-rules.json` declares
   `app → components → foundation`; `validate_architecture` fails on
   outward imports. Foundation (`lib/resources/utils/types`) never
   imports `app` or `components`.

## Layering

- `src/app/**` — App Router pages, layouts, `/api/*` routes. Composes
  everything, owns routing only.
- `src/components/**` — Reusable UI (Once UI + custom). No direct
  `fetch` to Payload except via `lib`/server helpers where possible.
- `src/lib/**`, `src/resources/**`, `src/utils/**`, `src/types/**` —
  Foundation: data fetchers, site config (`once-ui.config.ts`,
  `content.tsx`), pure helpers. No imports from `app`/`components`.
- `scripts/deploy-standalone.sh` — Sole deploy path (see `DEPLOY.md`).
  Do not add alternate deploy scripts without an ADR.

## Changing the architecture

Copy `docs/adr/0000-template.md`, fill it in, follow
proposed → accepted → superseded before implementing.
