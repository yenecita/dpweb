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

    if (nro_identidad == "" || razon_social == "" || telefono == "" || correo == "" || departamento == "" || provincia == "" || distrito == "" || cod_postal == "" || direccion == "" || rol == "") {
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


//Función para registrar un nuevo cliente.

async function registrarCliente() {
    try {
        //capturaran campos de formulario (HTML)
        const datos = new FormData(frm_clients);
        //enviar datos al controlador
        let respuesta = await fetch(base_url + 'control/UsuarioController.php?tipo=registrar', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: datos
        });
        let json = await respuesta.json();
        //validamos que json.status sea = true
        if (json.status) {
            alert(json.msg);
            document.getElementById('frm_clients').reset(); // Limpia el formulario
        } else {
            alert(json.msg);
        }
    } catch (e) {
        console.log("Error al registrar Cliente:" + e);
    }

}
async function view_client() {
    try {
        console.log("Iniciando carga de clientes...");
        let respuesta = await fetch(base_url + 'control/UsuarioController.php?tipo=ver_client', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache'
        });

        console.log("Respuesta del servidor:", respuesta);
        if (!respuesta.ok) {
            throw new Error(`HTTP error! status: ${respuesta.status}`);
        }
        json = await respuesta.json();
        console.log("JSON recibido:", json);
        console.log("Número de clientes:", json.data ? json.data.length : 0);
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
                        <button onclick="window.location.href='${base_url}edit-clients/${client.id}'" class="btn btn-editar btn-primary">Editar</button>
                        <button onclick="btn_eliminar(` + client.id + `);" class="btn btn-eliminar btn-danger">Eliminar</button>
                    </td>
                </tr>`;
            });
            contentTable.innerHTML = html;
        } else {
            contentTable.innerHTML = '<tr><td colspan="7">No hay clientes disponibles</td></tr>';
        }
    } catch (error) {
        console.log("Error al obtener cliente:", error);
        document.getElementById('content_clients').innerHTML = '<tr><td colspan="7">Error al cargar los clientes: ' + error.message + '</td></tr>';
    }
}

// Inicializar la vista de clientes si el elemento existe (para la tabla de clientes)
if (document.getElementById('content_clients')) {
    view_client();
}

async function edit_client() {
    try {
        // Asumiendo que el ID se carga en un campo oculto 'id_persona' o es accesible globalmente
        let id_persona = document.getElementById('id_persona').value;
        const datos = new FormData();
        datos.append('id_persona', id_persona);

        let respuesta = await fetch(base_url + 'control/UsuarioController.php?tipo=ver', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: datos
        });

        json = await respuesta.json();
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
        console.log('Error al editar cliente:' + error);
    }
}

// Evento submit para frm_edit_client
if (document.querySelector('#frm_edit_client')) {
    let frm_client = document.querySelector('#frm_edit_client');
    frm_client.onsubmit = function (e) {
        e.preventDefault();
        validar_form("actualizar");
    }
}
async function actualizarCliente() {
    const datos = new FormData(document.querySelector('#frm_edit_client'));
    let respuesta = await fetch(base_url + 'control/UsuarioController.php?tipo=actualizar', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        body: datos
    });

    json = await respuesta.json();
    if (!json.status) {
        alert("Oooops, ocurrió un error al actualizar el cliente, intentelo nuevamente");
        console.log(json.msg);
        return;
    } else {
        alert(json.msg);
        // Redirigir a la lista de clientes después de actualizar
        window.location.href = base_url + 'clients';
    }
}
async function btn_eliminar(id) {
    if (window.confirm("¿Estás seguro de eliminar este cliente?")) {
        eliminarCliente(id);
    }
}

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

        json = await respuesta.json();
        if (!json.status) {
            alert("Oooops, ocurrió un error al eliminar el cliente, intentelo nuevamente");
            console.log(json.msg);
            return;
        } else {
            alert(json.msg);
            // Refrescar la lista de clientes
            view_client();
        }
    } catch (error) {
        console.log("Error al eliminar cliente:", error);
    }
}

/*function eliminar(id) {
    let datos = new FormData();
    datos.append('id_persona', id);
    let respuesta = await fetch(BASE_URL + "controller/UsuarioController.php?tipo=eliminar" , {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        body: datos 
    });

    json = await respuesta.json();
    if (!json.status){
       alert("Oooops, ocurrió un error al actualizar el cliente, intentelo nuevamente");
        console.log(json.msg);
        return;
    }else{
        alert(json.msg);
        location.replace(base_url + 'users');
    }
       
}*/
function eliminarUsuario(id) {
    if (confirm("¿Estás seguro de eliminar este usuario?")) {
        $.ajax({
            url: BASE_URL + "controller/UsuarioController.php?tipo=eliminar",
            type: "POST",
            data: { id_persona: id },
            dataType: "json",
            success: function (response) {
                if (response.status) {
                    alert(response.msg);
                    verUsuarios(); // refresca la tabla
                } else {
                    alert(response.msg);
                }
            },
            error: function () {
                alert("Error en la petición AJAX");
            }
        });
    }
}