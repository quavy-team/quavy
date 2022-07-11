self.addEventListener('install', self.skipWaiting)
self.addEventListener('activate', self.clients.claim)

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return
  event.respondWith(
    caches.open('stale').then(async (cache) => {
      const { request } = event
      const response = await cache.match(request)
      const promise = fetch(request).then((response) => {
        cache.put(request, response.clone())
        return response
      })
      return response || promise
    })
  )
})
