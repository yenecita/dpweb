let productos_venta = {};
let id = 2;
let id2 = 4;
let producto = {};
producto.nombre = "Producto A";
producto.precio = 100;
producto.cantidad = 2;

let producto2 = {};
producto2.nombre = "Producto B";
producto2.precio = 200;
producto2.cantidad = 1;
//productos_venta.push(producto);

productos_venta[id] = producto;
productos_venta[id2] = producto2;
console.log(productos_venta);

async function agregar_producto_temporal(event) {
    if (event && event.preventDefault) event.preventDefault();
    const btn = document.getElementById('btn_agregar_producto');
    if (btn) btn.disabled = true;

    const id = document.getElementById('id_producto_venta').value;
    const precio = document.getElementById('producto_precio_venta').value;
    const cantidad = document.getElementById('producto_cantidad_venta').value;
    const datos = new FormData();
    datos.append('id_producto', id);
    datos.append('precio', precio);
    datos.append('cantidad', cantidad);

    try {
        let respuesta = await fetch(base_url + 'control/VentaController.php?tipo=registrarTemporal', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: datos
        });
        if (!respuesta.ok) {
            console.log('Error HTTP al agregar producto temporal:', respuesta.status, respuesta.statusText);
            return;
        }
        const text = await respuesta.text();
        if (!text) {
            console.log('Respuesta vacía al agregar producto temporal');
            return;
        }
        let json;
        try {
            json = JSON.parse(text);
        } catch (e) {
            console.log('Respuesta no es JSON al agregar producto temporal:', text);
            return;
        }
        if (json.status) {
            if (json.msg == "registrado") {
                alert("el producto fue registrado");
            } else {
                alert("el producto fue actualizado")
            }
            listar_temporales();
        }
    } catch (error) {
        console.log("Error al agregar producto temporal: " + error);
    } finally {
        if (btn) btn.disabled = false;
    }
}

async function listar_temporales() {
    try {
       let respuesta = await fetch(base_url + 'control/VentaController.php?tipo=listar_venta_Temporal', {
            method: 'POST', 
            mode: 'cors',
            cache: 'no-cache'
        });
        json = await respuesta.json();
        if (json.status) {
            let listar_temporal = '';
            json.data.forEach(t_venta => {
                listar_temporal += `<tr>
                <td>${t_venta.nombre}</td>
                <td><input type="number" id="cat_${t_venta.id}" value="${t_venta.cantidad}" style="width: 60px;" onkeyup="actualizar_subtotal(${t_venta.id}, ${t_venta.precio});" onchange="actualizar_subtotal(${t_venta.id}, ${t_venta.precio});"></td>
                <td>S/. ${t_venta.precio}</td>
                <td id="subtotal_${t_venta.id}">S/. ${t_venta.cantidad * t_venta.precio}</td>
               <td><button class="btn btn-danger btn-sm" onclick="eliminar_temporal(${t_venta.id});">Eliminar</button></td>
               </tr>`
            });
            document.getElementById('lista_compra').innerHTML = listar_temporal;
            act_subt_general();
        }
    } catch (error) {
        console.log("Error al cargar productos temporales" + error); 
    }
}

async function actualizar_subtotal(id, precio) {
    const cantidad = document.getElementById('cat_' + id).value;
    try {
        const datos = new FormData();
        datos.append('id', id);
        datos.append('cantidad', cantidad);
        const respuesta = await fetch(base_url + 'control/VentaController.php?tipo=actualizar_cantidad', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: datos
        });
        if (!respuesta.ok) {
            console.log('Error HTTP actualizar cantidad:', respuesta.status, respuesta.statusText);
            return;
        }
        const text = await respuesta.text();
        if (!text) {
            console.log('Respuesta vacía al actualizar cantidad');
            return;
        }
        let json;
        try {
            json = JSON.parse(text);
        } catch (e) {
            console.log('Respuesta no es JSON al actualizar cantidad:', text);
            return;
        }
        if (json.status) {
            const subtotal = cantidad * precio;
            const subtotalElem = document.getElementById('subtotal_' + id);
            if (subtotalElem) subtotalElem.innerHTML = 'S/. ' + subtotal;
            act_subt_general();
        }
    } catch (error) {
        console.log("Error al actualizar cantidad : " + error);
    }
}

async function act_subt_general() {
    try {
        const respuesta = await fetch(base_url + 'control/VentaController.php?tipo=listar_venta_temporal', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache'
        });
        if (!respuesta.ok) {
            console.log('Error HTTP act_subt_general:', respuesta.status, respuesta.statusText);
            return;
        }
        const text = await respuesta.text();
        if (!text) {
            console.log('Respuesta vacía en act_subt_general');
            return;
        }
        let json;
        try {
            json = JSON.parse(text);
        } catch (e) {
            console.log('Respuesta no es JSON en act_subt_general:', text);
            return;
        }

        if (json.status) {
            let subtotal_general = 0;
            json.data.forEach(t_venta => {
                subtotal_general += (t_venta.precio * t_venta.cantidad);
            });
            const igv = subtotal_general * 0.18;
            const total = subtotal_general + igv;
            const sg = document.getElementById('subtotal_general');
            const igvElem = document.getElementById('igv_general');
            const totalElem = document.getElementById('total');
            if (sg) sg.innerHTML = 'S/. ' + subtotal_general;
            if (igvElem) igvElem.innerHTML = 'S/. ' + igv;
            if (totalElem) totalElem.innerHTML = 'S/. ' + total;
        }
    } catch (error) {
        console.log("error al cargar productos temporales " + error);
    }
}

// nuevo: exponer función que llama al flujo de agregar (ajusta parámetros según lo que pase vista-cliente)
window.agregar_producto_venta = function(idProducto, precioProducto) {
    try {
        const idField = document.getElementById('id_producto_venta');
        const precioField = document.getElementById('producto_precio_venta');
        const cantidadField = document.getElementById('producto_cantidad_venta');
        if (idField) idField.value = idProducto ?? idField.value;
        if (precioField) precioField.value = precioProducto ?? precioField.value;
        if (cantidadField) cantidadField.value = cantidadField.value || 1;
        // llamar a la función principal; no pasar event para que no intente preventDefault si viene desde onclick
        agregar_producto_temporal();
    } catch (e) {
        console.log('Error en agregar_producto_venta:', e);
    }
};

// nuevo: función para eliminar un item temporal
async function eliminar_temporal(id) {
    if (!confirm('¿Eliminar este producto?')) return;
    try {
        const datos = new FormData();
        datos.append('id', id);
        let respuesta = await fetch(base_url + 'control/VentaController.php?tipo=eliminar_temporal', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: datos
        });
        // intentar parsear JSON y manejar errores
        const text = await respuesta.text();
        try {
            const json = JSON.parse(text);
            if (json.status) {
                listar_temporales();
            } else {
                console.log('Error al eliminar:', json.msg);
            }
        } catch (e) {
            console.log('Respuesta no JSON al eliminar:', text);
        }
    } catch (error) {
        console.log('Error en eliminar_temporal:', error);
    }
}


