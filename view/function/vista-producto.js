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


async function agregar_producto_temporal(id_product = 0, price = 0, cant = 1) {
    if (id_product == 0) {
        id = document.getElementById('id_producto_venta').value;
    } else {
        id = id_product;
    }
    if (price == 0) {
        precio = document.getElementById('producto_precio_venta').value;
    } else {
        precio = price;
    }
    if (cant == 0) {
        cantidad = document.getElementById('producto_cantidad_venta').value;
    } else {
        cantidad = cant;
    }
    
}
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
                alert("el producto fue actualizado");
            }

            listar_temporales();

        }
        listar_temporales();

    } catch (error) {

        console.log("error en agregar producto temporal " + error);

        console.log("Error al agregar producto temporal: " + error);
    } finally {
        if (btn) btn.disabled = false;

    }
}

async function listar_temporales() {
    try {

        let respuesta = await fetch(base_url + 'control/VentaController.php?tipo=listar_venta_temporal', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            
        });
        json = await respuesta.json();
        if (json.status) {
            let lista_temporal = '';
            json.data.forEach(t_venta => {
                lista_temporal += `
                <tr>
                       <td>${t_venta.nombre}</td>
                       <td><input type="number" id="cant_${t_venta.id}" value="${t_venta.cantidad}" style="width: 60px;" onkeyup="actualizar_subtotal(${t_venta.id}, ${t_venta.precio});" onchange="actualizar_subtotal(${t_venta.id}, ${t_venta.precio});"></td>
                       <td>S/. ${t_venta.precio}</td>
                       <td id="subtotal_${t_venta.id}>"S/. ${t_venta.cantidad * t_venta.precio}</td>
                       <td><button class="btn btn-danger btn-sm">Eliminar</button></td>
                   </tr>`

            });
            document.getElementById('lista_compra').innerHTML = lista_temporal;
        }

    } catch (error) {
        console.log("Error al cargar  producto temporal" + error);
    }
}
async function actualizar_subtotal(id, precio) {
    let cantidad = document.getElementById('cant_' + id).value;
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
        console.log("error al actualizar cantidad : " + error);
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
                subtotal_general += parseFloat(t_venta.precio * t_venta.cantidad);
            });
            igv = parseFloat(subtotal_general * 0.18).toFixed(2);
            total = (parseFloat(subtotal_general) + parseFloat(igv)).toFixed(2);
            document.getElementById('subtotal_general').innerHTML = 'S/. ' + subtotal_general.toFixed(2);
            document.getElementById('igv_general').innerHTML = 'S/. ' + igv;
            document.getElementById('total').innerHTML = 'S/. ' + total;
        }
    } catch (error) {
        console.log("error al cargar productos temporales " + error);
    }
}


async function buscar_cliente_venta() {
    let dni = document.getElementById('cliente_dni').value;
    try {
        const datos = new FormData();
        datos.append('dni', dni);
        let respuesta = await fetch(base_url + 'control/UsuarioController.php?tipo=buscar_por_dni', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: datos
        });
        json = await respuesta.json();
        if (json.status) {
            document.getElementById('cliente_nombre').value = json.data.razon_social;
            document.getElementById('id_cliente_venta').value = json.data.id;
        } else {
            alert(json.msg);
        }
    } catch (error) {
        console.log("error al buscar cliente por dni " + error);
    }
}

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

        json = await respuesta.json();
        if (json.status) {
            document.getElementById('cliente_nombre').value = json.data.razon_social;
            document.getElementById('id_cliente_venta').value = json.data.id;
        }else{
            alert(json.msg);
        }
    } catch (error) {
        console.log("error al buscar cliente por dni " + error);
    }
}

async function registrarventa() {
    let id_cliente = document.getElementById('id_cliente').value;
    let fecha_venta = document.getElementById('fecha_venta').value;
    if (id_cliente == "" || fecha_venta == "") {
        return alert("todos los campos son obligatorios");
    }
    try {
        const datos = new FormData();
        datos.append('id_cliente', id_cliente);
        datos.append('fecha_venta', fecha_venta);
        let respuesta = await fetch(base_url + 'control/VentaController.php?tipo=registrar_venta', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: datos
        });
        json = await respuesta.json();
        if (json.status) {
            alert("venta registrada con exito");
            window.location.reload();
        }else{
            alert(json.msg);
        }
    } catch (error) {
        console.log("error al registrar venta " + error);
        
    }
    
}



