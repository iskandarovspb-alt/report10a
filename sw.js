const CACHE_NAME = 'energetikov-v2';
const ASSETS = ['index.html', 'manifest.json', 'icon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

// Исправленный обработчик: пропускает POST-запросы формы напрямую в Google
self.addEventListener('fetch', (e) => {
  if (e.request.method === 'POST') {
    return; // Просто выходим и не мешаем форме отправляться
  }
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
