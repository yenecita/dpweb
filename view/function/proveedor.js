// Validación y envío del formulario de proveedor
function validar_form(tipo) {
    // Obtener todos los campos
    let nro_identidad = document.getElementById("nro_identidad").value;
    let razon_social = document.getElementById("razon_social").value;
    let telefono = document.getElementById("telefono").value;
    let correo = document.getElementById("correo").value;
    let departamento = document.getElementById("departamento").value;
    let provincia = document.getElementById("provincia").value;
    let distrito = document.getElementById("distrito").value;
    let cod_postal = document.getElementById("cod_postal").value;
    let direccion = document.getElementById("direccion").value;
    let rol = document.getElementById("rol").value;

    if (
        nro_identidad == "" || razon_social == "" || telefono == "" || correo == "" ||
        departamento == "" || provincia == "" || distrito == "" || cod_postal == "" || direccion == "" || rol == ""
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
        registrarProveedor();
    }
    if (tipo === "actualizar") {
        actualizarProveedor();
    }
}

// Evento submit para frm_products
if (document.querySelector('#frm_proveedor')) {
    let frm_proveedor = document.querySelector('#frm_proveedor');
    frm_proveedor.onsubmit = function (e) {
        e.preventDefault();
        validar_form("nuevo");
    }
}

// Función para registrar proveedor
async function registrarProveedor() {
    try {
        const frm_proveedor = document.querySelector('#frm_proveedor');
        const datos = new FormData(frm_proveedor);

        let respuesta = await fetch(base_url + 'control/UsuarioController.php?tipo=registrar', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: datos
        });

        let json = await respuesta.json();

        if (json.status) {
            alert(json.msg);
            document.getElementById('frm_proveedor').reset();
        } else {
            alert(json.msg);
        }
    } catch (e) {
        console.log("Error al registrar Proveedor:" + e);
    }
}

// Mostrar productos


// Editar producto
async function edit_proveedor() {
    try {
        let id_producto = document.getElementById('id_producto').value;
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

if (document.querySelector('#frm_edit_proveedor')) {
    let frm_product = document.querySelector('#frm_edit_proveedor');
    frm_product.onsubmit = function (e) {
        e.preventDefault();
        validar_form("actualizar");
    }
}

// Actualizar producto
async function actualizarProveedor() {
    const frm_edit_products = document.querySelector('#frm_edit_proveedor');
    const datos = new FormData(frm_edit_products);

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
        return;
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

async function eliminarProveedor(id) {
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

// Cargar proveedores al inicio
if (document.getElementById('content_proveedor')) {
    view_proveedor();
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
async function view_proveedor() {
    try {
        let respuesta = await fetch(base_url + 'control/UsuarioController.php?tipo=ver_proveedor', {
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
            json.data.forEach((proveedor, index) => {
                html += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${proveedor.nro_identidad || ''}</td>
                    <td>${proveedor.razon_social || ''}</td>
                    <td>${proveedor.telefono || ''}</td>
                    <td>${proveedor.correo || ''}</td>
                    <td>${proveedor.rol || ''}</td>
                    <td>
                      <a href="${base_url}edit-proveedor/${proveedor.id}">Editar</a>
                      <button class="btn btn-danger" onclick="btn_eliminar(${proveedor.id});">Eliminar</button>
                    </td>
                </tr>`;
            });
            document.getElementById('content_proveedor').innerHTML = html;
        } else {
            document.getElementById('content_proveedor').innerHTML = '<tr><td colspan="7">No hay proveedores disponibles</td></tr>';
        }
    } catch (error) {
        console.error("Error al obtener proveedores:", error);
        document.getElementById('content_proveedor').innerHTML = '<tr><td colspan="7">Error al cargar los proveedores</td></tr>';
    }
}

