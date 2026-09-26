importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyAhURW1Dq4_V3Pkgu1WBArq0-_hd29UTgo",
    authDomain: "rsk-esports-ec1f0.firebaseapp.com",
    databaseURL: "https://rsk-esports-ec1f0-default-rtdb.firebaseio.com",
    projectId: "rsk-esports-ec1f0",
    storageBucket: "rsk-esports-ec1f0.firebasestorage.app",
    messagingSenderId: "263767871816",
    appId: "1:263767871816:web:95173cf3a003d97c5fe37d",
    measurementId: "G-WS755HT6GJ"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const notification = payload && payload.notification ? payload.notification : {};
    const data = payload && payload.data ? payload.data : {};
    const title = notification.title || data.title || 'RSK ESPORTS';
    const body = notification.body || data.body || '';
    if (!body) return;

    self.registration.showNotification(title, {
        body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: data.tag || 'rsk-esports',
        data: { url: data.url || '/' }
    });
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const targetUrl = (event.notification.data && event.notification.data.url) || '/';
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            for (const client of clientList) {
                if ('focus' in client) {
                    client.navigate(targetUrl);
                    return client.focus();
                }
            }
            if (clients.openWindow) return clients.openWindow(targetUrl);
        })
    );
});
