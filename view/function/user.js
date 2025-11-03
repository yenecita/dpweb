// Validación y envío del formulario de usuario
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
        departamento == "" || provincia == "" || distrito == "" || cod_postal == "" ||
        direccion == "" || rol == ""
    ) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Por favor, complete todos los campos requeridos"
        });
        return;
    }

    if (tipo == "nuevo") registrarUsuario();
    if (tipo == "actualizar") actualizarUsuario();
}

// Evento submit para frm_user
if (document.querySelector('#frm_user')) {
    let frm_user = document.querySelector('#frm_user');
    frm_user.onsubmit = function (e) {
        e.preventDefault();
        validar_form("nuevo");
    }
}

// Función para registrar usuario
async function registrarUsuario() {
    try {
        const datos = new FormData(frm_user);
        let respuesta = await fetch(base_url + 'control/UsuarioController.php?tipo=registrar', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: datos
        });
        let json = await respuesta.json();

        if (json.status) {
            alert(json.msg);
            document.getElementById('frm_user').reset();
        } else {
            alert(json.msg);
        }
    } catch (e) {
        console.log("Error al registrar Usuario: " + e);
    }
}

// Iniciar sesión
async function iniciar_sesion() {
    let usuario = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (usuario == "" || password == "") {
        Swal.fire({
            icon: "error",
            title: "Error, campos vacíos!"
        });
        return;
    }

    try {
        const datos = new FormData(frm_login);
        let respuesta = await fetch(base_url + 'control/UsuarioController.php?tipo=iniciar_sesion', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: datos
        });
        let json = await respuesta.json();

        if (json.status) {
            location.replace(base_url + 'new-user');
        } else {
            alert(json.msg);
        }
    } catch (error) {
        console.log(error);
    }
}

// Mostrar usuarios
async function view_users() {
    try {
        let respuesta = await fetch(base_url + 'control/UsuarioController.php?tipo=ver_usuarios', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache'
        });

        let json = await respuesta.json();

        if (json.status && json.data && json.data.length > 0) {
            let html = '';
            json.data.forEach((user, index) => {
                html += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${user.nro_identidad || ''}</td>
                    <td>${user.razon_social || ''}</td>
                    <td>${user.correo || ''}</td>
                    <td>${user.rol || ''}</td>
                    <td>${user.estado || ''}</td>
                    <td style="text-align:center;">
                        <button onclick="window.location.href='${base_url}edit-user/${user.id}'" class="btn btn-editar btn-primary">Editar</button>
                        <button onclick="btn_eliminar(${user.id});" class="btn btn-eliminar btn-danger">Eliminar</button>
                    </td>
                </tr>`;
            });
            document.getElementById('content_users').innerHTML = html;
        } else {
            document.getElementById('content_users').innerHTML = '<tr><td colspan="6">No hay usuarios disponibles</td></tr>';
        }
    } catch (error) {
        console.log("Error al obtener usuarios:", error);
        document.getElementById('content_users').innerHTML = '<tr><td colspan="6">Error al cargar los usuarios</td></tr>';
    }
}

if (document.getElementById('content_users')) {
    view_users();
}

// Editar usuario
async function edit_user() {
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
    } catch (error) {
        console.log('Oops, ocurrió un error: ' + error);
    }
}

if (document.querySelector('#frm_edit_user')) {
    let frm_user = document.querySelector('#frm_edit_user');
    frm_user.onsubmit = function (e) {
        e.preventDefault();
        validar_form("actualizar");
    }
}

// Actualizar usuario
async function actualizarUsuario() {
    const datos = new FormData(frm_edit_user);
    let respuesta = await fetch(base_url + 'control/UsuarioController.php?tipo=actualizar', {
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
    }
}

// Eliminar usuario
async function btn_eliminar(id) {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
        eliminarUsuario(id);
    }
}

async function eliminarUsuario(id) {
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
            view_users(); // refresca la tabla
        } else {
            alert(json.msg);
        }
    } catch (error) {
        console.log("Error al eliminar usuario: " + error);
    }
}
