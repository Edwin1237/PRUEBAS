document.addEventListener('DOMContentLoaded', () => {
    
    // Referencias al DOM
    const selectIdentificacion = document.getElementById('identificacion');
    const selectDepartamento = document.getElementById('departamento');
    const selectCiudad = document.getElementById('ciudad');
    const payBtn = document.getElementById('payBtn');
    
    let loadedData = {};

    // --- CARGA DE DATOS (Ruta ajustada a carpeta Json) ---
    fetch('../Json/data.json')
        .then(response => {
            if (!response.ok) throw new Error("Error JSON");
            return response.json();
        })
        .then(data => {
            loadedData = data; 
            inicializarFormulario();
        })
        .catch(error => {
            console.error('Error:', error);
            // Mensaje de ayuda si falla por no usar Live Server
            console.warn("AVISO: Para que carguen los departamentos, debes abrir este archivo con 'Live Server' en VS Code.");
            selectIdentificacion.innerHTML = '<option>Error de carga</option>';
            selectDepartamento.innerHTML = '<option>Error de carga</option>';
        });

    // Inicializar Selects
    function inicializarFormulario() {
        // Documentos
        selectIdentificacion.innerHTML = '<option value="">Seleccionar...</option>';
        loadedData.documentTypes.forEach(type => {
            let option = document.createElement('option');
            option.value = type.val;
            option.textContent = type.label;
            selectIdentificacion.appendChild(option);
        });

        // Departamentos
        selectDepartamento.innerHTML = '<option value="">Seleccione Departamento...</option>';
        Object.keys(loadedData.locations).forEach(dep => {
            let option = document.createElement('option');
            option.value = dep;
            option.textContent = dep;
            selectDepartamento.appendChild(option);
        });
    }

    // Evento Cambio Departamento
    selectDepartamento.addEventListener('change', function() {
        const departamentoSeleccionado = this.value;
        selectCiudad.innerHTML = '<option value="">Seleccione Ciudad...</option>';

        if (departamentoSeleccionado && loadedData.locations[departamentoSeleccionado]) {
            selectCiudad.disabled = false;
            const ciudades = loadedData.locations[departamentoSeleccionado];
            
            ciudades.forEach(ciudad => {
                let option = document.createElement('option');
                option.value = ciudad;
                option.textContent = ciudad;
                selectCiudad.appendChild(option);
            });
        } else {
            selectCiudad.disabled = true;
            selectCiudad.innerHTML = '<option value="">Seleccione un departamento primero</option>';
        }
    });

    // --- CARRITO (Simulado) ---
    // En el futuro, esto vendrá de localStorage
    const productosCarrito = []; 
    cargarResumenCompra(productosCarrito);

    // Botón de Pago
    payBtn.addEventListener('click', () => {
        const inputs = document.querySelectorAll('input');
        const selects = document.querySelectorAll('select');
        let filled = true;

        inputs.forEach(i => { if(i.value.trim() === '') filled = false; });
        selects.forEach(s => { if(s.value === '') filled = false; });

        if(!filled) {
            alert("Por favor, rellene todos los campos.");
        } else {
            // Aquí rediriges a la página de pago
            window.location.href = 'CarritoDeComprasPayment.html';
        }
    });
});

function cargarResumenCompra(productos) {
    const footerSection = document.getElementById('resumenCompra');
    if (!footerSection) return;
    
    if (productos.length === 0) {
        footerSection.style.display = 'none';
        return; 
    }
    
    // Renderizado del carrito (igual que antes)
    const carouselContainer = document.getElementById('cart-items-carousel');
    const listContainer = document.getElementById('cart-list-details');
    const totalsContainer = document.getElementById('cart-totals');

    carouselContainer.innerHTML = '';
    listContainer.innerHTML = '';
    totalsContainer.innerHTML = '';

    let subTotal = 0;

    productos.forEach(prod => {
        const img = document.createElement('img');
        img.src = prod.img; 
        img.className = 'prod-thumb';
        carouselContainer.appendChild(img);

        const itemDesc = document.createElement('div');
        itemDesc.textContent = `Producto #${prod.id} ${prod.descripcion}`;
        listContainer.appendChild(itemDesc);

        subTotal += prod.precio;
    });

    const subTotalElem = document.createElement('div');
    subTotalElem.className = 'price-row';
    subTotalElem.textContent = `Sub total $${subTotal.toLocaleString('es-CO')}`;
    
    const totalElem = document.createElement('div');
    totalElem.className = 'price-row';
    totalElem.textContent = `Total De La Compra $${subTotal.toLocaleString('es-CO')}`;

    totalsContainer.appendChild(subTotalElem);
    totalsContainer.appendChild(totalElem);
}

document.addEventListener('DOMContentLoaded', () => {
    
    // Referencias
    const selectIdentificacion = document.getElementById('identificacion');
    const selectDepartamento = document.getElementById('departamento');
    const selectCiudad = document.getElementById('ciudad');
    const payBtn = document.getElementById('payBtn');
    
    let loadedData = {};

    // 1. CARGA DE DATOS (JSON)
    fetch('../Json/data.json')
        .then(response => {
            if (!response.ok) throw new Error("Error JSON");
            return response.json();
        })
        .then(data => {
            loadedData = data; 
            inicializarFormulario();
        })
        .catch(error => {
            console.warn('Aviso: Usa Live Server para cargar los departamentos correctamente.');
            selectIdentificacion.innerHTML = '<option>Error de carga</option>';
        });

    function inicializarFormulario() {
        // Documentos
        selectIdentificacion.innerHTML = '<option value="">Seleccionar...</option>';
        loadedData.documentTypes.forEach(type => {
            let option = document.createElement('option');
            option.value = type.val;
            option.textContent = type.label;
            selectIdentificacion.appendChild(option);
        });

        // Departamentos
        selectDepartamento.innerHTML = '<option value="">Seleccione Departamento...</option>';
        Object.keys(loadedData.locations).forEach(dep => {
            let option = document.createElement('option');
            option.value = dep;
            option.textContent = dep;
            selectDepartamento.appendChild(option);
        });
    }

    // 2. CAMBIO DE DEPARTAMENTO
    selectDepartamento.addEventListener('change', function() {
        const dep = this.value;
        selectCiudad.innerHTML = '<option value="">Seleccione Ciudad...</option>';

        if (dep && loadedData.locations[dep]) {
            selectCiudad.disabled = false;
            loadedData.locations[dep].forEach(ciudad => {
                let option = document.createElement('option');
                option.value = ciudad;
                option.textContent = ciudad;
                selectCiudad.appendChild(option);
            });
        } else {
            selectCiudad.disabled = true;
            selectCiudad.innerHTML = '<option value="">Seleccione un departamento primero</option>';
        }
    });

    // 3. CARRITO SIMULADO (Ejemplo)
    const productosCarrito = [
        // Puedes poner datos ficticios aquí para ver cómo se ve
        // { id: 1, nombre: "Camisa", descripcion: "Lino Beige", precio: 50000, img: "imgLectivo/iconoFS-nobg.png" }
    ]; 
    
    // NOTA: Si está vacío, el footer se oculta. Puedes descomentar arriba para probar.
    cargarResumenCompra(productosCarrito);

    // 4. LÓGICA DE PAGO Y REDIRECCIÓN
    payBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Evita recargas raras

        const inputs = document.querySelectorAll('input, select');
        let filled = true;

        // Validación simple
        inputs.forEach(input => {
            if(input.offsetParent !== null && input.value.trim() === '') {
                filled = false;
                input.style.borderColor = 'red'; // Marca en rojo el error
            } else {
                input.style.borderColor = '#ccc';
            }
        });

        if(!filled) {
            alert("Por favor, completa todos los campos obligatorios.");
        } else {
            // AQUÍ OCURRE LA MAGIA
            // 1. Podrías guardar datos en LocalStorage si quisieras
            // 2. Redirigimos
            window.location.href = 'CompraExitosa.html';
        }
    });
});

function cargarResumenCompra(productos) {
    const footerSection = document.getElementById('resumenCompra');
    if (!footerSection) return;
    
    if (productos.length === 0) {
        // Para que NO se oculte durante tus pruebas y veas el diseño,
        // puedes comentar la siguiente línea:
        // footerSection.style.display = 'none'; 
        // return;
    }
    
    // Si tienes productos, muéstralo
    footerSection.style.display = 'flex';

    // ... (El resto del código de renderizado del carrito es igual) ...
}
