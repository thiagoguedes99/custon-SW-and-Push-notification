if ('function' === typeof importScripts) {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
  );
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([]);

/* custom cache rules*/
workbox.routing.registerNavigationRoute('/index.html', {
  blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
});


self.addEventListener('push', event => {

  console.log('event');
  console.log(event);
  const data = event.data.json();
  console.log('data');
  console.log(data);

  const options = {
    body: data.body,
    // icon: 'images/notification-flat.png',
    icon: 'logo192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {action: 'explore', title: 'Go to the site',
        // icon: 'images/checkmark.png'},
        icon: 'logo192.png'},
      {action: 'close', title: 'Close the notification',
        // icon: 'images/xmark.png'},
        icon: 'logo192.png'},
    ]
  };

  event.waitUntil(
    // self.registration.showNotification('Título da notificação', options)
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('fetch', (event) => {
  console.log('foi o fetch');
  console.log(event);

});

} else {
    console.log('Workbox could not be loaded. No Offline support');
  }
}
