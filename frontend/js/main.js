//Constantes
const btnLog = document.getElementById("btnLogNav");
const btnRegister = document.getElementById("btnRegisterNav");
const btnPublicar = document.getElementById("btnBanner");


//listener

btnLog.addEventListener("click", function () {
  console.log("Se hizo clic en el botón de Log In");
  window.location.href = "../views/login.html";
});

btnRegister.addEventListener("click", function () {
  console.log("Se hizo clic en el botón de Register");
  window.location.href = "../views/signup.html";
});

btnPublicar.addEventListener("click", function () {
  console.log("Se hizo clic en el botón de publiar de la pagina home");
  window.location.href = "../views/createProduct.html";
});

