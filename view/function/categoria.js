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

