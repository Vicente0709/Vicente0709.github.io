// Función para verificar la autenticación
function verificarAutenticacion() {
  let usuarioGuardado = localStorage.getItem("usuario");
  let objetoRecuperado = JSON.parse(usuarioGuardado);
  console.log(objetoRecuperado);

  if (objetoRecuperado) {
    console.log("Usuario logeado:", objetoRecuperado.email);
  } else {
    console.log("Usuario aún no logeado");
    alert("Para poder acceder porfavor inicie sesión");
    window.location.href = "../views/login.html";
  }
}

// Verificar la autenticación al cargar la página
verificarAutenticacion();
