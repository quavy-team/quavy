/// <reference lib="webworker" />

namespace serviceWorker {
  declare var self: ServiceWorkerGlobalScope;

  self.oninstall = () => self.skipWaiting();
  self.onactivate = (e) => e.waitUntil(self.clients.claim());

  const require = async (request: Request) => {
    let response = await fetch(request);
    let cache = await caches.open("stale");
    cache.put(request, response.clone());
    return response;
  };

  self.onfetch = (event) => {
    let { request, respondWith } = event;
    let { match } = caches;
    if (request.method !== "GET") return;
    if (!request.url.includes("http")) return;
    event.waitUntil(async () => {
      navigator.connection.type === ("wifi" || "ethernet")
        ? respondWith((await require(request)) || match(request))
        : respondWith((await match(request)) || require(request));
    });
  };
}
