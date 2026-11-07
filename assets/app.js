(() => {
  const config = window.APP_CONFIG || {};
  const base = String(config.proxyBaseUrl || "").replace(/\/$/, "");
  const $ = (id) => document.getElementById(id);
  const form = $("load-form");
  const input = $("website-url");
  const frame = $("website-frame");
  const status = $("status");
  const placeholder = $("placeholder");
  const loadButton = $("load-button");
  const reloadButton = $("reload-button");
  const openButton = $("open-button");
  const backendState = $("backend-state");
  let currentUrl = "";

  function normalise(value) {
    let valueToCheck = value.trim();
    if (!/^https?:\/\//i.test(valueToCheck)) valueToCheck = "https://" + valueToCheck;
    try {
      const parsed = new URL(valueToCheck);
      if (!["http:", "https:"].includes(parsed.protocol)) return null;
      return parsed.href;
    } catch { return null; }
  }

  function proxyUrl(url) {
    return base + "/proxy?url=" + encodeURIComponent(url);
  }

  async function checkBackend() {
    if (!base) {
      backendState.textContent = "Backend nicht konfiguriert";
      backendState.className = "backend-state offline";
      return false;
    }
    try {
      const response = await fetch(base + "/health", { cache: "no-store" });
      if (!response.ok) throw new Error("Backend antwortet nicht");
      const data = await response.json();
      if (!data.ok) throw new Error("Ungültige Backend-Antwort");
      backendState.textContent = "Backend verbunden · " + data.version;
      backendState.className = "backend-state online";
      return true;
    } catch {
      backendState.textContent = "Backend nicht erreichbar";
      backendState.className = "backend-state offline";
      return false;
    }
  }

  function load(url) {
    currentUrl = url;
    input.value = url;
    placeholder.hidden = true;
    frame.classList.add("visible");
    loadButton.disabled = true;
    reloadButton.disabled = false;
    openButton.disabled = false;
    status.textContent = "Backend lädt " + new URL(url).hostname + " …";
    frame.src = proxyUrl(url);
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const url = normalise(input.value);
    if (!url) {
      status.textContent = "Bitte gib eine gültige HTTP- oder HTTPS-Adresse ein.";
      return;
    }
    if (!await checkBackend()) {
      status.textContent = "Das Backend ist nicht erreichbar. Die Website wurde nicht geladen.";
      return;
    }
    load(url);
  });

  frame.addEventListener("load", () => {
    if (!currentUrl) return;
    loadButton.disabled = false;
    status.textContent = "Antwort vom Proxy erhalten. Die Darstellung der Zielseite wird geladen.";
  });

  reloadButton.addEventListener("click", () => {
    if (currentUrl) load(currentUrl);
  });

  openButton.addEventListener("click", () => {
    if (currentUrl) window.open(currentUrl, "_blank", "noopener,noreferrer");
  });

  checkBackend();
})();