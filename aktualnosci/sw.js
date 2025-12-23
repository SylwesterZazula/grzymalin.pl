const CACHE = "grzymalin-aktualnosci-v1";
const APP_SCOPE = "/aktualnosci/";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll([
      APP_SCOPE,
      APP_SCOPE + "manifest.webmanifest"
    ]))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        const url = new URL(req.url);
        if (url.pathname.startsWith(APP_SCOPE) && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy));
        }
        return res;
      }).catch(() => cached);
    })
  );
});
