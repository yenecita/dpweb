
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
            cargar_lista_compra(); // Recargar la lista después de agregar
        }
    } catch (error) {
        console.log("Error al agregar temporal" + error);
    }
}

// Función para agregar producto desde la lista de productos
async function agregar_producto_venta(id) {
    // Obtener datos del producto
    const datos = new FormData();
    datos.append('id_producto', id);

    try {
        let respuesta = await fetch(base_url + 'control/productsControl.php?tipo=ver', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: datos
        });
        let json = await respuesta.json();
        if (json.status) {
            document.getElementById('id_producto_venta').value = json.data.id;
            document.getElementById('producto_precio_venta').value = json.data.precio;
            document.getElementById('producto_cantidad_venta').value = 1;
            agregar_producto_temporal();
        }
    } catch (error) {
        console.log("Error al obtener producto: " + error);
    }
}

// Cargar lista de compra
async function cargar_lista_compra() {
    try {
        let respuesta = await fetch(base_url + 'control/VentaController.php?tipo=ver_temporal', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache'
        });
        let json = await respuesta.json();
        let html = '';
        let subtotal = 0;
        if (json.status && json.data) {
            json.data.forEach(item => {
                let total = item.precio * item.cantidad;
                subtotal += total;
                html += `
                    <tr>
                        <td>${item.nombre}</td>
                        <td>${item.cantidad}</td>
                        <td>$${item.precio}</td>
                        <td>$${total.toFixed(2)}</td>
                        <td><button class="btn btn-danger btn-sm" onclick="eliminar_producto_temporal(${item.id})">Eliminar</button></td>
                    </tr>
                `;
            });
        }
        document.getElementById('lista_compra').innerHTML = html;
        let igv = subtotal * 0.18;
        let total = subtotal + igv;
        document.getElementById('subtotal').innerText = '$' + subtotal.toFixed(2);
        document.getElementById('igv').innerText = '$' + igv.toFixed(2);
        document.getElementById('total').innerText = '$' + total.toFixed(2);
    } catch (error) {
        console.log("Error al cargar lista: " + error);
    }
}

// Eliminar producto temporal
async function eliminar_producto_temporal(id) {
    const datos = new FormData();
    datos.append('id_producto', id);
    try {
        let respuesta = await fetch(base_url + 'control/VentaController.php?tipo=eliminarTemporal', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: datos
        });
        let json = await respuesta.json();
        if (json.status) {
            cargar_lista_compra();
        }
    } catch (error) {
        console.log("Error al eliminar: " + error);
    }
}

// Realizar venta
async function realizar_venta() {
    try {
        let respuesta = await fetch(base_url + 'control/VentaController.php?tipo=registrarVenta', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache'
        });
        let json = await respuesta.json();
        if (json.status) {
            alert('Venta realizada correctamente');
            cargar_lista_compra(); // Limpiar lista
        } else {
            alert('Error al realizar venta');
        }
    } catch (error) {
        console.log("Error al realizar venta: " + error);
    }
}

// Cargar lista al inicio
if (document.getElementById('lista_compra')) {
    cargar_lista_compra();
}
