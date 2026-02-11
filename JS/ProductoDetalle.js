let productos = [];

fetch('../Json/Productos.Json')
    .then(response => response.json())
    .then(data => {
        productos = data;
    })
    .catch(error => console.error('Error cargando el JSON:', error));

function mostrarProducto(id) {
    window.open(`producto.html?id=${id}`, '_self');  
}

const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(urlParams.get('id'));
console.log('ID obtenido:', id);

if (id) {
    fetch('../Json/Productos.Json')
        .then(response => response.json())
        .then(data => {
            const producto = data.find(p => p.id === id);
            console.log('Producto encontrado:', producto);
            if (producto) {
                document.getElementById('titulo-producto').textContent = producto.nombre;
                document.getElementById('imagen-producto').src = '../' + producto.imagen;  
                document.getElementById('nombre-producto').textContent = producto.nombre;
                document.getElementById('precio-producto').textContent = producto.precio;
                document.getElementById('descripcion-producto').textContent = producto.descripcion;
            }
        })
        .catch(error => console.error('Error cargando el JSON:', error));
}