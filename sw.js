const CACHE_NAME = 'multietools-v1';
const STATIC_ASSETS = [
  'index.html',
  'tools.html',
  'css/global.css',
  'js/global.js',
  'favicon.svg'
];

// Install — cache core assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate — clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch — network first, cache fallback
self.addEventListener('fetch', e => {
  // Skip non-GET and CDN requests
  if (e.request.method !== 'GET') return;
  if (e.request.url.includes('cdnjs.cloudflare.com') || 
      e.request.url.includes('fonts.googleapis.com') ||
      e.request.url.includes('api.') ||
      e.request.url.includes('emailjs.com')) return;

  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Cache successful responses for same-origin
        if (res.ok && e.request.url.startsWith(self.location.origin)) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request).then(cached => cached || caches.match('index.html')))
  );
});
