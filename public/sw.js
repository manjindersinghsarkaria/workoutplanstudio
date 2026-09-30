const CACHE_NAME = "workout-plan-studio-v3"; // Increment version to force cache refresh
const URLS_TO_CACHE = [
  "/manifest.json"
];

self.addEventListener("install", (event) => {
  console.log('[SW] Installing service worker v3');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log('[SW] Activating service worker v3');
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  if (url.pathname.startsWith("/api/")) return;

  // NEVER cache HTML/JS/CSS - always fetch from network
  if (
    event.request.url.includes('.js') ||
    event.request.url.includes('.css') ||
    event.request.url.includes('.html') ||
    event.request.destination === 'document'
  ) {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .catch(() => {
          // Only use cache as absolute last resort (offline)
          return caches.match(event.request);
        })
    );
    return;
  }

  // Cache-first for images and other assets only
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request)
          .then((networkResponse) => {
            if (
              networkResponse &&
              networkResponse.status === 200 &&
              event.request.url.startsWith(self.location.origin)
            ) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseClone);
              });
            }
            return networkResponse;
          })
          .catch(() => cachedResponse)
      );
    })
  );
});