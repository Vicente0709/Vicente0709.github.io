//Constantes
const btnLog = document.getElementById("btnLogNav");
const btnRegister = document.getElementById("btnRegisterNav");

//logout
const btnlogout = document.getElementById("btnlogout");


//listener

btnLog.addEventListener("click", function () {
  console.log("Se hizo clic en el botón de Log In");
  window.location.href = "../views/login.html";
});

btnRegister.addEventListener("click", function () {
  console.log("Se hizo clic en el botón de Register");
  window.location.href = "../views/signup.html";
});


// Ocultar o mostrar botones si esta iniciado sesion
function verificarAutenticacionBtn() {
  let usuarioGuardado = localStorage.getItem("usuario");
  let objetoRecuperado = JSON.parse(usuarioGuardado);
  console.log(objetoRecuperado);

  if (objetoRecuperado) {
    console.log("Usuario logeado:", objetoRecuperado.email);
    btnRegister.style.display = "none";
    btnLog.style.display = "none";
    btnlogout.style.display = "block";
  } else {
    console.log("Usuario aún no logeado");
    btnRegister.style.display = "block";
    btnLog.style.display = "block";
    btnlogout.style.display = "none";
  }
}

// Verificar la autenticación al cargar botones solo disponibles cuando un usuario este logeado
verificarAutenticacionBtn();
