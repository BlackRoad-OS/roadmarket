# RoadMarket

Digital Product Marketplace & Creator Economy Platform by BlackRoad OS, Inc.

## Project Structure

- `index.html` — Main landing page (static HTML, no build step)
- `clerk-integration/` — Clerk.com authentication module
  - `clerk-auth.html` — Sign-in/sign-up page
  - `clerk-protected.js` — Client-side route protection wrapper
- `.github/workflows/` — CI/CD and automation
  - `ci.yml` — HTML validation on push/PR
  - `deploy-pages.yml` — Deploy to GitHub Pages
  - `auto-pr.yml` — Auto-label, auto-merge dependabot PRs
  - `stale.yml` — Auto-close stale issues/PRs (weekly)
  - `issue-manager.yml` — Auto-triage, spam filter, rate limiting

## Development

This is a static HTML project. No build step required.

```bash
npx serve .          # Local dev server
npm run validate     # Validate HTML files
```

## Deployment

Deploys automatically to GitHub Pages on push to master/main.

For Cloudflare Pages: `npx wrangler pages deploy . --project-name=roadmarket`

## Clerk Authentication

The Clerk integration requires a publishable key. Set `data-clerk-publishable-key` in `clerk-integration/clerk-auth.html` with your actual Clerk key before deploying auth pages.

## Guidelines

- Keep it simple — this is a static site, no frameworks needed
- All styles are inline in HTML files for zero-dependency deployment
- Test changes locally with `npx serve .` before pushing
- Workflows use `timeout-minutes` and `concurrency` to prevent runaway jobs
