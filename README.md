# PlayHere Landing

The marketing landing page for PlayHere, the multi-sport platform for scoring local matches live, running tournaments and keeping one player profile across every sport. Built with React, Vite and TypeScript.

## Run

```bash
pnpm install
pnpm dev        # http://localhost:5174
pnpm build      # production build in dist/
pnpm preview    # serve the build on http://localhost:4174
```

Requires Node 20+ and pnpm 10 (`npm i -g pnpm@10`).

## Configuration

Copy `.env.example` to `.env.local` and set `VITE_APP_URL` to where the "Sign in", "Start free" and other app buttons should send people (default `http://localhost:5173`, the web app).

## Structure

```
src/App.tsx         page sections: nav, hero, sports, features, how it works, showcases, audience, FAQ, footer
src/Scoreboard.tsx  animated phone demo cycling through cricket, football and badminton scoring
src/Icon.tsx        small inline icon set (no icon library)
src/Logo.tsx        the PlayHere logo mark
src/styles.css      all styles (dark hero, light sections, responsive)
```
