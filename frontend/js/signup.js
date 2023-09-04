var firebaseConfig = {
    // Aquí debes agregar la configuración de tu proyecto Firebase
    apiKey: "AIzaSyAq3PWrGxMVqAcvfXwpC21vzsSQlVI-AdM",
    authDomain: "polimarket-93916.firebaseapp.com",
    projectId: "polimarket-93916",
    storageBucket: "polimarket-93916.appspot.com",
    messagingSenderId: "624045411960",
    appId: "1:624045411960:web:55537b983ead1f3516e78d",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Obtener referencias a los elementos del formulario
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");
var passwordConfirmInput = document.getElementById("password-confirm");

// Agregar un listener al formulario para capturar el evento de envío
document.getElementById("formulario").addEventListener("submit", function (e) {
    e.preventDefault(); // Evitar el envío del formulario por defecto

    var email = emailInput.value.trim();
    var password = passwordInput.value;
    var passwordConfirm = passwordConfirmInput.value;

    // Validar que el correo tenga un formato válido
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(email)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return; // No continuar si el correo no es válido
    }

    if (password !== passwordConfirm) {
        alert("Las contraseñas no coinciden.");
        return; // No continuar si las contraseñas no coinciden
    }

    // Crear usuario con Firebase
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(function (userCredential) {
            // El inicio de sesión fue exitoso
            var user = userCredential.user;
            console.log("Usuario creado exitoso:", user);
            //todo redirigir a la pagina principal
            alert("Usuario creado exitosamente");
            localStorage.setItem("usuario", JSON.stringify(user));
            alert("Usuario logeado exitosamente");
            window.location.href = "index.html";
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
