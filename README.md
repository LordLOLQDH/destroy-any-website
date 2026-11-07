# Destroy Any Website

Version **0.4.0** introduces a modular frontend and a Cloudflare Worker backend.

## Architecture

- `index.html`: application shell
- `assets/style.css`: responsive interface
- `assets/app.js`: URL handling, backend health check and preview controls
- `config.js`: public backend endpoint
- Cloudflare Worker `destroy-any-website-proxy`: fetches external pages and removes common iframe-blocking response headers

## How it works

1. Enter an HTTP or HTTPS URL.
2. The frontend checks the Worker at `/health`.
3. The preview iframe loads `/proxy?url=...`.
4. The Worker fetches the page, follows a limited number of redirects, strips common frame-blocking headers and rewrites ordinary links/forms to continue through the proxy.

## Important limitations

This is a compatibility proxy, not a complete remote browser. Websites that rely on strict authentication, bot checks, complex JavaScript navigation, service workers, WebSockets, or origin-bound cookies may not work correctly. Some assets are loaded directly from the original host. Removing frame headers does not guarantee that a site can be reproduced safely or completely.

The proxy only accepts HTTP/HTTPS URLs, rejects obvious local/private targets and limits redirects. It is a public endpoint, so it should not be treated as a general-purpose private browsing service.

## Deployment

The frontend is hosted with GitHub Pages:

https://lordlolqdh.github.io/destroy-any-website/

The backend is deployed as a Cloudflare Worker:

https://destroy-any-website-proxy.adam-kraus.workers.dev/health

To change the backend host, update `proxyBaseUrl` in `config.js`.

No API keys are exposed in the repository.
