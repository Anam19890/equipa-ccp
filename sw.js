const CACHE = "equipa-ccp-202610251721";
const FICHEIROS = ["./", "index.html", "estilos.css", "app.bundle.js", "motor-ia.worker.js", "pdf.worker.min.mjs", "manifest.webmanifest", "icone-192.png", "icone-512.png",
  "fonts/literata-latin-400-italic.woff2",
  "fonts/literata-latin-400-normal.woff2",
  "fonts/literata-latin-600-normal.woff2",
  "fonts/literata-latin-700-normal.woff2",
  "fonts/public-sans-latin-400-normal.woff2",
  "fonts/public-sans-latin-500-normal.woff2",
  "fonts/public-sans-latin-600-normal.woff2",
  "fonts/public-sans-latin-700-normal.woff2",
];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FICHEIROS)).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith("equipa-ccp-") && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => {
  const u = new URL(e.request.url);
  if (u.origin !== location.origin || e.request.method !== "GET") return;
  e.respondWith(fetch(e.request).then((r) => { const c = r.clone(); caches.open(CACHE).then((k) => k.put(e.request, c)); return r; }).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
