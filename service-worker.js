const CACHE_NAME = 'lottowin-pwa-v1';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    'https://cdn.tailwindcss.com',
    'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js',
    'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);

    // 로컬 리소스는 그대로 addAll
    await cache.addAll([
      './',
      './index.html',
      './manifest.json'
    ]);

    // 외부 리소스는 no-cors fetch 후 put
    const externalUrls = [
      'https://cdn.tailwindcss.com',
      'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js',
      'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
    ];

    for (const url of externalUrls) {
      const request = new Request(url, { mode: 'no-cors' });
      const response = await fetch(request);
      await cache.put(request, response);
    }
  })());
});
