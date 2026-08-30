self.addEventListener('fetch', event => {
    if (event.request.mode !== 'navigate')
        return

    if (event.request.url.endsWith('manifest.json')) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    const clone = response.clone()
                    caches.open('manifest.json').then(cache =>
                        cache.put('manifest.json', clone)
                    )
                    return response
                })
                .catch(() => caches.match('manifest.json'))
        )
        return
    }

    if (event.request.url.endsWith('favicon.ico')) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    const clone = response.clone()
                    caches.open('favicon.ico').then(cache =>
                        cache.put('favicon.ico', clone)
                    )
                    return response
                })
                .catch(() => caches.match('favicon.ico'))
        )
        return
    }

    if (new URL(event.request.url).pathname !== '/')
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
        Promise.all([
            caches.open('index')
                .then(cache => cache.add('/')),
            caches.open('manifest.json')
                .then(cache => cache.add('manifest.json')),
            caches.open('favicon.ico')
                .then(cache => cache.add('favicon.ico'))
        ])
    )
    self.skipWaiting()
})