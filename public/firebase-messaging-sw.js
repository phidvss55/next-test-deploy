importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: 'AIzaSyDJa3fdP8TMhBVYCbuC-YzqqkqpfTneVcY',
  authDomain: 'notify-app-eea12.firebaseapp.com',
  projectId: 'notify-app-eea12',
  storageBucket: 'notify-app-eea12.appspot.com',
  messagingSenderId: '832279435998',
  appId: '1:832279435998:web:42e78e37a01524f3a3c04f',
  measurementId: 'G-PB0FZP9QNB',
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  // console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
