self.importScripts('app.js');

var cacheName = 'app_cache';
var appShellFiles =[
    './',
    'app.js',
    'sytel.css',
    'favicon.ico',
    'img/home-bg.jpg'
]

var images =[];

for(var i = 0; i < 'assets/img'.length; i++) {
    images.push('assets/img/' + '.jpg');
}

var contentToCache = appShellFiles.concat()

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[Service Worker] Caching all: app shell and content');
            return cache.addAll(contentToCache);
        })
    );
});

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            console.log('[Service Worker] Fetching resource: ' + e.request.url);
            return r || fetch(e.request).then(function (response) {
                return caches.open(cacheName).then(function (cache) {
                    console.log('[Service Worker] Caching new resource: ' + e.request.url);
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (cacheName.indexOf(key) == -1) {
                    return caches.delete(key);
                }
            }));
        })
    );
});