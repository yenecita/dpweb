// Validación y envío del formulario de usuario
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
            icon: "error", // corregido
            title: "Error",
            text: 'Por favor, complete todos los campos requeridos',
            confirmButtonText: 'Entendido'
        });
        return;
    }

    if (tipo === "nuevo") {
        registrarProducto();
    }
    if (tipo === "actualizar") {
        actualizarProducto();
    }
}

// Evento submit para frm_products
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

        let respuesta = await fetch(base_url + 'control/productsControl.php?tipo=registrar', {
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
        console.log("Error al registrar Producto:" + e);
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

        if (!respuesta.ok) {
            throw new Error("Respuesta no válida del servidor");
        }

        let json = await respuesta.json();

        if (json && json.status && json.data && json.data.length > 0) {
            let html = '';
            json.data.forEach((product, index) => {
                html += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${product.codigo || ''}</td>
                    <td>${product.nombre || ''}</td>
                    <td>${product.detalle || ''}</td>
                    <td>${product.precio || ''}</td>
                    <td>${product.stock || ''}</td>
                    <td>
                      <a href="${base_url}edit-product/${product.id}">Editar</a>
                      <button class="btn btn-danger" onclick="btn_eliminar(${product.id});">Eliminar</button>
                    </td>
                </tr>`;
            });
            document.getElementById('content_products').innerHTML = html;
        } else {
            document.getElementById('content_products').innerHTML = '<tr><td colspan="7">No hay productos disponibles</td></tr>';
        }
    } catch (error) {
        console.error("Error al obtener productos:", error);
        document.getElementById('content_products').innerHTML = '<tr><td colspan="7">Error al cargar los productos</td></tr>';
    }
}

// Editar producto
async function edit_product() {
    try {
        // Obtener el ID del producto desde la URL
        let url = window.location.href;
        let parts = url.split('/');
        let id_producto = parts[parts.length - 1];
        document.getElementById('id_producto').value = id_producto;
        const datos = new FormData();
        datos.append('id_producto', id_producto);

        let respuesta = await fetch(base_url + 'control/productsControl.php?tipo=ver', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: datos
        });

        let json = await respuesta.json();

        if (!json.status) {
            alert(json.msg);
            return;
        }

        document.getElementById('codigo').value = json.data.codigo;
        document.getElementById('nombre').value = json.data.nombre;
        document.getElementById('detalle').value = json.data.detalle;
        document.getElementById('precio').value = json.data.precio;
        document.getElementById('stock').value = json.data.stock;
        document.getElementById('id_categoria').value = json.data.id_categoria;
        document.getElementById('fecha_vencimiento').value = json.data.fecha_vencimiento;
        document.getElementById('imagen').value = json.data.imagen;
        document.getElementById('id_proveedor').value = json.data.id_proveedor;

    } catch (error) {
        console.log('oops, ocurrió un error: ' + error);
    }
}

if (document.querySelector('#frm_edit_product')) {
    let frm_edit_product = document.querySelector('#frm_edit_product');
    frm_edit_product.onsubmit = function (e) {
        e.preventDefault();
        validar_form("actualizar");
    }
}

// Actualizar producto
async function actualizarProducto() {
    const frm_edit_products = document.querySelector('#frm_edit_products');
    const datos = new FormData(frm_edit_products);

    let respuesta = await fetch(base_url + 'control/productsControl.php?tipo=actualizar', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        body: datos
    });

    let json = await respuesta.json();

    if (!json.status) {
        alert("Oooops, ocurrió un error al actualizar, intentelo nuevamente");
        console.log(json.msg);
    } else {
        alert(json.msg);
    }
}

// Eliminar producto
async function btn_eliminar(id) {
    if (confirm("Estás seguro de eliminar este producto")) {
        eliminarProducto(id);
    }
}

async function eliminarProducto(id) {
    try {
        const datos = new FormData();
        datos.append('id_producto', id);

        let respuesta = await fetch(base_url + 'control/productsControl.php?tipo=eliminar', {
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

// Cargar productos al inicio
if (document.getElementById('content_products')) {
    view_product();
}

// Cargar categorías
async function cargar_categorias() {
    let respuesta = await fetch(base_url + 'control/CategoriaControl.php?tipo=ver_categorias', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
    });

    let json = await respuesta.json();
    let contenido = '<option value="">Seleccione</option>';

    json.data.forEach(categoria => {
        contenido += `<option value="${categoria.id}">${categoria.nombre}</option>`;
    });
    //console.log(contenido);
    document.getElementById("id_categoria").innerHTML = contenido;
}

// Cargar proveedores
async function cargar_proveedor() {
    let respuesta = await fetch(base_url + 'control/UsuarioController.php?tipo=listar_proveedores', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
    });

    let json = await respuesta.json();
    let contenido = '<option value="">seleccione</option>';
    json.data.forEach(proveedor => {
        contenido += `<option value="${proveedor.id}">${proveedor.razon_social}</option>`;
    });
    //console.log(contenido);
    document.getElementById("id_proveedor").innerHTML = contenido;
}
