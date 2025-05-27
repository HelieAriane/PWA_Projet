const CACHE_VERSION = 'v2';
const CACHE_NAME = `avis-alertes-cache-${CACHE_VERSION}`;
const STATIC_CACHE = `avis-alertes-static-${CACHE_VERSION}`;
const MAP_TILE_CACHE = `avis-alertes-map-tiles-${CACHE_VERSION}`;
const BACKEND_URL = "https://avis-alertes-arianehelie.onrender.com";

// Assets to cache - Vite-specific paths
const urlsToCache = [
  './',
  './index.html',
  './assets/index-a5WmKbCz.js',
  './assets/index-HKo-lU_1.css',
  './assets/logo_footer-BnavPvK6.svg',
  './assets/logo_header-4dMxm99W.svg',
  './manifest.json',
  './vite.svg',
  // Add any other static assets your app needs
];

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => {
        return cache.addAll(urlsToCache);
      }),
      self.skipWaiting()
    ])
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name.startsWith('avis-alertes-'))
          .filter(name => ![STATIC_CACHE, CACHE_NAME, MAP_TILE_CACHE].includes(name))
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - implement cache-first with network fallback
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url)
  if (!(url.protocol === 'http:' || url.protocol === 'https:')) {
    return;
  }

  if (url.pathname.startsWith('/api/alerts')) {
    const proxyUrl = `${BACKEND_URL}${url.pathname}${url.search}`;
    event.respondWith(
      fetch(proxyUrl, {
        method: event.request.method,
        headers: event.request.headers,
        mode: 'cors',
      }).then(response => {
        if (!response.ok) throw new Error('Network response was not ok');

        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });

        return response;
      }).catch(() => {
        return caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) return cachedResponse;
            console.error('Fetch failed:', err);
            return new Response('Service Unavailable', { status: 503, statusText: 'Service Unavailable' });
          });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Return cached response if found
        if (cachedResponse) {
          return cachedResponse;
        }

        // If not in cache, fetch from network
        return fetch(event.request)
          .then(response => {
            // Don't cache non-200 responses
            if (!response.ok) return response;

            // Clone the response as it can only be used once
            const responseToCache = response.clone();

            // Only cache GET requests from http/https (évite chrome extention)
            if (event.request.method === 'GET') {
              // Cache the successful response
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, responseToCache));
            }

            return response;
          })
          .catch(error => {
            console.error('Fetch failed:', error);
            // Return offline page or fallback response if needed
            return new Response('Offline', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});

self.addEventListener('push', event => {
  let data = { title: 'Notification', body: 'Vous avez une nouvelle alerte.' };

  try {
    if (event.data) {
      data = event.data.json(); // essaie de parser en JSON
    }
  } catch (e) {
    // Si parsing échoue, utilise texte brut
    data.body = event.data.text();
  }

  self.registration.showNotification(data.title, {
    body: data.body,
    icon: '/icons/android/android-launchericon-192-192.png',
  });

  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        title: data.title,
        body: data.body,
      });
    });
  });
});