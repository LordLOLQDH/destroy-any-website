# Website Loader

A minimal browser-based website preview tool. The current build focuses only on loading and displaying a real URL in an iframe.

## Use

Open `index.html`, enter a URL and press **Website laden**. You can reload the current page or open it in a separate tab.

## Important browser limitation

Some websites block iframe embedding using `X-Frame-Options` or Content Security Policy (`frame-ancestors`). A normal browser page cannot bypass those protections. The loader reports that an embed may be blocked and provides an external-tab fallback. The browser does not expose a reliable way for this page to inspect the cross-origin frame's internal error state.

## GitHub Pages

Enable Pages in repository settings: **Deploy from a branch** → `main` → `/(root)`.

https://lordlolqdh.github.io/destroy-any-website/

No build step, backend, API key or external dependency is required.
