
var photos_cache
caches.open('photos').then(_ => photos_cache = _)

const request_photo = ({url, retry}) =>
    fetch(url, {mode: 'no-cors'})
    .then(r =>
        (r.ok || r.type == 'opaque') &&
        photos_cache.put(url, r.clone())
        .then(
            () => r,
            e => {
                console.error('sw.js', '1. CacheStorage put', 'url:', url, 'error:', e, 'respond:', r, 'retry:', retry)
                debugger
                //here need retrun `r` anyway
                return r
            }
        )
    )
    .catch(e => {
        console.error('sw.js', '2. fetch(mode no-cors)', 'url:', url, 'error:', e)
        debugger
        if (retry > 0) {
            return request_photo({url, retry: retry - 1})
        }
    })

self.addEventListener('fetch', event => {
    const u = event.request.url
    if (u.includes('cdn.chotot.com') && u.endsWith('.jpg')) {
        event.respondWith(
            photos_cache.match(u)
            .then(cached_r =>
                cached_r || request_photo({url: u, retry: 2})
            )
            .catch(e => {
                console.error('sw.js', '3. JPG last catch - load default', e)
                return photos_cache.match('/photo-default.jpg') 
                .then(cached_r =>
                    cached_r || request_photo({url: '/photo-default.jpg', retry: 0})
                )
            })
        )
        return
    }
    
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