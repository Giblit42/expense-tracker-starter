---
name: deploy
description: Deploy the expense tracker to staging. Runs all tests, builds the production bundle, and pushes to the staging branch. Use when the user asks to deploy, ship, or push to staging.
disable-model-invocation: true
allowed-tools: Bash(npm test*), Bash(npm run *), Bash(git status*), Bash(git rev-parse*), Bash(git log*), Bash(git fetch*), Bash(git push origin HEAD:staging*)
---

# Deploy to staging

Run these steps in order. **Stop at the first failure** and report it — never push a build that failed tests or didn't compile.

## 1. Pre-flight checks

- `git status --porcelain` must be empty. If there are uncommitted changes, stop and ask the user to commit or stash them — staging should only receive committed code.
- Note the current branch (`git rev-parse --abbrev-ref HEAD`) and commit (`git log -1 --oneline`) for the final report.

## 2. Run all tests

- If `package.json` has a `test` script, run `npm test`. It must exit 0.
- If there is no `test` script (this project currently has no test runner), say so explicitly in the report — do not pretend tests passed.
- Always run `npm run lint` as well. Lint errors block the deploy; warnings do not.

## 3. Build the production bundle

- Run `npm run build`. It must exit 0 and produce `dist/`.
- Report the bundle size summary Vite prints.

## 4. Push to staging

- `git fetch origin`
- `git push origin HEAD:staging`
  - This pushes the current commit to the `staging` branch on `origin`, creating it if it doesn't exist.
  - If the push is rejected as non-fast-forward, **stop and ask the user** before doing anything else. Never force-push without explicit confirmation.

## 5. Report

Summarize in a few lines:
- Commit deployed (hash + message) and source branch
- Tests: passed / no test runner configured
- Lint: passed (with warning count if any)
- Build: passed, bundle size
- Push: `origin/staging` updated (old → new hash)
