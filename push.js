  var webPush = require('web-push');

  const vapidKeys = {
     "publicKey": "BDXUKXYtOwYJP5ZlPm6dqSCsPyBiNMskxct55cN8tixGJYDZRg8_-Mwu8iKSehnnV9_NQajI7kV_9rMGNEgUogU",
     "privateKey": "vR6Q11rZ0QmN9yTZUr49SbKHPsP8T_NpcLXaSlhn-5o"
  };
   
   
  webPush.setVapidDetails(
     'mailto:example@yourdomain.org',
     vapidKeys.publicKey,
     vapidKeys.privateKey
  )

  var pushSubscription = {
     "endpoint": "https://fcm.googleapis.com/fcm/send/cFVePRF_HQ4:APA91bFubYUkmh3JUSulGcAj--ZUEp_IVFlP1mPxJYqixQpbfTlK6A_5Y0IDOZM74jbppten24IZ87puEdg8hBl87Xl2aKGjvhWAmHCplV7edwhzDReb_qJRa1v9q-zDpDDS9mVK-drc",
     "keys": {
         "p256dh": "BE5uPU6ffZT0qN5S9D0sCd+65ClLSlvvujN2SzCrCxtdxQoamGm6uQ4KR6IHvEgvpm4SUhwojvYAA2hX8gjlaCk=",
         "auth": "FOXOOT+Vug3WiFk9Yi3SNQ=="
     }
  };

  var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
   
  var options = {
     gcmAPIKey: '676466606638',
     TTL: 60
  };
  
  webPush.sendNotification(
     pushSubscription,
     payload,
     options
  );