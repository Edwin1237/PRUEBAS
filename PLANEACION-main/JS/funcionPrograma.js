// ========== VARIABLES GLOBALES ==========
// Array que almacena los productos, cargados desde localStorage
let productos = JSON.parse(localStorage.getItem("productos")) || [];
let actual = null; // Índice del producto seleccionado

// ========== GESTIÓN DE DATOS ==========
// Guarda el array de productos en localStorage
function guardar(){
  localStorage.setItem("productos",JSON.stringify(productos));
}

// ========== INTERFAZ DE USUARIO ==========
// Muestra los productos en la tienda
function mostrar(){
  const tienda = document.getElementById("tienda");
  if(!tienda) return;
  tienda.innerHTML="";
  productos.forEach((p,i)=>{
    tienda.innerHTML+=`
      <div class="producto" onclick="abrirModal(${i})">
        <img src="${p.img}">
        <p>${p.nombre}</p>
      </div>
    `;
  });
}

// Abre el modal con detalles del producto
function abrirModal(i){
  actual=i;
  const p=productos[i];
  modalImg.src=p.img;
  modalNombre.textContent=p.nombre;
  modalPrecio.textContent="Precio: "+p.precio;
  modalTalla.textContent="Talla: "+p.talla;
  modalColor.textContent="Color: "+p.color;
  modalDesc.textContent=p.desc;
  modal.style.display="flex";
}

// Cierra el modal
function cerrarModal(){
  modal.style.display="none";
}

// ========== CRUD DE PRODUCTOS ==========
// Borra un producto con confirmación
function borrarProducto(){
  modal.style.display="none";
  Swal.fire({
    title:"¿Eliminar?",
    text:"No se puede deshacer",
    icon:"warning",
    showCancelButton:true,
    confirmButtonText:"Sí",
    cancelButtonText:"Cancelar"
  }).then(r=>{
    if(r.isConfirmed){
      productos.splice(actual,1);
      guardar();
      mostrar();
      Swal.fire("Eliminado","","success");
    }
  });
}

// Edita un producto
function editarProducto(){
  modal.style.display="none";
  const p=productos[actual];
  Swal.fire({
    title:"Editar",
    html:`
      <input id="eNombre" class="swal2-input" value="${p.nombre}">
      <input id="ePrecio" class="swal2-input" value="${p.precio}">
      <input id="eTalla" class="swal2-input" value="${p.talla}">
      <input id="eColor" class="swal2-input" value="${p.color}">
    `,
    confirmButtonText:"Guardar",
    preConfirm:()=>{
      p.nombre=eNombre.value;
      p.precio=ePrecio.value;
      p.talla=eTalla.value;
      p.color=eColor.value;
      guardar();
      mostrar();
    }
  });
}

// Agrega un nuevo producto
function agregarProducto(){
  const file=imagen.files[0];
  const reader=new FileReader();
  reader.onload=()=>{
    productos.push({
      nombre:nombre.value,
      precio:precio.value,
      talla:talla.value,
      color:color.value,
      desc:desc.value,
      img:reader.result
    });
    guardar();
    Swal.fire("Producto agregado","","success");
  };
  reader.readAsDataURL(file);
}

// ========== VISTA PREVIA DE IMAGEN ==========
// Muestra preview de la imagen seleccionada
function previewImage(){
  const file=imagen.files[0];
  if(file){
    const reader=new FileReader();
    reader.onload=()=>{
      previewImg.src=reader.result;
    };
    reader.readAsDataURL(file);
  }
}


// ========== INICIALIZACIÓN ==========
// Se ejecuta al cargar la página
window.onload=()=>{
  mostrar();
  if(imagen) imagen.addEventListener('change', previewImage);
};