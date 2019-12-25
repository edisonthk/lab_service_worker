// 参考サイト
// Google code labs - offline 
//
// https://developers.google.com/web/fundamentals/codelabs/offline
// https://github.com/GoogleChromeLabs/airhorn/blob/master/app/index.html
// https://github.com/GoogleChromeLabs/airhorn/blob/master/app/sw.js

const CACHE_NAME = 'my-cache-v3';
const urlsToCache = [
  '.',
  '/index.html',
  '/style.css',
];

// キャッシュするべきのURLリストを初期化
const initializeCacheList = () => {
  return caches.open(CACHE_NAME)
    .then(cache => cache.addAll(urlsToCache));
};

// もしリクエストのキャッシュが存在したら、キャッシュを返す。
// もしなかったら、ネットワークから fetch する。
const responseIfCached = (request) => {
  return caches.open(CACHE_NAME)
    .then(cache => cache.match(request))
    .then(response => {
      return response || fetch(request);
    });
};

// 使われていないキャッシュを消す
const removeUnusedCache = () => {
  return caches.keys().then((keyList) => {
    return Promise.all(keyList.map((key) => {
      if(key !== CACHE_NAME) {
        return caches.delete(key);
      }
    }));
  });
};

self.addEventListener('install', (event) => {
  
  event.waitUntil(initializeCacheList());
});

self.addEventListener('fetch', (event) => {

  // fetchイベントはrequest時に発火する
  event.respondWith(responseIfCached(event.request));
});

self.addEventListener('activate', (event) => {
  
  event.waitUntil(removeUnusedCache());
});