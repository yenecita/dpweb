function validar_form() {
    let nombre = document.getElementById("nombre").value;
    let detalle = document.getElementById("detalle").value;

    if (nombre == "" || detalle == "") {
        alert("Error: Existen campos vacíos");
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
            window.location.href = base_url + 'categoria';
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

        let json = await respuesta.json();

        if (json.status && json.data && json.data.length > 0) {
            let html = '';
            json.data.forEach((categoria, index) => {
                html += `<tr>
                    <td>${index + 1}</td>
                    <td>${categoria.nombre || ''}</td>
                    <td>${categoria.detalle || ''}</td>
                    <td style="text-align:center;">
                        <a href="${base_url}edit-categoria/${categoria.id}" class="btn btn-primary btn-sm">Editar</a>
                        <button onclick="eliminarCategoria(${categoria.id});" class="btn btn-danger btn-sm">Eliminar</button>
                    </td>
                </tr>`;
            });
            document.getElementById('content_categoria').innerHTML = html;
        } else {
            document.getElementById('content_categoria').innerHTML = '<tr><td colspan="4" style="text-align:center;">No hay categorías disponibles</td></tr>';
        }
    } catch (error) {
        console.error("Error al obtener categorías:", error);
        document.getElementById('content_categoria').innerHTML = '<tr><td colspan="4" style="text-align:center;">Error al cargar las categorías</td></tr>';
    }
}

// Ejecutar al cargar la página
window.addEventListener('DOMContentLoaded', view_categoria);

async function edit_categoria() {
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
            window.location.href = base_url + 'categoria';
            return;
        }
        document.getElementById('nombre').value = json.data.nombre;
        document.getElementById('detalle').value = json.data.detalle;
    } catch (error) {
        console.log('Error al editar categoría: ' + error);
    }
}

if (document.querySelector('#frm_edit_categoria')) {
    let frm_edit_categoria = document.querySelector('#frm_edit_categoria');
    frm_edit_categoria.onsubmit = function (e) {
        e.preventDefault();
        actualizarCategoria();
    }
}

async function actualizarCategoria() {
    try {
        const datos = new FormData(frm_edit_categoria);
        let respuesta = await fetch(base_url + 'control/CategoriaControl.php?tipo=actualizar', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: datos
        });
        let json = await respuesta.json();

        if (!json.status) {
            alert("Oooops, ocurrió un error al actualizar. Inténtelo nuevamente.");
            console.log(json.msg);
            return;
        } else {
            alert(json.msg);
            window.location.href = base_url + 'categoria';
        }
    } catch (error) {
        console.error("Error al actualizar categoría:", error);
    }
}

async function eliminarCategoria(id) {
    if (confirm("¿Estás seguro de eliminar esta categoría?")) {
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
            console.error("Error al eliminar categoría:", error);
            alert("Error en la petición");
        }
    }
}
