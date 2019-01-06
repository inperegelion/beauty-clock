'use strict';
// importScripts('sw-toolbox.js');
// toolbox.precache(['index.html', 'style.css', 'script.js']);
// toolbox.router.get('./icons/*', toolbox.cacheFirst);
// toolbox.router.get('./*', toolbox.networkFirst, {
//   networkTimeoutSeconds: 5
// });

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

if (workbox) {console.log(`Yay! Workbox is loaded 🎉`)}
workbox.routing.registerRoute(
  new RegExp('.*\.js'),
  workbox.strategies.networkFirst()
);
workbox.routing.registerRoute(
  '/',
  workbox.strategies.networkFirst()
);
workbox.routing.registerRoute(
  '/style.css',
  workbox.strategies.networkFirst()
);
