self.addEventListener('fetch', event => {
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

    if (event.request.url.endsWith('icon-192.png')) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    const clone = response.clone()
                    caches.open('icon-192.png').then(cache =>
                        cache.put('icon-192.png', clone)
                    )
                    return response
                })
                .catch(() => caches.match('icon-192.png'))
        )
        return
    }

    if (event.request.url.endsWith('icon-512.png')) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    const clone = response.clone()
                    caches.open('icon-512.png').then(cache =>
                        cache.put('icon-512.png', clone)
                    )
                    return response
                })
                .catch(() => caches.match('icon-512.png'))
        )
        return
    }

    if (event.request.mode !== 'navigate')
        return

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
            caches.open('icon-192.png')
                .then(cache => cache.add('icon-192.png')),
            caches.open('icon-512.png')
                .then(cache => cache.add('icon-512.png')),
            caches.open('favicon.ico')
                .then(cache => cache.add('favicon.ico'))
        ])
    )
    self.skipWaiting()
})