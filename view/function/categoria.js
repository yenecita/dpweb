function validar_form() {
    let nombre = document.getElementById("nombre").value;
    let detalle = document.getElementById("detalle").value;

    if (nombre == "" || detalle == "") {
        alert("Error: Existen Campos vacios");
        return;

    }
    registrarCategoria();
}
if (document.querySelector('#frm_categoria')) {
    let frm_categoria = document.querySelector('#frm_categoria');
    frm_categoria.onsubmit = function (e) {
        e.preventDefault();
        validar_form();
    }
}

async function registrarCategoria() {
    try {
        const datos = new FormData(frm_categoria);
        let respuesta = await fetch(base_url + 'control/CategoriaControl.php?tipo=registrar', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: datos
        });
        let json = await respuesta.json();
        console.log(json);
        if (json.status) {
            alert(json.msg);
            document.getElementById('frm_categoria').reset();
        } else {
            alert(json.msg);
        }
    } catch (error) {
        console.log("Error al registrar categoría: " + error);
    }
}


async function view_categoria() {
    try {
        let respuesta = await fetch(base_url + 'control/CategoriaControl.php?tipo=ver_categorias', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache'
        });

        let json = await respuesta.json(); // ← Esta línea es esencial

        if (json && json.status && json.data && json.data.length > 0) {
            let html = '';
            json.data.forEach((categoria, index) => {
                html += `<tr>
                    <td>${categoria.id}</td>
                    <td>${categoria.nombre || ''}</td>
                    <td>${categoria.detalle || ''}</td>
                    <td style="text-align:center;">
                        <a href="${base_url}edit-categories?id=${categoria.id}" class="btn btn-primary btn-sm">Editar</a>
                        <button onclick="btn_eliminar(${categoria.id});" class="btn btn-danger btn-sm">Eliminar</button>
                    </td>
                </tr>`;
            });
            document.getElementById('content_categorias').innerHTML = html;
        } else {
            document.getElementById('content_categorias').innerHTML = '<tr><td colspan="4" style="text-align:center;">No hay categorías disponibles</td></tr>';
        }
    } catch (error) {
        console.error("Error al obtener categorias:", error);
        document.getElementById('content_categorias').innerHTML = '<tr><td colspan="4" style="text-align:center;">Error al cargar las categorías</td></tr>';
    }
}

async function edit_categories() {
    try {
        let id_categoria = document.getElementById('id_categoria').value;
        const datos = new FormData();
        datos.append('id_categoria', id_categoria);

        let respuesta = await fetch(base_url + 'control/CategoriaControl.php?tipo=ver', {
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
        document.getElementById('nombre').value = json.data.nombre;
        document.getElementById('detalle').value = json.data.detalle;
    } catch (error) {
        console.log('Error al editar categoría: ' + error);
    }
}
if (document.querySelector('#frm_edit_categories')) {
    //evita que se envie el formulario
    let frm_categoria = document.querySelector('#frm_edit_categories');
    frm_categoria.onsubmit = function (e) {
        e.preventDefault();
        actualizarCategoria();
    }
}

async function actualizarCategoria() {
    const datos = new FormData(frm_edit_categories);
    let respuesta = await fetch(base_url + 'control/CategoriaControl.php?tipo=actualizar', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        body: datos
    });
    json = await respuesta.json();
    if (!json.status) {
        alert("Oooops, ocurrio un error al actualizar, intentelo nuevamente");
        console.log(json.msg);
        return;
    } else {
        alert(json.msg);
    }
}
async function btn_eliminar(id) {
    if (window.confirm("¿Estás seguro de eliminar esta categoría?")) {
        eliminarCategoria(id);
    }
}
async function eliminarCategoria(id) {
    try {
        const datos = new FormData();
        datos.append('id_categoria', id);

        let respuesta = await fetch(base_url + 'control/CategoriaControl.php?tipo=eliminar', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: datos
        });

        let json = await respuesta.json();

        if (json.status) {
            alert(json.msg);
            view_categoria(); // refresca la tabla
        } else {
            alert(json.msg);
        }
    } catch (error) {
        console.log("Error al eliminar categoría: " + error);
    }
}

// Cargar categorías al inicio
if (document.getElementById('content_categorias')) {
    view_categoria();
}


