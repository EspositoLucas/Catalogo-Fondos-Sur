// document.addEventListener('DOMContentLoaded', () => {

//     // Add filter functionality
//     const filterButtons = document.querySelectorAll('.filter-btn');
//     const products = document.querySelectorAll('.product-card');

//     filterButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             filterButtons.forEach(btn => btn.classList.remove('active'));
//             button.classList.add('active');

//             const filterValue = button.getAttribute('data-filter');

//             products.forEach(product => {
//                 const materialSpans = product.querySelectorAll('.material-type');
//                 const materialTexts = Array.from(materialSpans).map(span => span.textContent);
                
//                 // Check for presence of different materials
//                 const hasTR = materialTexts.some(text => text.includes('T.R'));
//                 const hasExpanso = materialTexts.some(text => 
//                     text.includes('EXPANSO') || 
//                     text.includes('EXPANSO MONO') || 
//                     text.includes('EXPANSO BICOLOR')
//                 );
            
//                 if (filterValue === 'all') {
//                     product.classList.remove('hidden');
//                 } else if (filterValue === 'T.R') {
//                     // Show products with T.R, including those with both
//                     product.classList.toggle('hidden', !hasTR);
//                 } else if (filterValue === 'EXPANSO') {
//                     // Show products with EXPANSO, including those with both
//                     product.classList.toggle('hidden', !hasExpanso);
//                 }
//             });
//         });
//     });
//     let currentIndex = 0;
  
//     // Crear el modal
//     const modal = document.createElement('div');
//     modal.className = 'modal';
//     modal.innerHTML = `
//       <button class="close-button">&times;</button>
//       <div class="modal-content" >
//         <img class="modal-image" src="" alt="">
//         <div class="modal-info">
//           <h3></h3>
//           <p></p>
//         </div>
//         <div class="modal-nav">
//           <button class="nav-button prev">Anterior</button>
//           <button class="nav-button next">Siguiente</button>
//         </div>
//       </div>
//     `;

//     // Crear la vista de zoom
//     const zoomView = document.createElement('div');
//     zoomView.className = 'zoom-view';
//     zoomView.innerHTML = `
//       <button class="close-button">&times;</button>
//       <img class="zoom-image" src="" alt="">
//     `;
    
//     // Agregar ambos elementos al body
//     document.body.appendChild(modal);
//     document.body.appendChild(zoomView);

//   // Funciones para navegar entre productos

// function showProduct(index) {
//     const product = products[index];
//     const img = product.querySelector('img');
//     const title = product.querySelector('h3');
//     const materialInfo = product.querySelector('h4');
    
//     // Si el producto tiene una columna de precios (price-column)
//     const priceColumn = product.querySelector('.price-column');
    
//     modal.querySelector('.modal-image').src = img.src;
//     modal.querySelector('.modal-info h3').textContent = title.textContent;
    
//     // Actualizar el contenido del modal según el tipo de producto
//     if (priceColumn) {
//         // Para productos con múltiples precios
//         modal.querySelector('.modal-info p').innerHTML = priceColumn.innerHTML;
//     } else {
//         // Para productos con un solo precio y material
//         const price = product.querySelector('p');
//         modal.querySelector('.modal-info p').innerHTML = `
//             ${materialInfo ? materialInfo.innerHTML : ' '}
//             ${price ? price.textContent : ' '}
//         `;
//     }
// }


// products.forEach((product, index) => {
//     product.addEventListener('click', () => {
//         currentIndex = index;
//         showProduct(currentIndex);
//         modal.style.display = 'block';
//         document.body.classList.add('modal-open'); // Add class when opening
//     });
// });

// modal.querySelector('.prev').addEventListener('click', () => {
//     currentIndex = (currentIndex - 1 + products.length) % products.length;
//     showProduct(currentIndex);
// });

// modal.querySelector('.next').addEventListener('click', () => {
//     currentIndex = (currentIndex + 1) % products.length;
//     showProduct(currentIndex);
// });


// modal.addEventListener('click', (e) => {
//     if (e.target === modal) {
//         modal.style.display = 'none';
//         document.body.classList.remove('modal-open'); // Remove class when closing
//     }
// });

// modal.querySelector('.close-button').addEventListener('click', () => {
//     modal.style.display = 'none';
//     document.body.classList.remove('modal-open'); // Remove class when closing
// });
// // Centrar la imagen al abrir la vista ampliada
// modal.querySelector('.modal-image').addEventListener('click', () => {
//     zoomView.querySelector('.zoom-image').src = modal.querySelector('.modal-image').src;
//     zoomView.style.display = 'block';
// });

// // Restablecer la posición al cerrar la vista ampliada
// zoomView.querySelector('.close-button').addEventListener('click', () => {
//     zoomView.style.display = 'none';
//     zoomImage.classList.remove('zoomed');
//     zoomImage.style.top = '50%'; // Restablecer al centro
//     zoomImage.style.left = '50%'; // Restablecer al centro
// });

// const zoomImage = zoomView.querySelector('.zoom-image');
// zoomImage.addEventListener('click', (e) => {
//     e.preventDefault();
//     if (zoomImage.classList.contains('zoomed')) {
//         zoomImage.classList.remove('zoomed');
//         // Centrar la imagen al quitar el zoom
//         zoomImage.style.transform = 'translate(-50%, -50%)';
//     } else {
//         zoomImage.classList.add('zoomed');
//         // Mantener la imagen centrada al hacer zoom
//         zoomImage.style.transform = 'translate(-50%, -50%) scale(1.5)';
//     }
// });

// // Modificar el scroll para mantener la imagen centrada
// zoomView.addEventListener('wheel', (e) => {
//     if (zoomImage.classList.contains('zoomed')) {
//         e.preventDefault();
//         const currentTransform = zoomImage.style.transform;
//         const currentScale = currentTransform.match(/scale\((.*?)\)/)?.[1] || 1.5;
        
//         // Ajustar el zoom según la dirección del scroll
//         const newScale = e.deltaY > 0 ? 
//             Math.max(1.5, currentScale - 0.1) : // Reducir zoom
//             Math.min(3, Number(currentScale) + 0.1);  // Aumentar zoom
        
//         zoomImage.style.transform = `translate(-50%, -50%) scale(${newScale})`;
//     }
// });

// }); 


document.addEventListener('DOMContentLoaded', () => {
    const ITEMS_PER_PAGE = 15;
    let currentPage = 1;
    
    // Add filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const products = document.querySelectorAll('.product-card');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const pageNumbersContainer = document.getElementById('pageNumbers');

    function updatePagination(filteredProducts) {
        const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
        
        // Actualizar botones de navegación
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;

        // Actualizar números de página
        pageNumbersContainer.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const pageNumber = document.createElement('button');
            pageNumber.classList.add('page-number');
            if (i === currentPage) pageNumber.classList.add('active');
            pageNumber.textContent = i;
            pageNumber.addEventListener('click', () => {
                currentPage = i;
                updateDisplay(filteredProducts);
            });
            pageNumbersContainer.appendChild(pageNumber);
        }
    }

    function updateDisplay(filteredProducts) {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;

        // Ocultar todos los productos primero
        products.forEach(product => {
            product.classList.add('hidden');
        });

        // Mostrar solo los productos de la página actual
        filteredProducts.forEach((product, index) => {
            if (index >= startIndex && index < endIndex) {
                product.classList.remove('hidden');
            }
        });

        updatePagination(filteredProducts);
    }

    function filterProducts(filterValue) {
        const filteredProducts = Array.from(products).filter(product => {
            const materialSpans = product.querySelectorAll('.material-type');
            const materialTexts = Array.from(materialSpans).map(span => span.textContent);
            
            const hasTR = materialTexts.some(text => text.includes('T.R'));
            const hasExpanso = materialTexts.some(text => 
                text.includes('EXPANSO') || 
                text.includes('EXPANSO MONO') || 
                text.includes('EXPANSO BICOLOR')
            );

            if (filterValue === 'all') return true;
            if (filterValue === 'T.R') return hasTR;
            if (filterValue === 'EXPANSO') return hasExpanso;
            return false;
        });

        return filteredProducts;
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            currentPage = 1; // Reset a la primera página al cambiar el filtro
            const filteredProducts = filterProducts(filterValue);
            updateDisplay(filteredProducts);
        });
    });

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            const activeFilter = document.querySelector('.filter-btn.active');
            const filterValue = activeFilter.getAttribute('data-filter');
            const filteredProducts = filterProducts(filterValue);
            updateDisplay(filteredProducts);
        }
    });

    nextPageBtn.addEventListener('click', () => {
        const activeFilter = document.querySelector('.filter-btn.active');
        const filterValue = activeFilter.getAttribute('data-filter');
        const filteredProducts = filterProducts(filterValue);
        const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
        
        if (currentPage < totalPages) {
            currentPage++;
            updateDisplay(filteredProducts);
        }
    });

    // Inicializar la visualización con todos los productos
    updateDisplay(Array.from(products));

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

    products.forEach((product, index) => {
        product.addEventListener('click', () => {
            currentIndex = index;
            showProduct(currentIndex);
            modal.style.display = 'block';
            document.body.classList.add('modal-open');
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
            document.body.classList.remove('modal-open');
        }
    });

    modal.querySelector('.close-button').addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    });

    modal.querySelector('.modal-image').addEventListener('click', () => {
        zoomView.querySelector('.zoom-image').src = modal.querySelector('.modal-image').src;
        zoomView.style.display = 'block';
    });

    zoomView.querySelector('.close-button').addEventListener('click', () => {
        zoomView.style.display = 'none';
        zoomImage.classList.remove('zoomed');
        zoomImage.style.top = '50%';
        zoomImage.style.left = '50%';
    });

    const zoomImage = zoomView.querySelector('.zoom-image');
    zoomImage.addEventListener('click', (e) => {
        e.preventDefault();
        if (zoomImage.classList.contains('zoomed')) {
            zoomImage.classList.remove('zoomed');
            zoomImage.style.transform = 'translate(-50%, -50%)';
        } else {
            zoomImage.classList.add('zoomed');
            zoomImage.style.transform = 'translate(-50%, -50%) scale(1.5)';
        }
    });

    zoomView.addEventListener('wheel', (e) => {
        if (zoomImage.classList.contains('zoomed')) {
            e.preventDefault();
            const currentTransform = zoomImage.style.transform;
            const currentScale = currentTransform.match(/scale\((.*?)\)/)?.[1] || 1.5;
            
            const newScale = e.deltaY > 0 ? 
                Math.max(1.5, currentScale - 0.1) :
                Math.min(3, Number(currentScale) + 0.1);
            
            zoomImage.style.transform = `translate(-50%, -50%) scale(${newScale})`;
        }
    });
}); 