var CACHE_NAME = 'gih-cache-v5';
var CACHED_URLS = [
  // Our HTML
  'first.html',
    'offline.html',
    'index.html',
     'second.html',
     'test_start_materialize.html',
    //CSS
    'min-style.css',
    'styles.css',
    'mystyles.css',
  // JavaScript
    'material.js',
  // Images
   '/eventsimages/example-blog01.jpg',
    '/eventsimages/example-blog02.jpg', 
    '/eventsimages/example-blog03.jpg', 
    '/eventsimages/example-blog04.jpg', 
    '/eventsimages/example-blog05.jpg', 
    '/eventsimages/example-blog06.jpg', 
    '/eventsimages/example-blog07.jpg', 
    '/eventsimages/example-work01.jpg',
    '/eventsimages/example-work02.jpg',
    '/eventsimages/example-work03.jpg',
    '/eventsimages/example-work04.jpg',
    '/eventsimages/example-work05.jpg',
    '/eventsimages/example-work06.jpg',
    '/eventsimages/example-work07.jpg',
    '/eventsimages/example-work08.jpg',
    '/eventsimages/example-work09.jpg',
    '/events/appimages/android-icon-36x36.png',
    '/events/appimages/android-icon-48x48.png',
    '/events/appimages/android-icon-72x72.png',
    '/events/appimages/android-icon-96x96.png',
    '/events/appimages/android-icon-144x144.png',
    '/events/appimages/android-icon-192x192.png',
     '/events/appimages/apple-icon.png',
    '/events/appimages/apple-icon-57x57.png',
     '/events/appimages/apple-icon-60x60.png',
     '/events/appimages/apple-icon-72x72.png',
     '/events/appimages/apple-icon-76x76.png',
     '/events/appimages/apple-icon-114x114.png',
     '/events/appimages/apple-icon-120x120.png',
     '/events/appimages/apple-icon-144x114.png',
     '/events/appimages/apple-icon-152x152.png',
     '/events/appimages/apple-icon-180x180.png',
    '/events/appimages/apple-icon-precomposed.png',
    '/events/appimages/dino.png',
    '/events/appimages/favicon-16x16.png',
    '/events/appimages/favicon-32x32.png',
    '/events/appimages/favicon-96x96.png',
    '/events/appimages/jack.jpg',
    '/events/appimages/ms-icon-70x70.png',
    '/events/appimages/ms-icon-144x144.png',
    '/events/appimages/ms-icon-150x150.png',
    '/events/appimages/ms-icon-310x310.png',
    '/events/appimages/paddy.jpg',
];

self.addEventListener('install', function(event) {
  // Cache everything in CACHED_URLS. Installation will fail if something fails to cache
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHED_URLS);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        } else if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('first.html');
        }
      });
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName.startsWith('gih-cache') && CACHE_NAME !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
