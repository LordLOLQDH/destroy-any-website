# Destroy Any Website

Version **0.5.1** improves the first playable website destruction mode.

## Play

1. Enter an HTTP or HTTPS website and load it.
2. Press **Game-Modus starten**.
3. Use the left joystick to move the character. The page scrolls along with movement.
4. Hold the right joystick to aim and fire the starter weapon.
5. The weapon fires a ray through the page; the first text hit breaks into falling letters.
6. Press **Beenden** to restore normal website interaction.

## Controls and implementation

- During game mode the iframe has pointer events disabled, so taps, links, buttons and manual scrolling on the website cannot be used.
- The game overlay receives joystick input.
- Movement sends scroll deltas to the proxied page.
- Shooting sends the player's position and aim direction to a script bridge injected by the Cloudflare Worker.
- The bridge samples the shot path for text characters and animates the hit word falling away.
- All destruction effects are temporary and only exist in the current loaded page session. The original remote website is not changed.

## Architecture

- `index.html`: app shell, preview and game controls
- `assets/style.css`: responsive UI, player, dual joysticks and weapon effects
- `assets/app.js`: URL handling, backend check, game mode, movement, aiming and firing
- `config.js`: public backend endpoint
- Cloudflare Worker `destroy-any-website-proxy`: fetches external pages, removes common iframe-blocking headers and injects the game bridge into HTML responses

## Limitations

This is a compatibility proxy, not a complete remote browser. Sites that rely on strict authentication, bot checks, complex JavaScript navigation, service workers, WebSockets, or origin-bound cookies may not work correctly. Some assets are loaded directly from the original host. Dynamically rendered text may be added after the bridge has prepared the page; the bridge also prepares newly added text when another shot is fired. Not every kind of text or canvas-rendered content can be destroyed.

The proxy only accepts HTTP/HTTPS URLs, rejects obvious local/private targets and limits redirects. It is a public endpoint, not a private browsing service.

## Deployment

Frontend: https://lordlolqdh.github.io/destroy-any-website/

Backend: https://destroy-any-website-proxy.adam-kraus.workers.dev/

Health endpoint: https://destroy-any-website-proxy.adam-kraus.workers.dev/health

No API keys are exposed in the repository.
