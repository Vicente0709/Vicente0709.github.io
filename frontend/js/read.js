// create.js
document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:3000/polimarket/read') // Cambia la URL según tu ruta de la API
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const productCards = document.querySelectorAll('.product-card');
            data.forEach((item, index) => {
                const product = item.product;
                const card = productCards[index];
                if (card) {
                    // Actualiza la información de la tarjeta de producto
                    const imageElement = card.querySelector('img');
                    const titleElement = card.querySelector('.product-info h3');
                    const quantityElement = card.querySelector('.product-info p:nth-child(2)');
                    const priceElement = card.querySelector('.product-info p:nth-child(3)');

                    // Actualiza la información con los datos del producto
                    imageElement.src = `../../backend/uploads/${product.image}`;
                    titleElement.textContent = product.title;
                    quantityElement.textContent = `Cantidad: ${product.count}`;
                    priceElement.textContent = `Precio: $${product.value}`;
                }
            });
        })
        .catch(error => {
            console.log(error);
        });
});
