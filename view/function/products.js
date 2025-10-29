 
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
            icon: "error", 
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
        console.log("Error al registrar Producto:" + e);
    }
}

// Mostrar productos
async function view_product() {
    try {
        let respuesta = await fetch(base_url + 'control/ProductsControl.php?tipo=ver_productos', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache'
        });

        if (!respuesta.ok) {
            throw new Error("Respuesta no válida del servidor");
        }

        let json = await respuesta.json();

        if (json.status && json.data && json.data.length > 0) {
            let html = '';
            json.data.forEach((product, index) => {
                let imagenHtml = '';
                if (product.imagen) {
                    imagenHtml = `<img src="${base_url}${product.imagen}" alt="Imagen del producto" style="width: 50px; height: 50px; object-fit: cover;">`;
                } else {
                    imagenHtml = 'Sin imagen';
                }
                html += `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.codigo || ''}</td>
                    <td>${product.nombre || ''}</td>
                    <td>${product.detalle || ''}</td>
                    <td>${product.precio || ''}</td>
                    <td>${product.stock || ''}</td>
                    <td>${product.categoria || 'Sin categoría'}</td>
                    <td>${product.fecha_vencimiento || ''}</td>
                    <td>${product.id_proveedor || ''}</td>
                    <td>${imagenHtml}</td>
                    <td style="text-align:center;">
                      <button onclick="window.location.href='${base_url}edit-product/${product.id}'" class="btn btn-editar btn-primary">Editar</button>
                      <button class="btn btn-danger" onclick="btn_eliminar(${product.id});">Eliminar</button>
                    </td>
                </tr>`;
            });
            document.getElementById('content_products').innerHTML = html;
        } else {
            document.getElementById('content_products').innerHTML = '<tr><td colspan="11">No hay productos disponibles</td></tr>';
        }
    } catch (error) {
        console.error("Error al obtener productos:", error);
        document.getElementById('content_products').innerHTML = '<tr><td colspan="8">Error al cargar los productos</td></tr>';
    }
}

// Editar producto
async function edit_product() {
    try {
        let id_producto = document.getElementById('id_producto').value;
        if (!id_producto) {
            // Si no hay id en el campo oculto, intentar obtenerlo de la URL
            const urlParams = new URLSearchParams(window.location.search);
            id_producto = urlParams.get('id');
            if (id_producto) {
                document.getElementById('id_producto').value = id_producto;
            }
        }

        if (!id_producto) {
            console.log('No se encontró ID del producto');
            return;
        }

        const datos = new FormData();
        datos.append('id_producto', id_producto);

        let respuesta = await fetch(base_url + 'control/ProductsControl.php?tipo=ver', {
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

        // Esperar un poco para que los selects se carguen
        setTimeout(() => {
            document.getElementById('id_producto').value = json.data.id;
            document.getElementById('codigo').value = json.data.codigo;
            document.getElementById('nombre').value = json.data.nombre;
            document.getElementById('detalle').value = json.data.detalle;
            document.getElementById('precio').value = json.data.precio;
            document.getElementById('stock').value = json.data.stock;
            document.getElementById('id_categoria').value = json.data.id_categoria;
            document.getElementById('fecha_vencimiento').value = json.data.fecha_vencimiento;
            document.getElementById('id_proveedor').value = json.data.id_proveedor;

            // Mostrar imagen actual si existe
            const previewDiv = document.getElementById('current_image_preview');
            if (json.data.imagen) {
                previewDiv.innerHTML = `<img src="${base_url}${json.data.imagen}" alt="Imagen actual" style="width: 100px; height: 100px; object-fit: cover; border: 1px solid #ccc;">`;
            } else {
                previewDiv.innerHTML = '<small>No hay imagen actual</small>';
            }
        }, 500);

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
        alert("Oooops, ocurrió un error al actualizar, intentelo nuevamente");
        console.log(json.msg);
    } else {
        alert(json.msg);
        // Redirigir a la lista de productos después de actualizar
        window.location.href = base_url + 'product';
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

// Cargar productos al inicio
if (document.getElementById('content_products')) {
    view_product();
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
