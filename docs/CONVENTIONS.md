# Conventions — portfolio-front

Coding and naming conventions. `CONTRIBUTING.md` covers workflow; this
file covers the code itself.

## Naming

- Files/dirs: `kebab-case` for new files; existing `PascalCase.tsx`
  components (Once UI style) stay as-is.
- Types/components: `PascalCase`. Functions/variables: `camelCase`.
- Constants: `SCREAMING_SNAKE_CASE`. Env: `NEXT_PUBLIC_*` for
  build-time public vars.
- Tests mirror the file they test: `visits.test.ts` next to `visits.ts`.

## Code style

- TypeScript strict. Biome formats (`biome.json`, double quotes,
  2-space, 100-col). Run `pnpm biome-write` before commit.
- One responsibility per module; prefer small files.
- No default exports in `lib`/`utils`; named exports only.
- Client components need `"use client"` at the top; server components
  by default elsewhere.
- No secrets or absolute paths in source; config from env or
  `src/resources/once-ui.config.ts`.
- SCSS modules (`*.module.scss`) for component styles; global tweaks
  in `src/resources/custom.css`.

## Commits

- Imperative mood, 50-char subject, body explains *why*.
- Reference ADR numbers when relevant (`Implements ADR-0001`).

## Documentation

- Architecturally significant decisions get an ADR in `docs/adr/`.
- Public helpers get doc comments; internal helpers may stay lean.
