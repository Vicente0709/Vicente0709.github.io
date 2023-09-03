//const axios = require('axios').default;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  if (form) {
    form.addEventListener("submit", createProduct);
  }
});

function createProduct(event) {
  event.preventDefault();

  let formData = new FormData();
  formData.append("user", "mateo.morales01@epn.edu.ec");
  formData.append("ID", 2);
  formData.append("type", document.getElementById("tipo").value);
  formData.append("title", document.getElementById("titulo").value);
  formData.append("state", document.getElementById("estado").value);
  formData.append("description", document.getElementById("descripcion").value);
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
}
