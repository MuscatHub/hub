/* Muscat Hub service worker: makes the panel installable as an app.
   It does not cache anything, so new versions always load from the network. */
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function (e) {
  var r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== self.location.origin) return;
  e.respondWith(fetch(r).catch(function () {
    return new Response('<p style="font-family:sans-serif;padding:24px">Muscat Hub needs an internet connection.</p>', { headers: { 'Content-Type': 'text/html' } });
  }));
});
