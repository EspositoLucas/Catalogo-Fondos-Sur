document.addEventListener('DOMContentLoaded', () => {
    const products = document.querySelectorAll('.product-card');
    let currentIndex = 0;
  
    // Crear el modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <button class="close-button">&times;</button>
      <div class="modal-content" >
        <img class="modal-image" src="" alt="">
        <div class="modal-info">
          <h3></h3>
          <p></p>
        </div>
        <div class="modal-nav">
          <button class="nav-button prev">Anterior</button>
          <button class="nav-button next">Siguiente</button>
        </div>
      </div>
    `;

    // Crear la vista de zoom
    const zoomView = document.createElement('div');
    zoomView.className = 'zoom-view';
    zoomView.innerHTML = `
      <button class="close-button">&times;</button>
      <img class="zoom-image" src="" alt="">
    `;
    
    // Agregar ambos elementos al body
    document.body.appendChild(modal);
    document.body.appendChild(zoomView);

  // Funciones para navegar entre productos

function showProduct(index) {
    const product = products[index];
    const img = product.querySelector('img');
    const title = product.querySelector('h3');
    const materialInfo = product.querySelector('h4');
    
    // Si el producto tiene una columna de precios (price-column)
    const priceColumn = product.querySelector('.price-column');
    
    modal.querySelector('.modal-image').src = img.src;
    modal.querySelector('.modal-info h3').textContent = title.textContent;
    
    // Actualizar el contenido del modal según el tipo de producto
    if (priceColumn) {
        // Para productos con múltiples precios
        modal.querySelector('.modal-info p').innerHTML = priceColumn.innerHTML;
    } else {
        // Para productos con un solo precio y material
        const price = product.querySelector('p');
        modal.querySelector('.modal-info p').innerHTML = `
            ${materialInfo ? materialInfo.innerHTML : ' '}
            ${price ? price.textContent : ' '}
        `;
    }
}

  // Event listeners
products.forEach((product, index) => {
    product.addEventListener('click', () => {
    currentIndex = index;
    showProduct(currentIndex);
    modal.style.display = 'block';
    });
});

modal.querySelector('.prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + products.length) % products.length;
    showProduct(currentIndex);
});

modal.querySelector('.next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % products.length;
    showProduct(currentIndex);
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
    modal.style.display = 'none';
    }
});

  // Event listeners
modal.querySelector('.close-button').addEventListener('click', () => {
    modal.style.display = 'none';
});
// Centrar la imagen al abrir la vista ampliada
modal.querySelector('.modal-image').addEventListener('click', () => {
    zoomView.querySelector('.zoom-image').src = modal.querySelector('.modal-image').src;
    zoomView.style.display = 'block';
});

// Restablecer la posición al cerrar la vista ampliada
zoomView.querySelector('.close-button').addEventListener('click', () => {
    zoomView.style.display = 'none';
    zoomImage.classList.remove('zoomed');
    zoomImage.style.top = '50%'; // Restablecer al centro
    zoomImage.style.left = '50%'; // Restablecer al centro
});

const zoomImage = zoomView.querySelector('.zoom-image');
zoomImage.addEventListener('click', (e) => {
    e.preventDefault();
    if (zoomImage.classList.contains('zoomed')) {
        zoomImage.classList.remove('zoomed');
        // Centrar la imagen al quitar el zoom
        zoomImage.style.transform = 'translate(-50%, -50%)';
    } else {
        zoomImage.classList.add('zoomed');
        // Mantener la imagen centrada al hacer zoom
        zoomImage.style.transform = 'translate(-50%, -50%) scale(1.5)';
    }
});

// zoomView.querySelector('.zoom-image').addEventListener('click', () => {
//     zoomView.style.display = 'none';
// });

// // Agregar funcionalidad de scroll
// zoomView.addEventListener('mousemove', (e) => {
//     if (e.target.classList.contains('zoom-image')) {
//         e.target.style.cursor = 'move';
//     }
// });


// Modificar el scroll para mantener la imagen centrada
zoomView.addEventListener('wheel', (e) => {
    if (zoomImage.classList.contains('zoomed')) {
        e.preventDefault();
        const currentTransform = zoomImage.style.transform;
        const currentScale = currentTransform.match(/scale\((.*?)\)/)?.[1] || 1.5;
        
        // Ajustar el zoom según la dirección del scroll
        const newScale = e.deltaY > 0 ? 
            Math.max(1.5, currentScale - 0.1) : // Reducir zoom
            Math.min(3, Number(currentScale) + 0.1);  // Aumentar zoom
        
        zoomImage.style.transform = `translate(-50%, -50%) scale(${newScale})`;
    }
});

}); 