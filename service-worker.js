importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

if (workbox) {
	workbox.precaching.precacheAndRoute([
		{ url: '/', revision: '1' },
		{ url: '/images/header.webp', revision: '1' },
      	{ url: '/images/icons/favicon.ico', revision: '1' },
      	{ url: '/manifest.json', revision: '1' },
	    { url: '/index.html', revision: '1' },
	    { url: '/nav.html', revision: '1' },
	    { url: '/teamdetails.html', revision: '1' },
	    { url: '/css/materialize.min.css', revision: '1' },
	    { url: '/css/style.css', revision: '1' },
	    { url: '/js/materialize.min.js', revision: '1' },
	    { url: '/js/app.js', revision: '1' },
	    { url: '/js/details.js', revision: '1' },
	    { url: '/js/idb.js', revision: '1' },
	    { url: '/js/db.js', revision: '1' },
	    { url: '/js/api.js', revision: '1' },
      	{ url: '/js/main.js', revision: '1' },
	    { url: '/js/nav.js', revision: '1' },
	    { url: '/js/register.js', revision: '1' },
	]);

    workbox.routing.registerRoute(
      new RegExp('/pages/'),
      new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'pages'
     })
    );

	workbox.routing.registerRoute(
	  /\.(?:png|gif|jpg|jpeg|svg)$/,
	  new workbox.strategies.CacheFirst({
	    cacheName: 'images',
	    plugins: [
	      new workbox.cacheableResponse.CacheableResponsePlugin({
            statuses: [0, 200],
          }),
	      new workbox.expiration.ExpirationPlugin({
	        maxEntries: 60,
	        maxAgeSeconds: 30 * 24 * 60 * 60,
	      }),
	    ],
	  }),
	);

	workbox.routing.registerRoute(
	  /(.*)teamdetails(.*)\.html/,
	  new workbox.strategies.StaleWhileRevalidate({
	  	cacheName: 'team-details',
	  })
	);

	workbox.routing.registerRoute(
	  /^https:\/\/api\.football-data\.org\/v2/,
	  new workbox.strategies.StaleWhileRevalidate()
	);

	workbox.routing.registerRoute(
	  /^https:\/\/fonts\.googleapis\.com/,
	  new workbox.strategies.StaleWhileRevalidate({
	    cacheName: 'google-fonts-stylesheets',
	  })
	);

	workbox.routing.registerRoute(
	  /^https:\/\/fonts\.gstatic\.com/,
	  new workbox.strategies.CacheFirst({
	    cacheName: 'google-fonts-webfonts',
	    plugins: [
	      new workbox.cacheableResponse.CacheableResponsePlugin({
	        statuses: [0, 200],
	      }),
	       new workbox.expiration.ExpirationPlugin({
	        maxAgeSeconds: 60 * 60 * 24 * 365,
	        maxEntries: 30,
	      }),
	    ],
	  })
	);
} else {
	console.log(`Workbox gagal dimuat`);
}

self.addEventListener('push', (event) => {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  let options = {
    body: body,
    icon: 'images/icons/icon-512x512.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});