
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
// cargar la lista al iniciar la vista si existe el contenedor
if (document.getElementById('lista_compra')) {
    try { listar_temporales(); } catch (e) { /* ignore */ }
}

async function agregar_producto_temporal() {
    let id = document.getElementById('id_producto_venta').value;
    let precio = document.getElementById('producto_precio_venta').value;
    let cantidad = document.getElementById('producto_cantidad_venta').value;
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
        json = await respuesta.json();
        if (json.status) {
            if (json.msg == "registrado") {
                alert("el producto fue registrado");
            } else {
                alert("el producto fue actualizado")
            }
            // refrescar la lista para que se muestre inmediatamente
            try { listar_temporales(); } catch (e) { console.log('listar_temporales no disponible', e); }
        }

    } catch (error) {
        console.log("Error al agregar producto temporal" + error);
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
                <td><input type="number" id="cat_${t_venta.id}"value="${t_venta.cantidad}" style="width: 60px;" onkeyup="actualizar_subtotal(${t_venta.id}, ${t_venta.precio});" onchange="actualizar_subtotal(${t_venta.id}, ${t_venta.precio});"></td>
                <td>S/. ${t_venta.precio}</td>
                <td id="subtotal_${t_venta.id}">S/. ${t_venta.cantidad * t_venta.precio}</td>
                <td><button class="btn btn-danger btn-sm" onclick="eliminar_temporal(${t_venta.id})">Eliminar</button></td>
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
    let cantidad = document.getElementById('cat_' + id).value;
    try {
        const datos = new FormData();
        datos.append('id', id);
        datos.append('cantidad', cantidad);
        let respuesta = await fetch(base_url + 'control/VentaController.php?tipo=actualizar_cantidad', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: datos
        });
        json = await respuesta.json();
        if (json.status) {
            subtotal = cantidad * precio;
            document.getElementById('subtotal_' + id).innerHTML = 'S/. ' + subtotal;
            act_subt_general();
        }
    } catch (error) {
        console.log("Error al actualizar cantidad : " + error);
    }
}

async function act_subt_general() {
    try {
        let respuesta = await fetch(base_url + 'control/VentaController.php?tipo=listar_venta_temporal', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache'
        });
        json = await respuesta.json();
        if (json.status) {
            subtotal_general = 0;
            json.data.forEach(t_venta => {
                subtotal_general += (t_venta.precio * t_venta.cantidad);
            });
            igv = subtotal_general*0.18;
            total = subtotal_general+igv;
            document.getElementById('subtotal_general').innerHTML = 'S/. '+subtotal_general;
            document.getElementById('igv_general').innerHTML = 'S/. '+igv;
            document.getElementById('total').innerHTML = 'S/. '+total;
        }
    } catch (error) {
        console.log("error al cargar productos temporales " + error);
    }
}

// Eliminar temporal (llamado desde el botón 'Eliminar')
async function eliminar_temporal(id) {
    try {
        const datos = new FormData();
        datos.append('id', id);
        let respuesta = await fetch(base_url + 'control/VentaController.php?tipo=eliminar_temporal', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: datos
        });
        let json = await respuesta.json();
        if (json.status) {
            alert(json.msg || 'Eliminado');
            if (typeof listar_temporales === 'function') listar_temporales();
        } else {
            alert(json.msg || 'Error al eliminar');
        }
    } catch (error) {
        console.log('Error en eliminar_temporal:', error);
    }
}

// Realizar venta (limpia temporales y retorna resultado)
async function realizar_venta() {
    if (!confirm('¿Desea finalizar la venta?')) return;
    try {
        let respuesta = await fetch(base_url + 'control/VentaController.php?tipo=realizar_venta', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache'
        });
        let json = await respuesta.json();
        if (json.status) {
            alert(json.msg || 'Venta realizada');
            if (typeof listar_temporales === 'function') listar_temporales();
        } else {
            alert(json.msg || 'Error al realizar venta');
        }
    } catch (error) {
        console.log('Error en realizar_venta:', error);
        alert('Error al procesar la venta. Ver consola.');
    }
}

// Wrapper for compatibility: called from products list buttons
async function agregar_producto_venta(id, precioParam = null, cantidadParam = 1) {
    try {
        let precio = precioParam;
        let cantidad = cantidadParam || 1;

        // If price not provided, try to fetch product (fallback)
        if (precio === null) {
            const datos = new FormData();
            datos.append('id_producto', id);
            let resp = await fetch(base_url + 'control/productsControl.php?tipo=ver', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                body: datos
            });
            let json = await resp.json();
            if (!json.status) {
                console.log('No se pudo obtener producto:', json.msg);
                return;
            }
            precio = json.data.precio || 0;
        }

        // Fill hidden inputs if present (follows your model)
        const elId = document.getElementById('id_producto_venta');
        const elPrecio = document.getElementById('producto_precio_venta');
        const elCantidad = document.getElementById('producto_cantidad_venta');
        if (elId) elId.value = id;
        if (elPrecio) elPrecio.value = precio;
        if (elCantidad) elCantidad.value = cantidad;

        // Call the function that reads the hidden inputs and registers the temporal
        if (typeof agregar_producto_temporal === 'function') {
            agregar_producto_temporal();
        }
    } catch (error) {
        console.log('Error en agregar_producto_venta:', error);
    }
}
            
