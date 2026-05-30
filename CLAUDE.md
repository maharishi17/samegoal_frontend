# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm**.

- `pnpm dev` — start the dev server on port 3000
- `pnpm build` — production build (Vite)
- `pnpm preview` — serve the production build locally
- `pnpm test` — run the Vitest suite once (`vitest run`)
  - Single file: `pnpm test src/path/to/file.test.tsx`
  - Single test by name: `pnpm test -t "test name"`
  - Watch mode: `pnpm exec vitest`
- `pnpm check` — Biome lint + format check (run this before considering work done)
- `pnpm lint` / `pnpm format` — lint or format in isolation; add `--write` to apply fixes

## Architecture

This is a **client-only React 19 SPA** built with Vite and TanStack Router (file-based routing). Despite the README's mentions of TanStack Start, server functions, and API routes, none of that is wired up here — there is no SSR and no server entry. The app boots in the browser only.

Boot flow:
- `index.html` mounts `/src/main.tsx` into `<div id="app">`.
- `src/main.tsx` is the real entry point: it builds the router from `routeTree` and renders `<RouterProvider>`.
- `src/router.tsx` exports a `getRouter()` factory and the `Register` type-augmentation, but `main.tsx` currently constructs its own router inline rather than calling `getRouter()`. Keep router config changes in sync between the two, or consolidate onto `getRouter()`.

Routing:
- Routes live in `src/routes/`. Adding a file there creates a route; TanStack's Vite plugin generates `src/routeTree.gen.ts` automatically.
- **Never hand-edit `src/routeTree.gen.ts`** — it is generated (and excluded from Biome). It regenerates on dev/build.
- `src/routes/__root.tsx` is the root layout: renders `<Outlet />` plus the TanStack devtools panel.
- `autoCodeSplitting` is enabled in `vite.config.ts`, so routes are split automatically.

## UI components

- **shadcn/ui** is configured (`components.json`, style `radix-nova`, base color `neutral`, `rsc: false`). Generated components live in `src/components/ui/` (currently `button.tsx`, `dialog.tsx`); add more via the shadcn CLI rather than hand-writing them.
- Primitives come from `radix-ui`, variants from `class-variance-authority`, icons from `lucide-react`.
- Compose class names with the `cn()` helper in `src/lib/utils.ts` (`clsx` + `tailwind-merge`).
- Aliases (per `components.json`): components → `@/components`, ui → `@/components/ui`, utils → `@/lib/utils`, hooks → `@/hooks`.
- Note: `components.json` points `tailwind.config` at `tailwind.config.js`, but this project uses Tailwind v4's CSS-based config (no JS config file) — theming lives in `src/styles.css`.

## Conventions

- **Path aliases**: import from `src/` via `#/*` or `@/*` (e.g. `import x from "#/router"`). Both map to `./src/*`.
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite`; global styles in `src/styles.css` (imported in `__root.tsx`).
- **Formatting (Biome)**: tab indentation, double quotes, organize-imports on. `src/routeTree.gen.ts` and `src/styles.css` are ignored by Biome.
- **TypeScript** is strict with `noUnusedLocals`/`noUnusedParameters`; `verbatimModuleSyntax` is on, so use `import type` for type-only imports.
- Files prefixed with `demo` are scaffolding and safe to delete.
