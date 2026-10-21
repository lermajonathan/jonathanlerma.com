# jonathanlerma.com

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

## Go live on jonathanlerma.com

1. **Create the repository** on GitHub as **public**, for example `lermajonathan/jonathanlerma.com`, without a README (this repo already has one). Then, from this folder:
   ```bash
   git init -b main
   git add .
   git commit -m "Portfolio built with Pance"
   git remote add origin https://github.com/lermajonathan/jonathanlerma.com.git
   git push -u origin main
   ```
2. **Turn on Pages:** Settings → Pages → Source: **GitHub Actions**. The workflow in `.github/workflows/deploy.yml` runs every check and deploys only if they all pass.
3. **Protect `main`:** Settings → Rules → Rulesets → New branch ruleset → target `main` → turn on _Require status checks to pass_ and pick **Verify (definition of done)**, plus _Block force pushes_. Nobody else can push anyway; this stops a broken change of your own from going live.
4. **Verify the domain** (recommended, prevents domain takeovers): your profile Settings → Pages → _Add a domain_ → `jonathanlerma.com`, and add the TXT record GitHub shows you at your DNS provider.
5. **Point the domain:** at your DNS provider, set the apex `jonathanlerma.com` to GitHub Pages with four A records — `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` — and `www` as a CNAME to `lermajonathan.github.io`. Remove the records that point to the current site.
6. **Custom domain:** repo Settings → Pages → Custom domain → `jonathanlerma.com`. When the certificate is ready, tick **Enforce HTTPS**. (With an Actions deployment no `CNAME` file is needed; the setting lives in the repo.)

`pance-ds.jonathanlerma.com` is a separate subdomain and keeps working as it is.

## Licence

All rights reserved — see [LICENSE](LICENSE). The code is public to be read, not reused. Pance, the typefaces and the icons keep their own open licences.
