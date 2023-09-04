var botonActualizar = document.getElementById("agregar");
let productId = localStorage.getItem("productoID");
// let productId = 'KfUucAAd3loOQ3m6xRzB'
//usuario
const lblUser = document.getElementById("usuario");

// Agrega un event listener para el evento "click"
botonActualizar.addEventListener("click", updateProduct);

console.log("Este el id del producto recien traido del product :" + productId);

let setUrl = "http://localhost:3000/polimarket/read/" + productId;
let setUrlUpdate = "http://localhost:3000/polimarket/update/" + productId;

console.log(setUrl);
function readProduct() {
  axios
    .get(setUrl, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      let product = response.data[0].product;
      console.log(product);
      var inputElement1 = document.getElementById("titulo");
      inputElement1.value = product.title;

      var inputElement2 = document.getElementById("estado");
      inputElement2.value = product.state;

      var inputElement3 = document.getElementById("descripcion");
      inputElement3.value = product.description;

      var inputElement4 = document.getElementById("cantidad");
      inputElement4.value = product.count;

      var inputElement5 = document.getElementById("precio");
      inputElement5.value = product.value;

      var backgroundImageUrl = product.image;
      var dropzoneDiv = document.getElementById("dropzone");
      dropzoneDiv.style.backgroundImage = `url(../../backend/uploads/${backgroundImageUrl})`;
    })
    .catch((error) => {
      console.log(error);
    });
}

// Define la función updateProduct
function updateProduct(event) {
  event.preventDefault();
  // Aquí puedes realizar acciones cuando se haga clic en el botón
  console.log("Se hizo clic en el botón Actualizar");
  // Puedes agregar más código para manejar el evento aquí

  var inputElement1 = document.getElementById("titulo").value;
  var inputElement2 = document.getElementById("estado").value;
  var inputElement3 = document.getElementById("descripcion").value;
  var inputElement4 = document.getElementById("cantidad").value.toString();
  var inputElement5 = document.getElementById("precio").value.toString();

  console.log(inputElement1);
  console.log(inputElement2);
  console.log(inputElement3);
  console.log(inputElement4);
  console.log(inputElement5);

  const data = {
    product: {
      title: inputElement1,
      state: inputElement2,
      description: inputElement3,
      count: inputElement4,
      value: inputElement5,
    },
  };
  // formData.append("image", document.getElementById("imagen").files[0]);

  axios
    .put(setUrlUpdate, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log("Respuesta del servidor", response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

readProduct();

//Constantes sesion btn
const btnLog = document.getElementById("btnLogNav");
const btnRegister = document.getElementById("btnRegisterNav");
//logout
const btnlogout = document.getElementById("btnlogout");

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
    lblUser.style.display= "block"

    var correo = objetoRecuperado.email;
    var correoPartes = correo.split('@');
    lblUser.textContent = correoPartes[0];

  } else {
    console.log("Usuario aún no logeado");
    btnRegister.style.display = "block";
    btnLog.style.display = "block";
    btnlogout.style.display = "none";
    
    lblUser.style.display= "none"
  }
}

// Verificar la autenticación al cargar botones solo disponibles cuando un usuario este logeado
verificarAutenticacionBtn();
