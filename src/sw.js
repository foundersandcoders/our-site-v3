self.addEventListener("install", function() {
  self.skipWaiting();
});

self.addEventListener("activate", function() {
  caches.keys().then(function(names) {
    for (let name of names) caches.delete(name);
  });
  self.registration
    .unregister()
    .then(function() {
      return self.clients.matchAll();
    })
    .then(function(clients) {
      clients.forEach(client => client.navigate(client.url));
    });
});
