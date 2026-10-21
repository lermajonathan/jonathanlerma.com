# Working on this site

## Definition of done

A change is done when `npm run verify` passes. Nothing ships otherwise, and CI enforces the same list:

1. **Formatting** — `npm run format:check` (Prettier).
2. **Types** — `npm run check` (Astro + TypeScript, strict).
3. **Unit and component tests** — `npm test` (Vitest).
4. **Build** — `npm run build`.
5. **Integration tests** — `npm run test:e2e`, against the built site in a real browser:
   - zero axe-core violations (WCAG 2.2 AA + best practices) on every page, light and dark, desktop and phone;
   - every internal link, image and anchor resolves;
   - the theme choice carries across pages, with and without browser storage;
   - inspect mode works from the keyboard;
   - no JavaScript errors in the console;
   - every page stays under 1.2 MB;
   - content is readable with JavaScript turned off.

If a change alters what the site looks like on purpose, say so in the pull request. If it doesn't, it shouldn't.

## Test-driven development

Logic is written test-first, in short red → green → refactor cycles:

1. Write a failing test that describes the behaviour (`npm run test:watch` keeps it running).
2. Write the least code that makes it pass.
3. Clean up — names, duplication, structure — with the test still green.

Where that applies here:

| Kind of code                                                                                                      | Where it lives         | How it's tested                                     |
| ----------------------------------------------------------------------------------------------------------------- | ---------------------- | --------------------------------------------------- |
| Rules (theme resolution, links, formatting, filtering, scroll maths, shortcuts)                                   | `src/lib/*.ts`         | Unit tests next to each file (`*.test.ts`)          |
| Interactive islands (timeline filter, contact picker, brand lab)                                                  | `src/components/*.tsx` | Component tests with Testing Library (`*.test.tsx`) |
| Content rules (unique slugs, a page per project, measured results only for shipped work, installed Pance version) | `src/data/`            | `src/data/data.test.ts`                             |
| Build scripts (brand-scope generator)                                                                             | `scripts/lib/`         | `scripts/lib/*.test.mjs`                            |
| The built site as a whole                                                                                         | `dist/`                | `tests/e2e/`                                        |

Browser scripts in `src/scripts/` and `<script>` blocks stay thin: they wire DOM events to functions from `src/lib/`, which is where the tested logic is.

## Where things go

- **Copy and numbers** — `src/data/`. Numbers about Pance live once, in `src/data/pance.ts`; pages read them from there.
- **Layout and sections** — `src/components/sections/` (home), `src/components/case/` and `src/layouts/Case.astro` (case studies).
- **Small building blocks** — `src/components/ui/`.
- **Design tokens** — from `@pance/tokens`. `src/styles/global.css` only adds the editorial layer (display type, atmosphere, depth, inspect mode). Never hard-code a colour that a Pance token already names.

## Adding a case study

1. Add the project to `src/data/work.ts`.
2. Create `src/pages/work/<slug>.astro` using `Case` and `CaseSection`. The data test fails until the page exists.
3. Label it honestly: `Shipped`, `Open source`, `In progress` or `Concept`. Only shipped work shows measured results.
4. Run `npm run og` after building, to render its link-preview image.
