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
var passwordInput = document.getElementById("password");

// Agregar un listener al formulario para capturar el evento de envío
document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault(); // Evitar el envío del formulario por defecto

  var email = emailInput.value;
  var password = passwordInput.value;

  // Iniciar sesión con Firebase
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function (userCredential) {
      // El inicio de sesión fue exitoso
      var user = userCredential.user;
      alert("Credenciales correctas");
      //todo redirigir a la pagina principal
      window.location.href = "../views/index.html";
    })
    .catch(function (error) {
      // Ocurrió un error durante el inicio de sesión
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error("Error en el inicio de sesión:", errorCode, errorMessage);
      // Mostrar el mensaje de error al usuario
      alert(
        "Error en el inicio de sesión. Por favor, verifica tus credenciales."
      );
    });
});
