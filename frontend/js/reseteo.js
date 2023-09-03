// Initialize Firebase
var firebaseConfig = {
  // Aquí debes agregar la configuración de tu proyecto Firebase
  apiKey: "AIzaSyAq3PWrGxMVqAcvfXwpC21vzsSQlVI-AdM",
  authDomain: "polimarket-93916.firebaseapp.com",
  projectId: "polimarket-93916",
  storageBucket: "polimarket-93916.appspot.com",
  messagingSenderId: "624045411960",
  appId: "1:624045411960:web:55537b983ead1f3516e78d",
};
firebase.initializeApp(firebaseConfig);

// Obtener referencias a los elementos del formulario
var emailInput = document.getElementById("email");

// Agregar un listener al formulario para capturar el evento de envío
document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault(); // Evitar el envío del formulario por defecto

  var email = emailInput.value;

  // Llama a la función de Firebase para restablecer la contraseña
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(function () {
      // Restablecimiento de contraseña exitoso
      alert(
        "Se ha enviado un correo electrónico para restablecer la contraseña."
      );
      window.location.href = "login.html";
    })
    .catch(function (error) {
      // Ocurrió un error durante el restablecimiento de contraseña
      var errorMessage = error.message;
      alert("Error al restablecer la contraseña: " + errorMessage);
    });
});
