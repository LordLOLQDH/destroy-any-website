# Destroy Any Website

A mobile-friendly website destruction game built with vanilla HTML, CSS and JavaScript.

## What it does

- Loads a real URL in an embedded browser frame.
- Adds a transparent game layer over the loaded page with a player, crosshair, projectiles, hit effects and visible damage marks.
- Has no enemies, monsters or enemy waves.
- Includes five weapons: pistol, SMG, shotgun, burst rifle and rocket launcher.
- Supports desktop mouse/keyboard and mobile dual virtual joysticks.
- Includes weapon switching, ammo, reload, hit/damage counters, timer, browse mode and fullscreen.
- No build step, backend, API key or external dependency.

**Browser limitation:** websites can block iframe embedding. Also, browsers isolate cross-origin pages, so the game cannot alter the target website's real DOM or save damage into that website. The destruction effects are rendered as a transparent game overlay. Use **Extern öffnen** if the target refuses to embed.

## Run locally

Open `index.html` in a modern browser.

## GitHub Pages

In repository settings, open **Pages**, select **Deploy from a branch**, choose `main` and `/ (root)`, then save.

Published URL: https://lordlolqdh.github.io/destroy-any-website/

## Controls

- **WASD / arrow keys** or left joystick: move the player
- **Mouse / right joystick**: aim
- **Mouse click / FIRE**: shoot
- **1–5** or weapon list: switch weapons
- **R / RELOAD**: reload
- **BROWSEN**: temporarily interact with the website
- **Fullscreen**: expand the game
