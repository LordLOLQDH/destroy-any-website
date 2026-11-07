# Destroy Any Website

Version **0.5.0** adds the first playable website destruction mode.

## Architecture

- `index.html`: app shell, preview and game controls
- `assets/style.css`: responsive UI, player, dual joysticks and falling-letter effects
- `assets/app.js`: URL handling, backend check, game mode, movement, aiming and shooting
- `config.js`: public backend endpoint
- Cloudflare Worker `destroy-any-website-proxy`: fetches external pages, removes common iframe-blocking headers and injects the game bridge into HTML responses

## Play

1. Enter an HTTP or HTTPS website address and load it.
2. Press **Game-Modus starten**.
3. Use the left joystick to move the character.
4. Hold the right joystick in a direction to aim and fire the single starter weapon.
5. Shots hit nearby text. The affected word's letters detach and fall away.
6. Press **Beenden** to return to the normal website preview.

## Game implementation

The proxy injects a small bridge into HTML pages. When game mode starts, the bridge wraps eligible text characters in lightweight spans. Shooting sends normalized viewport coordinates to the page, which animates the hit word's characters falling. The original remote website is not edited or saved; these effects exist only in the loaded game session.

## Important limitations

This is a compatibility proxy, not a complete remote browser. Websites that rely on strict authentication, bot checks, complex JavaScript navigation, service workers, WebSockets, or origin-bound cookies may not work correctly. Some assets are loaded directly from the original host. Removing frame headers does not guarantee that a site can be reproduced safely or completely. Dynamic pages may replace their text after the game bridge prepares it, so not every visible character is guaranteed to be destructible.

The proxy only accepts HTTP/HTTPS URLs, rejects obvious local/private targets and limits redirects. It is a public endpoint, so it should not be treated as a general-purpose private browsing service.

## Deployment

Frontend (GitHub Pages): https://lordlolqdh.github.io/destroy-any-website/

Backend health endpoint: https://destroy-any-website-proxy.adam-kraus.workers.dev/health

Change `proxyBaseUrl` in `config.js` to use another Worker endpoint. No API keys are exposed in the repository.
