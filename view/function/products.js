// Función auxiliar para cargar imagen como base64
async function loadImageAsBase64(url) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error('Error loading image:', error);
        return null;
    }
}

// Validación y envío del formulario de producto
function validar_form(tipo) {
    // Obtener todos los campos
    let codigo = document.getElementById("codigo").value;
    let nombre = document.getElementById("nombre").value;
    let detalle = document.getElementById("detalle").value;
    let precio = document.getElementById("precio").value;
    let stock = document.getElementById("stock").value;
    let id_categoria = document.getElementById("id_categoria").value;
    let fecha_vencimiento = document.getElementById("fecha_vencimiento").value;
    let id_proveedor = document.getElementById("id_proveedor").value;

    if (
        codigo == "" || nombre == "" || detalle == "" || precio == "" ||
        stock == "" || id_categoria == "" || fecha_vencimiento == "" || id_proveedor == ""
    ) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: 'Por favor, complete todos los campos requeridos',
            confirmButtonText: 'Entendido'
        });
        return;
    }

    if (tipo === "nuevo") registrarProducto();
    if (tipo === "actualizar") actualizarProducto();
}

// Evento submit para registrar producto
if (document.querySelector('#frm_products')) {
    let frm_product = document.querySelector('#frm_products');
    frm_product.onsubmit = function (e) {
        e.preventDefault();
        validar_form("nuevo");
    }
}

// Función para registrar producto
async function registrarProducto() {
    try {
        const frm_products = document.querySelector('#frm_products');
        const datos = new FormData(frm_products);

        let respuesta = await fetch(base_url + 'control/ProductsControl.php?tipo=registrar', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: datos
        });

        let json = await respuesta.json();

        if (json.status) {
            alert(json.msg);
            document.getElementById('frm_products').reset();
        } else {
            alert(json.msg);
        }
    } catch (e) {
        console.log("Error al registrar Producto: " + e);
    }
}

// Mostrar productos
async function view_product() {
    try {
        let respuesta = await fetch(base_url + 'control/productsControl.php?tipo=ver_productos', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache'
        });

        if (!respuesta.ok) throw new Error("Respuesta no válida del servidor");
        let json = await respuesta.json();

        if (json.status && json.data && json.data.length > 0) {
            let html = '';
            // Cargar imágenes en paralelo
            const imagePromises = json.data.map(async (product, index) => {
                let imagenHtml = '';
                if (product.imagen) {
                    const base64 = await loadImageAsBase64(base_url + product.imagen);
                    if (base64) {
                        imagenHtml = 'Imagen del producto';
                    }
                }
                return `
                <tr>
                    <td>${index + 1}</td>
                    <td>${product.codigo || ''}</td>
                    <td>${product.nombre || ''}</td>
                    <td>${product.detalle || ''}</td>
                    <td>${product.precio || ''}</td>
                    <td>${product.stock || ''}</td>
                    <td>${product.categoria || 'Sin categoría'}</td>
                    <td>${product.fecha_vencimiento || ''}</td>
                    <td><svg id="barcode${product.id}"></svg></td>
                    <td>${product.id_proveedor || ''}</td>
                    <td style="text-align:center;">
                        <button onclick="window.location.href='${base_url}edit-product/${product.id}'" class="btn btn-primary btn-sm">Editar</button>
                        <button onclick="btn_eliminar(${product.id});" class="btn btn-danger btn-sm">Eliminar</button>
                    </td>
                </tr>`;

            });
            const rows = await Promise.all(imagePromises);
            html = rows.join('');
            document.getElementById('content_products').innerHTML = html;
        } else {
            document.getElementById('content_products').innerHTML = '<tr><td colspan="11">No hay productos disponibles</td></tr>';
        }
        // grafico de barras
        json.data.forEach(product => {
            JsBarcode("#barcode" + product.id, "" + product.codigo, {
                with: 2,
                height: 40,
                lineColor: "rgba(96, 158, 164, 1)",
            });


        });

    } catch (error) {
        console.error("Error al obtener productos:", error);
        document.getElementById('content_products').innerHTML = '<tr><td colspan="11">Error al cargar los productos</td></tr>';
    }
}

// Cargar productos al inicio
if (document.getElementById('content_products')) view_product();

// Editar producto
async function edit_product() {
    try {
        // Obtener el ID del campo oculto (viene de PHP)
        let id_producto = document.getElementById('id_producto').value;

        if (!id_producto) {
            console.log('No se encontró ID del producto en el campo oculto');
            return;
        }

        console.log('ID del producto a editar:', id_producto);

        const datos = new FormData();
        datos.append('id_producto', id_producto);

        let respuesta = await fetch(base_url + 'control/ProductsControl.php?tipo=ver', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: datos
        });

        let json = await respuesta.json();
        console.log('Respuesta del servidor:', json);

        if (!json.status) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: json.msg
            });
            return;
        }

        // Llenar campos con la información del producto
        setTimeout(() => {
            document.getElementById('codigo').value = json.data.codigo || '';
            document.getElementById('nombre').value = json.data.nombre || '';
            document.getElementById('detalle').value = json.data.detalle || '';
            document.getElementById('precio').value = json.data.precio || '';
            document.getElementById('stock').value = json.data.stock || '';
            document.getElementById('id_categoria').value = json.data.id_categoria || '';
            document.getElementById('fecha_vencimiento').value = json.data.fecha_vencimiento || '';
            document.getElementById('id_proveedor').value = json.data.id_proveedor || '';
            document.getElementById('estado').value = json.data.estado || '';

            // Mostrar imagen actual si existe
            const previewDiv = document.getElementById('current_image_preview');
            if (previewDiv) {
                if (json.data.imagen) {
                    loadImageAsBase64(base_url + json.data.imagen).then(base64 => {
                        previewDiv.innerHTML = base64
                            ? 'Imagen del producto'
                            : '<small>No hay imagen actual</small>';
                    });
                } else {
                    previewDiv.innerHTML = '<small>No hay imagen actual</small>';
                }
            }

            console.log('Campos llenados correctamente');
        }, 100);

    } catch (error) {
        console.log('Error al editar producto:', error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ocurrió un error al cargar los datos del producto"
        });
    }
}

// Evento submit para editar producto
if (document.querySelector('#frm_edit_product')) {
    let frm_edit_product = document.querySelector('#frm_edit_product');
    frm_edit_product.onsubmit = function (e) {
        e.preventDefault();
        validar_form("actualizar");
    }
}

// Actualizar producto
async function actualizarProducto() {
    const frm_edit_product = document.querySelector('#frm_edit_product');
    const datos = new FormData(frm_edit_product);

    let respuesta = await fetch(base_url + 'control/ProductsControl.php?tipo=actualizar', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        body: datos
    });

    let json = await respuesta.json();

    if (!json.status) {
        alert("Ocurrió un error al actualizar, inténtelo nuevamente");
        console.log(json.msg);
    } else {
        alert(json.msg);
        window.location.href = base_url + 'product';
    }
}

// Eliminar producto
async function btn_eliminar(id) {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
        eliminarProducto(id);
    }
}

async function eliminarProducto(id) {
    try {
        const datos = new FormData();
        datos.append('id_producto', id);

        let respuesta = await fetch(base_url + 'control/ProductsControl.php?tipo=eliminar', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: datos
        });

        let json = await respuesta.json();

        if (json.status) {
            alert(json.msg);
            view_product();
        } else {
            alert(json.msg);
        }
    } catch (error) {
        console.log("Error al eliminar producto: " + error);
    }
}

// Cargar categorías
async function cargar_categorias() {
    try {
        let respuesta = await fetch(base_url + 'control/CategoriaControl.php?tipo=ver_categorias', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
        });

        let json = await respuesta.json();
        let contenido = '<option value="">Seleccione</option>';

        if (json.status && json.data) {
            json.data.forEach(categoria => {
                contenido += `<option value="${categoria.id}">${categoria.nombre}</option>`;
            });
        }
        document.getElementById("id_categoria").innerHTML = contenido;
    } catch (error) {
        console.log('Error cargando categorías:', error);
    }
}

// Cargar proveedores
async function cargar_proveedor() {
    try {
        let respuesta = await fetch(base_url + 'control/UsuarioController.php?tipo=listar_proveedores', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
        });

        let json = await respuesta.json();
        let contenido = '<option value="">Seleccione</option>';

        if (json.status && json.data) {
            json.data.forEach(proveedor => {
                contenido += `<option value="${proveedor.id}">${proveedor.razon_social}</option>`;
            });
        }
        document.getElementById("id_proveedor").innerHTML = contenido;
    } catch (error) {
        console.log('Error cargando proveedores:', error);
    }
}


// vista Compatible con tu product.js actual

let allProducts = [];
let carrito = [];

// Al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    cargarProductosParaVenta();
    cargarCarritoDesdeStorage();
    agregarBuscador();
});

// 1. CARGAR PRODUCTOS DESDE TU BD
async function cargarProductosParaVenta() {
    try {
        const respuesta = await fetch(base_url + 'control/productsControl.php?tipo=ver_productos', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache'
        });

        if (!respuesta.ok) throw new Error("Error del servidor");

        const json = await respuesta.json();

        if (json.status && json.data) {
            allProducts = json.data;
            mostrarProductosEnVenta(allProducts);
        } else {
            document.getElementById('productos_venta').innerHTML = `
                <div class="col-12 text-center py-5 text-muted">
                    <i class="fas fa-box-open fa-4x mb-3"></i>
                    <p>No hay productos disponibles</p>
                </div>`;
        }
    } catch (err) {
        console.error(err);
        document.getElementById('productos_venta').innerHTML = `
            <div class="alert alert-danger">Error al cargar productos</div>`;
    }
}

// 2. MOSTRAR PRODUCTOS EN TARJETAS (para venta)
function mostrarProductosEnVenta(productos) {
    const contenedor = document.getElementById('productos_venta');
    contenedor.innerHTML = productos.map(p => {
        const img = p.imagen ? base_url + p.imagen : 'https://via.placeholder.com/300x200/eee/999?text=Sin+Imagen';
        const disabled = p.stock <= 0 ? 'disabled' : '';

        return `
        <div class="col-6 col-md-4 col-lg-3 mb-3">
            <div class="card h-100 shadow-sm">
                <img src="${img}" class="card-img-top" alt="${p.nombre}" style="height:140px; object-fit:cover;">
                <div class="card-body d-flex flex-column">
                    <h6 class="card-title text-truncate mb-1">${p.nombre}</h6>
                    <p class="text-muted small mb-1">${p.categoria || 'Sin categoría'}</p>
                    <p class="fw-bold text-success mb-1">S/ ${parseFloat(p.precio).toFixed(2)}</p>
                    <small class="text-${p.stock > 0 ? 'success' : 'danger'}">Stock: ${p.stock}</small>
                    <button onclick="agregarAlCarritoVenta(${p.id})" 
                            class="btn btn-success btn-sm mt-2" ${disabled}>
                        <i class="fas fa-cart-plus"></i> Agregar
                    </button>
                </div>
            </div>
        </div>`;
    }).join('');
}

// 3. AGREGAR AL CARRITO DE VENTA
function agregarAlCarritoVenta(id) {
    const producto = allProducts.find(p => p.id == id);
    if (!producto || producto.stock <= 0) {
        Swal.fire('Sin stock', 'Este producto no tiene unidades disponibles', 'warning');
        return;
    }

    const existe = carrito.find(item => item.id == id);
    if (existe) {
        if (existe.cantidad >= producto.stock) {
            Swal.fire('Límite', 'No hay más unidades en stock', 'info');
            return;
        }
        existe.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarListaCompra();
    guardarCarrito();
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: '¡Agregado!',
        text: `${producto.nombre} ×1`,
        showConfirmButton: false,
        timer: 1000,
        toast: true
    });
}

// 4. ACTUALIZAR TABLA DE COMPRA
function actualizarListaCompra() {
    const tbody = document.getElementById('lista_compra');
    const subtotalEl = document.querySelector('.text-end h4:nth-child(1) label');
    const igvEl = document.querySelector('.text-end h4:nth-child(2) label');
    const totalEl = document.querySelector('.text-end h4:nth-child(3) label');

    if (carrito.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-5">Carrito vacío</td></tr>`;
        subtotalEl.textContent = 'S/ 0.00';
        igvEl.textContent = 'S/ 0.00';
        totalEl.textContent = 'S/ 0.00';
        return;
    }

    let subtotal = 0;
    tbody.innerHTML = carrito.map((item, i) => {
        const totalLinea = item.precio * item.cantidad;
        subtotal += totalLinea;

        return `
        <tr>
            <td class="text-truncate" style="max-width: 120px;">${item.nombre}</td>
            <td>
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-secondary" onclick="cambiarCantidad(${i}, -1)">−</button>
                    <span class="btn btn-light">${item.cantidad}</span>
                    <button class="btn btn-outline-secondary" onclick="cambiarCantidad(${i}, 1)">+</button>
                </div>
            </td>
            <td>S/ ${parseFloat(item.precio).toFixed(2)}</td>
            <td class="text-success fw-bold">S/ ${totalLinea.toFixed(2)}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="eliminarItem(${i})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>`;
    }).join('');

    const igv = subtotal * 0.18;
    const total = subtotal + igv;

    subtotalEl.textContent = `S/ ${subtotal.toFixed(2)}`;
    igvEl.textContent = `S/ ${igv.toFixed(2)}`;
    totalEl.textContent = `S/ ${total.toFixed(2)}`;
}

// 5. CAMBIAR CANTIDAD
function cambiarCantidad(index, cambio) {
    const item = carrito[index];
    const stockMax = allProducts.find(p => p.id == item.id)?.stock || 0;
    const nueva = item.cantidad + cambio;

    if (nueva > stockMax) {
        Swal.fire('Stock insuficiente', `Solo hay ${stockMax} disponibles`, 'warning');
        return;
    }
    if (nueva <= 0) {
        eliminarItem(index);
    } else {
        item.cantidad = nueva;
        actualizarListaCompra();
        guardarCarrito();
    }
}

// 6. ELIMINAR ITEM
function eliminarItem(index) {
    carrito.splice(index, 1);
    actualizarListaCompra();
    guardarCarrito();
}

// 7. LOCALSTORAGE (no se pierde al recargar)
function guardarCarrito() {
    localStorage.setItem('carrito_venta_tmp', JSON.stringify(carrito));
}

function cargarCarritoDesdeStorage() {
    const saved = localStorage.getItem('carrito_venta_tmp');
    if (saved) {
        carrito = JSON.parse(saved);
        actualizarListaCompra();
    }
}

// 8. REALIZAR VENTA
function realizarVenta() {
    if (carrito.length === 0) {
        Swal.fire('Carrito vacío', 'Agrega productos para continuar', 'warning');
        return;
    }

    // Guardar carrito para procesar en PHP
    localStorage.setItem('carrito_para_vender', JSON.stringify(carrito));
    localStorage.removeItem('carrito_venta_tmp'); // limpiar temporal

    // Redirigir al controlador de venta
    window.location.href = base_url + 'venta/registrar';
}

// 9. BUSCADOR EN TIEMPO REAL
function agregarBuscador() {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'form-control mb-3';
    input.placeholder = 'Buscar producto...';
    input.id = 'buscar_producto_venta';

    document.querySelector('#productos_venta').before(input);

    input.addEventListener('input', function () {
        const texto = this.value.toLowerCase();
        const filtrados = allProducts.filter(p =>
            p.nombre.toLowerCase().includes(texto) ||
            p.categoria.toLowerCase().includes(texto) ||
            (p.detalle && p.detalle.toLowerCase().includes(texto))
        );
        mostrarProductosEnVenta(filtrados);
    });
}

// Exponer función global para el botón
window.realizarVenta = realizarVenta;




