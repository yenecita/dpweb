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
    let estado = document.getElementById("estado").value;

    if (
        nro_identidad == "" || razon_social == "" || telefono == "" || correo == "" ||
        departamento == "" || provincia == "" || distrito == "" || cod_postal == "" ||
        direccion == "" || rol == "" || estado == ""
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

// Mostrar proveedores
async function view_proveedor() {
    try {
        let respuesta = await fetch(base_url + 'control/UsuarioController.php?tipo=listar_proveedores', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache'
        });
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
                    <td>${proveedor.direccion || ''}</td>
                    <td>${proveedor.estado == '1' ? 'Activo' : 'Inactivo'}</td>
                    <td style="text-align:center;">
                      <button onclick="window.location.href='${base_url}edit-proveedor/${proveedor.id}'" class="btn btn-editar btn-primary">Editar</button>
                      <button class="btn btn-danger" onclick="btn_eliminar_proveedor(${proveedor.id});">Eliminar</button>
                    </td >
                </tr>`;
            });
            document.getElementById('content_proveedor').innerHTML = html;
        } else {
            document.getElementById('content_proveedor').innerHTML = '<tr><td colspan="8">No hay proveedores disponibles</td></tr>';
        }
    } catch (error) {
        console.error("Error al obtener proveedores:", error);
        document.getElementById('content_proveedor').innerHTML = '<tr><td colspan="8">Error al cargar los proveedores</td></tr>';
    }
}

// Editar proveedor
async function edit_proveedor() {
    try {
        let id_persona = document.getElementById('id_persona').value;
        const datos = new FormData();
        datos.append('id_persona', id_persona);

        let respuesta = await fetch(base_url + 'control/UsuarioController.php?tipo=ver_proveedor', {
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

        document.getElementById('nro_identidad').value = json.data.nro_identidad;
        document.getElementById('razon_social').value = json.data.razon_social;
        document.getElementById('telefono').value = json.data.telefono;
        document.getElementById('correo').value = json.data.correo;
        document.getElementById('departamento').value = json.data.departamento;
        document.getElementById('provincia').value = json.data.provincia;
        document.getElementById('distrito').value = json.data.distrito;
        document.getElementById('cod_postal').value = json.data.cod_postal;
        document.getElementById('direccion').value = json.data.direccion;
        document.getElementById('rol').value = json.data.rol;
        document.getElementById('estado').value = json.data.estado;

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

// Actualizar proveedor
async function actualizarProveedor() {
    const frm_edit_proveedor = document.querySelector('#frm_edit_proveedor');
    const datos = new FormData(frm_edit_proveedor);

    let respuesta = await fetch(base_url + 'control/UsuarioController.php?tipo=actualizar_proveedor', {
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

// Eliminar proveedor
async function btn_eliminar_proveedor(id) {
    if (confirm("Estás seguro de eliminar este proveedor")) {
        eliminarProveedor(id);
    }
}

async function eliminarProveedor(id) {
    try {
        const datos = new FormData();
        datos.append('id_persona', id);

        let respuesta = await fetch(base_url + 'control/UsuarioController.php?tipo=eliminar_proveedor', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: datos
        });

        let json = await respuesta.json();

        if (json.status) {
            alert(json.msg);
            view_proveedor();
        } else {
            alert(json.msg);
        }
    } catch (error) {
        console.log("Error al eliminar proveedor: " + error);
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
        contenido += `<option value="+categoria.id+">` + categoria.nombre + `</option>`;
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
        contenido += `<option value="${proveedor.id}">` + proveedor.razon_social + `</option>`;
    });
    //console.log(contenido);
    document.getElementById("id_proveedor").innerHTML = contenido;
}

// Inicializar la vista de clientes si el elemento existe (para la tabla de clientes)
if (document.getElementById('content_clients')) {
    view_clients();
}