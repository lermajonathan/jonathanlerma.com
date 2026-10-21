# ux.jonathanlerma.com

Portfolio of Jonathan Lerma — design systems & design engineering.
Built with **[Pance](https://pance-ds.jonathanlerma.com)** (`@pance/react` + `@pance/tokens`) and Astro, hosted on GitHub Pages.

## Run it

```bash
npm install
npm run dev       # http://localhost:4321
npm test          # unit and component tests
npm run verify    # everything CI runs: format, types, tests, build, integration
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the definition of done, the test-first workflow and where things go.

## How it's put together

| Path                                             | What it is                                                                                        |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| `src/data/`                                      | All copy and numbers. Pance facts live once in `pance.ts`.                                        |
| `src/lib/`                                       | Plain, tested logic: theme rules, link handling, formatting, filtering, scroll maths.             |
| `src/components/sections/`                       | The home page, one file per section.                                                              |
| `src/components/case/`, `src/layouts/Case.astro` | The case-study template.                                                                          |
| `src/components/*.tsx`                           | React islands: timeline filter, contact picker, brand lab. Everything else is static HTML.        |
| `src/components/SystemStack.astro`               | The hero's exploded view of a design system, built from real Pance components.                    |
| `src/scripts/`                                   | Thin browser scripts (theme toggle, inspect mode, reveal-on-scroll) wired to `src/lib/`.          |
| `src/styles/global.css`                          | The editorial layer on top of Pance tokens.                                                       |
| `src/styles/brand-scope.css`                     | Generated on every build by `scripts/brand-scope.mjs`, so `[data-brand]` can swap the brand ramp. |
| `tests/e2e/`                                     | Integration tests against the built site.                                                         |

**Inspect mode:** press <kbd>I</kbd> on any page. Elements with a `data-spec` attribute show the tokens they're built from.

## Hosting

The site lives at **[ux.jonathanlerma.com](https://ux.jonathanlerma.com)** on GitHub Pages.

- **Deploys:** every push to `main` runs `.github/workflows/deploy.yml`. It runs the whole definition of done and publishes only if every check passes (Settings → Pages → Source: **GitHub Actions**).
- **Domain:** a `CNAME` record `ux` → `lermajonathan.github.io` at the DNS provider, with the custom domain set in Settings → Pages and **Enforce HTTPS** on. With an Actions deployment no `CNAME` file is needed in the repo.
- **Base URL:** `site` in `astro.config.mjs` drives canonical links, Open Graph images and the JSON-LD. Change it if the domain ever changes.

`pance-ds.jonathanlerma.com` and the lab subdomains are separate sites.

## Licence

All rights reserved — see [LICENSE](LICENSE). The code is public to be read, not reused. Pance, the typefaces and the icons keep their own open licences.
