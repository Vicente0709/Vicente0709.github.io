
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCpDkfFUmhbE4xvx5BwcXOBO8zOWyyeRjk",
    authDomain: "polimercado-epn-3f66a.firebaseapp.com",
    projectId: "polimercado-epn",
    storageBucket: "polimercado-epn.appspot.com",
    messagingSenderId: "241132334837",
    appId: "1:241132334837:web:35f7b920015c7601f5dfbc",
    measurementId: "G-CM3L98NPC6"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);