function validar_form(tipo) {
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
    let estado = document.getElementById("estado") ? document.getElementById("estado").value : "activo";

    if (
        nro_identidad == "" || razon_social == "" || telefono == "" || correo == "" ||
        departamento == "" || provincia == "" || distrito == "" ||
        cod_postal == "" || direccion == "" || rol == ""
    ) {
        Swal.fire({
            title: "Error de Validación",
            text: "Todos los campos obligatorios deben estar llenos.",
            icon: "error",
            draggable: true
        });
        return;
    }

    if (tipo == "nuevo") {
        registrarCliente();
    }
    if (tipo == "actualizar") {
        actualizarCliente();
    }
}

// Evento submit para frm_clients
if (document.querySelector('#frm_clients')) {
    let frm_clients = document.querySelector('#frm_clients');
    frm_clients.onsubmit = function (e) {
        e.preventDefault();
        validar_form("nuevo");
    }
}

// Función para registrar un nuevo cliente
async function registrarCliente() {
    try {
        const datos = new FormData(frm_clients);
        let respuesta = await fetch(base_url + 'control/UsuarioController.php?tipo=registrar', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: datos
        });
        let json = await respuesta.json();

        if (json.status) {
            alert(json.msg);
            document.getElementById('frm_clients').reset();
        } else {
            alert(json.msg);
        }
    } catch (e) {
        console.log("Error al registrar Cliente: " + e);
    }
}

// Función para visualizar clientes
async function view_client() {
    try {
        let respuesta = await fetch(base_url + 'control/UsuarioController.php?tipo=ver_client', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache'
        });

        if (!respuesta.ok) {
            throw new Error(`HTTP error! status: ${respuesta.status}`);
        }

        let json = await respuesta.json();
        let contentTable = document.getElementById('content_clients');

        if (json.status && json.data && json.data.length > 0) {
            let html = '';
            json.data.forEach((client, index) => {
                html += `<tr>
                    <td>${index + 1}</td>
                    <td>${client.nro_identidad || ''}</td>
                    <td>${client.razon_social || ''}</td>
                    <td>${client.correo || ''}</td>
                    <td>${client.rol || ''}</td>
                    <td>${client.estado || ''}</td>
                    <td style="text-align:center;">
                        <button onclick="window.location.href='${base_url}edit-clients/${client.id}'" class="btn btn-primary btn-sm">Editar</button>
                        <button onclick="btn_eliminar(${client.id});" class="btn btn-danger btn-sm">Eliminar</button>
                    </td>
                </tr>`;
            });
            contentTable.innerHTML = html;
        } else {
            contentTable.innerHTML = '<tr><td colspan="7" style="text-align:center;">No hay clientes disponibles</td></tr>';
        }
    } catch (error) {
        console.log("Error al obtener clientes:", error);
        document.getElementById('content_clients').innerHTML = '<tr><td colspan="7" style="text-align:center;">Error al cargar los clientes</td></tr>';
    }
}

// Cargar clientes al inicio
if (document.getElementById('content_clients')) {
    view_client();
}

// Función para editar cliente
async function edit_client() {
    try {
        let id_persona = document.getElementById('id_persona').value;
        const datos = new FormData();
        datos.append('id_persona', id_persona);

        let respuesta = await fetch(base_url + 'control/UsuarioController.php?tipo=ver', {
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
        console.log('Error al editar cliente: ' + error);
    }
}

// Evento submit para editar cliente
if (document.querySelector('#frm_edit_client')) {
    let frm_client = document.querySelector('#frm_edit_client');
    frm_client.onsubmit = function (e) {
        e.preventDefault();
        validar_form("actualizar");
    }
}

// Función para actualizar cliente
async function actualizarCliente() {
    try {
        const datos = new FormData(document.querySelector('#frm_edit_client'));
        let respuesta = await fetch(base_url + 'control/UsuarioController.php?tipo=actualizar', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: datos
        });

        let json = await respuesta.json();
        if (!json.status) {
            alert("Oooops, ocurrió un error al actualizar el cliente, inténtelo nuevamente");
            console.log(json.msg);
            return;
        } else {
            alert(json.msg);
            window.location.href = base_url + 'clients';
        }
    } catch (error) {
        console.log("Error al actualizar cliente:", error);
    }
}

// Confirmación de eliminación
async function btn_eliminar(id) {
    if (window.confirm("¿Estás seguro de eliminar este cliente?")) {
        eliminarCliente(id);
    }
}

// Eliminar cliente
async function eliminarCliente(id) {
    try {
        const datos = new FormData();
        datos.append('id_persona', id);

        let respuesta = await fetch(base_url + 'control/UsuarioController.php?tipo=eliminar', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: datos
        });

        let json = await respuesta.json();

        if (json.status) {
            alert(json.msg);
            view_client(); // refresca la tabla
        } else {
            alert(json.msg);
        }
    } catch (error) {
        console.log("Error al eliminar cliente:", error);
    }
}
