function readProducts() {
  axios
    .get("http://localhost:3000/polimarket/read", {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log("SI HAY RESPUESTA");
      let products = response.data;
      console.log(products);
      const panel = document.getElementById("panel");
      products.forEach((element) => {
        console.log(element.product.title);
        let nuevoDivPrincipal = document.createElement("div");
        nuevoDivPrincipal.classList.add("product-card");
        nuevoDivPrincipal.style = "cursor: pointer";
        
        let nuevaImagen = document.createElement("img");
        nuevaImagen.addEventListener("click", function () {
          let productoID = element.id;
          localStorage.setItem("productoID", productoID);
          window.location.href = "../views/viewProduct.html";
        });

        nuevaImagen.src = "../../backend/uploads/" + element.product.image;

        let nuevoDivDos = document.createElement("div");
        nuevoDivDos.classList.add("product-info");
        let nuevoTitulo = document.createElement("h3");
        nuevoTitulo.textContent = element.product.title;
        let nuevaCantidad = document.createElement("p");
        nuevaCantidad.textContent = element.product.count;
        let nuevoValor = document.createElement("p");
        nuevoValor.textContent = element.product.value;

        nuevoDivDos.appendChild(nuevoTitulo);
        nuevoDivDos.appendChild(nuevaCantidad);
        nuevoDivDos.appendChild(nuevoValor);

        let nuevoDivTres = document.createElement("div");
        nuevoDivTres.classList.add("icons");
        let nuevoBtnActualizar = document.createElement("a");
        nuevoBtnActualizar.href = "updateProduct.html";
        nuevoBtnActualizar.addEventListener("click", function () {
          let productoID = element.id;
          localStorage.setItem("productoID", productoID);
        });

        let imgActualizar = document.createElement("img");
        imgActualizar.src = "../images/pencil.png";
        nuevoBtnActualizar.appendChild(imgActualizar);

        let nuevBtnBorrar = document.createElement("button");
        nuevBtnBorrar.textContent = "Eliminar";
        nuevBtnBorrar.src = "../images/trash.png";

        nuevBtnBorrar.addEventListener("click", function () {
          let productoID = element.id;
          let setUrl = "http://localhost:3000/polimarket/delete/" + productoID;

          // Mostrar una ventana de confirmación al usuario
          if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
            // El usuario hizo clic en "Aceptar"
            axios
              .delete(setUrl, {
                headers: {
                  "Content-Type": "application/json",
                },
              })
              .then((response) => {
                console.log("Respuesta del servidor", response.data);
                // Mostrar una alerta de éxito
                alert("Producto borrado exitosamente");
                // Recargar la página
                location.reload();
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            // El usuario hizo clic en "Cancelar" o cerró la ventana de confirmación
            console.log("Eliminación cancelada por el usuario.");
          }
        });

        nuevoDivTres.appendChild(nuevoBtnActualizar);
        nuevoDivTres.appendChild(nuevBtnBorrar);

        nuevoDivPrincipal.appendChild(nuevaImagen);
        nuevoDivPrincipal.appendChild(nuevoDivDos);
        nuevoDivPrincipal.appendChild(nuevoDivTres);

        panel.appendChild(nuevoDivPrincipal);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

//Constantes
const btnLog = document.getElementById("btnLogNav");
const btnRegister = document.getElementById("btnRegisterNav");
//logout
const btnlogout = document.getElementById("btnlogout");
//usuario
const lblUser = document.getElementById("usuario");

btnlogout.addEventListener("click", function () {
  console.log("Se hizo clic en el botón de Logout");
  // window.location.href = "../views/login.html";
  // Borrar el usuario del localStorage
  localStorage.removeItem("usuario");
  window.location.reload();
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
    lblUser.style.display = "block";

    var correo = objetoRecuperado.email;
    var correoPartes = correo.split("@");
    lblUser.textContent = correoPartes[0];
  } else {
    console.log("Usuario aún no logeado");
    btnRegister.style.display = "block";
    btnLog.style.display = "block";
    btnlogout.style.display = "none";

    lblUser.style.display = "none";
  }
}

// Verificar la autenticación al cargar botones solo disponibles cuando un usuario este logeado
verificarAutenticacionBtn();
readProducts();
