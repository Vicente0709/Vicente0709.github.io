// Obtén una referencia al formulario y a los campos de entrada
const signupForm = document.querySelector('#form-group');
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');

// Agrega un evento de envío al formulario
signupForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Evita el envío del formulario por defecto

  const email = emailInput.value;
  const password = passwordInput.value;

  // Crea un nuevo usuario en Firebase Authentication
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // El usuario se ha creado exitosamente
      const user = userCredential.user;
      console.log('Usuario creado:', user);
    })
    .catch((error) => {
      // Ocurrió un error durante la creación del usuario
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Error al crear el usuario:', errorCode, errorMessage);
    });
});