// --- ABRIR PRODUCTO DESDE LA TIENDA ---
function mostrarProducto(id) {
    window.open(`producto.html?id=${id}`, '_self');
}


// --- CARGAR PRODUCTOS DESDE LOCALSTORAGE O JSON ---
function cargarProductos() {
    let productos = JSON.parse(localStorage.getItem("productos"));

    if (!productos) {
        return fetch('../Json/Productos.Json')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem("productos", JSON.stringify(data));
                return data;
            });
    } else {
        return Promise.resolve(productos);
    }
}


// --- MOSTRAR DETALLE DEL PRODUCTO ---
const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(urlParams.get('id'));

if (id) {
    cargarProductos().then(data => {
        const producto = data.find(p => p.id === id);

        if (producto) {
            document.getElementById('titulo-producto').textContent = producto.nombre;
            document.getElementById('imagen-producto').src = '../' + producto.imagen;
            document.getElementById('nombre-producto').textContent = producto.nombre;
            document.getElementById('precio-producto').textContent = producto.precio;
            document.getElementById('descripcion-producto').textContent = producto.descripcion;
        }
    }).catch(error => console.error('Error:', error));
}