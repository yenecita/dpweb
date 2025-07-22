function validar_form() {
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
    if (nro_identidad == "" || razon_social == "" || telefono == "" || correo == "" || departamento == "" || provincia == "" || distrito == "" || cod_postal == "" || direccion == "" || rol == "") {
        alert("Error: Existen Campos vacios");
        return;
    }
    registrarUsuario();
}
if (document.querySelector('#frm_user')) {
    //evita que se envie el formulario
    let frm_user = document.querySelector('#frm_user');
    frm_user.onsubmit = function (e) {
        e.preventDefault();
        validar_form();
    }
}
async function registrarUsuario() {
    try {
        //capturar campos de formulario (HTML)
        const datos = new FormData(frm_user);
        //enviar datos a controlador
        let respuesta = await fetch(base_url + 'control/UsuarioController.php? tipo=registrar', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: datos
        });
        let json = await respuesta.json();
        //validamos que json.status sea == True
        if (json.status) {
            ocation.replace(base_url + 'new-user')
            alert(json.msg);//True
            document.getElementById('frm_user').reset();
        } else {
            alert(json.msg);
        }

    } catch (e) {
        console.log("Error al registrar Usuario:" + e);
    }
}


async function iniciar_sesion() {
    let Usuario = document.getElementById("text").value;
    let password = document.getElementById("password").value;
    if (Usuario == "" || password == "") {
        alert("Error, campos vacios!");
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
        //---
        let json = await respuesta.json();
        if (json.status) {
            location.replace(base_url + 'new-user')
        } else {
            alert(json.msg);
        }
    } catch (error) {
        console.log(error);
    }
}

//users
//Se declara una función async,que permite usar await dentro de ella para manejar promesas.
async function view_users() {
    try {
        //Usa fetch() para hacer una petición POST al servidor.
        let respuesta = await fetch(base_url + 'control/usuarioController.php?tipo=ver_usuarios', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache'
        });
        let json = await respuesta.json();//Espera y transforma la respuesta a JSON.
        if (json && json.length > 0) {//Verifica si el servidor devolvió datos y si la lista no está vacía.
            //Recorre la lista de usuarios.
            let html = '';
            json.forEach((user, index) => {
                //Para cada usuario, crea una fila <tr> con sus datos.
                html += `<tr>
                    <td>${index + 1}</td>
                    <td>${user.nro_identidad || ''}</td>
                    <td>${user.razon_social || ''}</td> 
                    <td>${user.correo || ''}</td>
                    <td>${user.rol || ''}</td>
                    <td>${user.estado || ''}</td>
                    <td>
                       <a href="`+ base_url+`edit_user/`+ user.id +`">Editar</a>
                    </td>
                </tr>
                `;//Usa || '' para evitar errores si algún campo viene vacío o indefinido.
            });
            //Inserta todas las filas generadas dentro del elemento con id="content_users".
            document.getElementById('content_users').innerHTML = html;
        } else {
            //Si no hay usuarios, muestra una fila con el mensaje “No hay usuarios disponibles”.
            document.getElementById('content_users').innerHTML = '<tr><td colspan="6">No hay usuarios disponibles</td></tr>';
        }
        //muestra una fila con el mensaje de error.
    } catch (error) {
        console.log(error);
        document.getElementById('content_users').innerHTML = '<tr><td colspan="6">Error al cargar los usuarios</td></tr>';
    }
}
// se llama a la función view_users() automáticamente.
if (document.getElementById('content_users')) {
    view_users();
}
