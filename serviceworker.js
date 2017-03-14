var CACHE_NAME = 'gih-cache';
var CACHED_URLS = [
  'offline.html',
  'mystyles.css’,
  'dino.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHED_URLS);
    })
  );
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match('offline.html');
    })
  );
});
