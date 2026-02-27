# README Fact-Check Audit

- Target: `README.md`
- Date: 2026-02-27
- Scope: Validate every factual claim in the README against local project sources and official docs stack references.
- Primary sources used:
  - `docs_kaspa_org` source files and runtime checks
  - Official docs URLs referenced by the README
  - `/Users/luke/Projects/rusty-kaspa` presence check (`audit/evidence/readme/rusty_kaspa_presence.txt:1`) (no README claims required protocol validation from this repo)

## Claim Matrix

| # | README claim | Status | Evidence | Fix |
|---|---|---|---|---|
| 1 | Project is `docs_kaspa_org`. | VERIFIED | `README.md:1`, `package.json:2` | None. |
| 2 | "This is a Next.js application". | VERIFIED | `README.md:3`, `package.json:7`, `package.json:18`, `src/app/layout.tsx:1` | None. |
| 3 | "generated with Create Fumadocs". | UNVERIFIED | `README.md:3-4`; initial commit only says "Initial docs site with Fumadocs" (`audit/evidence/readme/git_provenance.txt:1`). No direct proof of the exact generator command. | Reword to verifiable wording: "This is a Next.js documentation site built with Fumadocs." |
| 4 | `npm run dev` runs the development server. | VERIFIED | `README.md:9`, `audit/evidence/readme/dev_npm_3041.txt:14-25` | None. |
| 5 | `pnpm dev` runs the development server. | VERIFIED | `README.md:11`, `audit/evidence/readme/dev_pnpm_3042.txt:14-25` | None. |
| 6 | `yarn dev` runs the development server. | VERIFIED | `README.md:13`, `audit/evidence/readme/dev_yarn_3043.txt:13-23`, `audit/evidence/readme/toolchain_checks.txt:4-5` | Optional clarity: note Yarn/Corepack requirement. |
| 7 | "Open http://localhost:3000 ... to see the result." | ISSUES | Port `3000` can be unavailable (`audit/evidence/readme/dev_port_3000_conflict.txt:6-15`). Next reports the actual local URL at startup (`audit/evidence/readme/dev_npm_3041.txt:18`). | Change to: "Open `http://localhost:3000` (or the URL printed by `next dev`) in your browser." |
| 8 | `lib/source.ts` path in Explore section. | ISSUES | README references `lib/source.ts` (`README.md:22`), but actual path is `src/lib/source.ts` (`audit/evidence/readme/path_existence.txt:1`, `audit/evidence/readme/path_existence.txt:6`). | Replace path with `src/lib/source.ts`. |
| 9 | `lib/source.ts` describes content source adapter using `loader()`. | VERIFIED | `src/lib/source.ts:2`, `src/lib/source.ts:6-10`; `loader` exported by Fumadocs source API (`node_modules/fumadocs-core/dist/source/index.d.ts:5`). | Keep description, but reference the correct file path (`src/lib/source.ts`). |
| 10 | `lib/layout.shared.tsx` path in Explore section. | ISSUES | README references `lib/layout.shared.tsx` (`README.md:23`), but actual path is `src/lib/layout.shared.tsx` (`audit/evidence/readme/path_existence.txt:2`, `audit/evidence/readme/path_existence.txt:7`). | Replace path with `src/lib/layout.shared.tsx`. |
| 11 | `layout.shared` contains shared layout options. | VERIFIED | `src/lib/layout.shared.tsx:9-60`; consumed by `src/app/(home)/layout.tsx:2-5` and `src/app/docs/layout.tsx:3-8`. | None. |
| 12 | Route `app/(home)` is "for your landing page and other pages." | ISSUES | Path is wrong in README (`README.md:27` vs actual `src/app/(home)` in `audit/evidence/readme/path_existence.txt:3`, `audit/evidence/readme/path_existence.txt:8`). Also only `layout.tsx` and `page.tsx` exist in that group (`audit/evidence/readme/app_route_tree.txt:1-3`), with home redirecting to `/docs` (`src/app/(home)/page.tsx:4`). | Change row to `src/app/(home)` and describe accurately: "home layout + redirect page to `/docs`". |
| 13 | Route `app/docs` is documentation layout/pages. | ISSUES | README path omits `src/` (`README.md:28`); actual path exists as `src/app/docs` (`audit/evidence/readme/path_existence.txt:4`, `audit/evidence/readme/path_existence.txt:9`) with layout/page files (`audit/evidence/readme/app_route_tree.txt:5-7`). | Change path to `src/app/docs`. |
| 14 | Route `app/api/search/route.ts` is search route handler. | ISSUES | README path omits `src/` (`README.md:29`); actual path is `src/app/api/search/route.ts` (`audit/evidence/readme/path_existence.txt:5`, `audit/evidence/readme/path_existence.txt:10`). Handler is implemented via `createFromSource` (`src/app/api/search/route.ts:4-7`). | Change path to `src/app/api/search/route.ts`. |
| 15 | `source.config.ts` is included. | VERIFIED | `README.md:33`, `source.config.ts:1` | None. |
| 16 | `source.config.ts` supports schema customization (e.g., frontmatter). | VERIFIED | `source.config.ts:2`, `source.config.ts:6-16`, comment at `source.config.ts:4-5`; `defineDocs` and exported schema types in `node_modules/fumadocs-mdx/dist/config/index.d.ts:1-2`. | None. |
| 17 | Fumadocs MDX intro link is valid. | VERIFIED | `README.md:35`, URL check `audit/evidence/readme/link_checks.txt:3` (HTTP 200). | None. |
| 18 | Next.js Documentation link is valid and docs/API-oriented. | VERIFIED | `README.md:42-43`; URL check `audit/evidence/readme/link_checks.txt:4`; page title/API snippets `audit/evidence/readme/next_docs_snippets.txt:2-6`. | None. |
| 19 | Learn Next.js link is valid and tutorial-oriented. | VERIFIED | `README.md:44`; URL check `audit/evidence/readme/link_checks.txt:5`; tutorial/quiz copy `audit/evidence/readme/next_learn_snippets.txt:2-5`. | None. |
| 20 | Fumadocs homepage link is valid. | VERIFIED | `README.md:45`, URL check `audit/evidence/readme/link_checks.txt:6`. | None. |
| 21 | Create Fumadocs GitHub link resolves. | VERIFIED | `README.md:4`, URL check `audit/evidence/readme/link_checks.txt:1`. | None. |
| 22 | Fumadocs Source API link resolves. | VERIFIED | `README.md:22`, URL check `audit/evidence/readme/link_checks.txt:2`. | None. |

## Summary

- VERIFIED: 15
- ISSUES: 6
- UNVERIFIED: 1

## Recommended README Corrections (Minimal)

1. Replace all `lib/...` and `app/...` path mentions with `src/lib/...` and `src/app/...`.
2. Reword localhost line to include fallback to the URL printed by Next.js.
3. Reword "generated with Create Fumadocs" to a directly verifiable statement unless provenance proof is added.
4. Tighten `app/(home)` description to match current behavior (redirect to `/docs`, no additional pages currently in that group).
