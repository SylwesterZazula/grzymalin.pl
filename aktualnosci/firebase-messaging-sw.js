/* global importScripts, firebase */
importScripts("https://www.gstatic.com/firebasejs/10.13.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.0/firebase-messaging-compat.js");

// WSTAW z Firebase Console → Web app config
firebase.initializeApp({
  apiKey: "AIzaSyBP2TxC5UdtmQAqyPz_QRNlzXnw5x5Ofv8",
  authDomain: "grzymalin-aktualnosci.firebaseapp.com",
  projectId: "grzymalin-aktualnosci",
  storageBucket: "grzymalin-aktualnosci.appspot.com",
  messagingSenderId: "80712147410",
  appId: "1:80712147410:web:00004e37aa14f23047680b"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload?.notification?.title || "Nowa aktualność";
  const options = {
    body: payload?.notification?.body || "Sprawdź w aplikacji",
    icon: "/aktualnosci/icons/icon-192.png",
    data: payload?.data || {}
  };
  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification?.data?.url || "/aktualnosci/";
  event.waitUntil(clients.openWindow(url));
});
