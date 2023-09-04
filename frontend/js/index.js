//const axios = require('axios').default;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  if (form) {
    form.addEventListener("submit", createProduct);
  }
});

function createProduct(event) {
  event.preventDefault();
  // Recuperar el objeto desde el localStorage
  let usuarioGuardado = localStorage.getItem("usuario");
  let usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;

  if (usuario) {
    // Acceder al email del usuario
    let email = usuario.email;
    console.log("Email del usuario:", email);
    inputEmail = document.getElementById("user");
    inputEmail.value=email
    console.log(inputEmail.value);
    let formData = new FormData();
    formData.append("user", document.getElementById("user").value);
    formData.append("ID", 2);
    formData.append("type", document.getElementById("tipo").value);
    formData.append("title", document.getElementById("titulo").value);
    formData.append("state", document.getElementById("estado").value);
    formData.append(
      "description",
      document.getElementById("descripcion").value
    );
    formData.append("count", document.getElementById("cantidad").value);
    formData.append("value", document.getElementById("valor").value);
    formData.append("image", document.getElementById("imagen").files[0]);

    axios
      .post("http://localhost:3000/polimarket/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Respuesta del servidor", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    console.log("Usuario no logeado");
  }
}
