self.addEventListener('fetch', event => {
    if (event.request.mode !== 'navigate')
        return

    event.respondWith(
        fetch(event.request)
            .then(response => {
                const clone = response.clone()
                caches.open('index').then(cache =>
                    cache.put('/', clone)
                )
                return response
            })
            .catch(() => caches.match('/'))
    )
})

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('index')
            .then(cache => cache.add('/'))
    )
    self.skipWaiting()
})