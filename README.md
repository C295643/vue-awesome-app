# vue-project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

Copy `.env.example` to `.env` and fill in your Azure app registration values (see [Azure AD Authentication](#azure-ad-authentication) below):

```sh
cp .env.example .env
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

The dev server is pinned to `http://localhost:5175` (`strictPort: true` in `vite.config.ts`) so it never silently falls back to another port and drifts out of sync with the Azure redirect URI.

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

## Azure AD Authentication

Sign-in is handled client-side with [`@azure/msal-browser`](https://github.com/AzureAD/microsoft-authentication-library-for-js) using the authorization code + PKCE flow (redirect, no popups).

### Files

- `src/auth/msalConfig.ts` — MSAL `Configuration` built from env vars, plus the `loginRequest` scopes (`User.Read`).
- `src/auth/msal.ts` — the `PublicClientApplication` instance and `initializeMsal()`, which handles the redirect response and restores the active account on page load.
- `src/auth/useAuth.ts` — a composable (`account`, `login()`, `logout()`) that reactively tracks the signed-in account.
- `src/main.ts` — calls `initializeMsal()` before mounting the app.
- `src/App.vue` — sign-in / sign-out button and signed-in user display.

### Environment variables

| Variable | Description |
| --- | --- |
| `VITE_AZURE_CLIENT_ID` | Application (client) ID from the Azure app registration |
| `VITE_AZURE_TENANT_ID` | Directory (tenant) ID |
| `VITE_AZURE_REDIRECT_URI` | Must exactly match a redirect URI registered on the app (`http://localhost:5175` for local dev) |

`.env` is gitignored — only `.env.example` (with blank values) is committed.

### Azure App Registration setup

1. [Azure Portal](https://portal.azure.com) → **App registrations** → **New registration**.
2. Set the redirect platform to **Single-page application (SPA)** and add `http://localhost:5175` as the redirect URI.
3. Copy the **Application (client) ID** and **Directory (tenant) ID** into `.env`.
4. Under **API permissions**, `Microsoft Graph > User.Read` (delegated) is enabled by default and is all this app currently needs.

If you change the dev port in `vite.config.ts`, update `VITE_AZURE_REDIRECT_URI` and the redirect URI in the app registration to match — they must be identical or sign-in will fail.
