"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/talents/index.html","e7b6a44b935b47aced200f9e47a2787c"],["/talents/static/css/main.01bee54b.css","779d9364272732ca815fd43e092f948a"],["/talents/static/js/main.2331d7ca.js","b6aaaafe3d68f018ae2929b306c00123"],["/talents/static/media/agile.1f5b4f28.jpg","1f5b4f280b4e4ed2842f82f33d1b53d9"],["/talents/static/media/bertha.e78cc0be.jpg","e78cc0be5347b066ae42357a539f8591"],["/talents/static/media/coolcode.f93968d8.jpg","f93968d857f484952f840ea22c8cfa2d"],["/talents/static/media/fondo.fb7cfb46.jpg","fb7cfb46574558e6d056086612add9b6"],["/talents/static/media/gaby.d5b79016.jpg","d5b790160f2d04a65a6d2ee6270d2733"],["/talents/static/media/gladys.6a6e9ad6.jpg","6a6e9ad62a66b6986c50151485a6ad3b"],["/talents/static/media/mili.0d034ebe.jpg","0d034ebe683e638de096ce492e9b8484"],["/talents/static/media/raiza.6eee53aa.jpg","6eee53aadf80424f4c8cd5d2b49d9fd5"],["/talents/static/media/states.06076699.jpg","0607669924a6b68db28e7a778a0f532a"],["/talents/static/media/teamL.fec0d881.jpg","fec0d881f6feba29c293f05c00691b53"],["/talents/static/media/webD.e4d27804.jpg","e4d278045e37d7fc20f85422abd5a6c5"],["/talents/static/media/yolo.a2a42e53.jpg","a2a42e53009249a367a30de4c14f1e8d"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),r=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),r]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var n=new Request(a,{credentials:"same-origin"});return fetch(n).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(a=new URL("/talents/index.html",self.location).toString(),t=urlsToCacheKeys.has(a)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});