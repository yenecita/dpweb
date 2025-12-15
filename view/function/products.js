// Función auxiliar para cargar imagen como base64
async function loadImageAsBase64(url) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error loading image:", error);
    return null;
  }
}

// Validación y envío del formulario de producto
function validar_form(tipo) {
  // Obtener todos los campos
  let codigo = document.getElementById("codigo").value;
  let nombre = document.getElementById("nombre").value;
  let detalle = document.getElementById("detalle").value;
  let precio = document.getElementById("precio").value;
  let stock = document.getElementById("stock").value;
  let id_categoria = document.getElementById("id_categoria").value;
  let fecha_vencimiento = document.getElementById("fecha_vencimiento").value;
  let id_proveedor = document.getElementById("id_proveedor").value;

  if (
    codigo == "" ||
    nombre == "" ||
    detalle == "" ||
    precio == "" ||
    stock == "" ||
    id_categoria == "" ||
    fecha_vencimiento == "" ||
    id_proveedor == ""
  ) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor, complete todos los campos requeridos",
      confirmButtonText: "Entendido",
    });
    return;
  }

  if (tipo === "nuevo") registrarProducto();
  if (tipo === "actualizar") actualizarProducto();
}

// Evento submit para registrar producto
if (document.querySelector("#frm_products")) {
  let frm_product = document.querySelector("#frm_products");
  frm_product.onsubmit = function (e) {
    e.preventDefault();
    validar_form("nuevo");
  };
}

// Función para registrar producto
async function registrarProducto() {
  try {
    const frm_products = document.querySelector("#frm_products");
    const datos = new FormData(frm_products);

    let respuesta = await fetch(
      base_url + "control/productsControl.php?tipo=registrar",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        body: datos,
      }
    );

    let json = await respuesta.json();

    if (json.status) {
      alert(json.msg);
      document.getElementById("frm_products").reset();
    } else {
      alert(json.msg);
    }
  } catch (e) {
    console.log("Error al registrar Producto: " + e);
  }
}

// Mostrar productos
async function view_product() {
  try {
    let respuesta = await fetch(
      base_url + "control/productsControl.php?tipo=ver_productos",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
      }
    );

    if (!respuesta.ok) throw new Error("Respuesta no válida del servidor");
    let json = await respuesta.json();

    if (json.status && json.data && json.data.length > 0) {
      let html = "";
      // Cargar imágenes en paralelo
      const imagePromises = json.data.map(async (product, index) => {
        let imagenHtml = "";
        if (product.imagen) {
          const base64 = await loadImageAsBase64(base_url + product.imagen);
          if (base64) {
            imagenHtml = "Imagen del producto";
          }
        }
        return `
                <tr>
                    <td>${index + 1}</td>
                    <td>${product.codigo || ""}</td>
                    <td>${product.nombre || ""}</td>
                    <td>${product.detalle || ""}</td>
                    <td>${product.precio || ""}</td>
                    <td>${product.stock || ""}</td>
                    <td>${product.categoria || "Sin categoría"}</td>
                    <td>${product.fecha_vencimiento || ""}</td>
                    <td><svg id="barcode${product.id}"></svg></td>
                    <td>${product.id_proveedor || ""}</td>
                    <td style="text-align:center;">
                        <button onclick="window.location.href='${base_url}edit-product/${
          product.id
        }'" class="btn btn-primary btn-sm">Editar</button>
                        <button onclick="btn_eliminar(${
                          product.id
                        });" class="btn btn-danger btn-sm">Eliminar</button>
                    </td>
                </tr>`;
      });
      const rows = await Promise.all(imagePromises);
      html = rows.join("");
      document.getElementById("content_products").innerHTML = html;
    } else {
      document.getElementById("content_products").innerHTML =
        '<tr><td colspan="11">No hay productos disponibles</td></tr>';
    }
    // grafico de barras
    json.data.forEach((product) => {
      JsBarcode("#barcode" + product.id, "" + product.codigo, {
        width: 2,
        height: 40,
        lineColor: "rgba(96, 158, 164, 1)",
      });
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    document.getElementById("content_products").innerHTML =
      '<tr><td colspan="11">Error al cargar los productos</td></tr>';
  }
}

// Cargar productos al inicio
if (document.getElementById("content_products")) view_product();

// Editar producto
async function edit_product() {
  try {
    // Obtener el ID del campo oculto (viene de PHP)
    let id_producto = document.getElementById("id_producto").value;

    if (!id_producto) {
      console.log("No se encontró ID del producto en el campo oculto");
      return;
    }

    console.log("ID del producto a editar:", id_producto);

    const datos = new FormData();
    datos.append("id_producto", id_producto);

    let respuesta = await fetch(
      base_url + "control/productsControl.php?tipo=ver",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        body: datos,
      }
    );

    let json = await respuesta.json();
    console.log("Respuesta del servidor:", json);

    if (!json.status) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: json.msg,
      });
      return;
    }

    // Llenar campos con la información del producto
    document.getElementById("codigo").value = json.data.codigo || "";
    document.getElementById("nombre").value = json.data.nombre || "";
    document.getElementById("detalle").value = json.data.detalle || "";
    document.getElementById("precio").value = json.data.precio || "";
    document.getElementById("stock").value = json.data.stock || "";
    document.getElementById("id_categoria").value =
      json.data.id_categoria || "";
    document.getElementById("fecha_vencimiento").value =
      json.data.fecha_vencimiento || "";
    document.getElementById("id_proveedor").value =
      json.data.id_proveedor || "";
    document.getElementById("estado").value = json.data.estado || "";

    // Mostrar imagen actual si existe
    const previewDiv = document.getElementById("current_image_preview");
    if (previewDiv) {
      if (json.data.imagen) {
        loadImageAsBase64(base_url + json.data.imagen).then((base64) => {
          previewDiv.innerHTML = base64
            ? `<img src="${base64}" alt="Imagen actual" style="max-width: 200px; max-height: 200px;">`
            : "<small>No hay imagen actual</small>";
        });
      } else {
        previewDiv.innerHTML = "<small>No hay imagen actual</small>";
      }
    }

    console.log("Campos llenados correctamente");
  } catch (error) {
    console.log("Error al editar producto:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Ocurrió un error al cargar los datos del producto",
    });
  }
}

// Evento submit para editar producto
if (document.querySelector("#frm_edit_product")) {
  let frm_edit_product = document.querySelector("#frm_edit_product");
  frm_edit_product.onsubmit = function (e) {
    e.preventDefault();
    validar_form("actualizar");
  };
}

// Actualizar producto
async function actualizarProducto() {
  const frm_edit_product = document.querySelector("#frm_edit_product");
  const datos = new FormData(frm_edit_product);

  let respuesta = await fetch(
    base_url + "control/productsControl.php?tipo=actualizar",
    {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      body: datos,
    }
  );

  let json = await respuesta.json();

  if (!json.status) {
    alert("Ocurrió un error al actualizar, inténtelo nuevamente");
    console.log(json.msg);
  } else {
    alert(json.msg);
    window.location.href = base_url + "product";
  }
}

// Eliminar producto
async function btn_eliminar(id) {
  if (confirm("¿Estás seguro de eliminar este producto?")) {
    eliminarProducto(id);
  }
}

async function eliminarProducto(id) {
  try {
    const datos = new FormData();
    datos.append("id_producto", id);

    let respuesta = await fetch(
      base_url + "control/productsControl.php?tipo=eliminar",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        body: datos,
      }
    );

    let json = await respuesta.json();

    if (json.status) {
      alert(json.msg);
      view_product();
    } else {
      alert(json.msg);
    }
  } catch (error) {
    console.log("Error al eliminar producto: " + error);
  }
}

// Cargar categorías
async function cargar_categorias() {
  try {
    let respuesta = await fetch(
      base_url + "control/CategoriaControl.php?tipo=ver_categorias",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
      }
    );

    let json = await respuesta.json();
    let contenido = '<option value="">Seleccione</option>';

    if (json.status && json.data) {
      json.data.forEach((categoria) => {
        contenido += `<option value="${categoria.id}">${categoria.nombre}</option>`;
      });
    }
    document.getElementById("id_categoria").innerHTML = contenido;
  } catch (error) {
    console.log("Error cargando categorías:", error);
  }
}

// Cargar proveedores
async function cargar_proveedor() {
  try {
    let respuesta = await fetch(
      base_url + "control/UsuarioController.php?tipo=listar_proveedores",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
      }
    );

    let json = await respuesta.json();
    let contenido = '<option value="">Seleccione</option>';

    if (json.status && json.data) {
      json.data.forEach((proveedor) => {
        contenido += `<option value="${proveedor.id}">${proveedor.razon_social}</option>`;
      });
    }
    document.getElementById("id_proveedor").innerHTML = contenido;
  } catch (error) {
    console.log("Error cargando proveedores:", error);
  }
}

//  LISTAR PRODUCTOS - VISTA CLIENTE

async function listar_productos_venta() {
  try {
    let dato = document.getElementById("busqueda_venta").value;
    const datos = new FormData();
    datos.append("dato", dato);

    let respuesta = await fetch(
      base_url + "control/productsControl.php?tipo=buscar_producto_venta",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        body: datos,
      }
    );
    json = await respuesta.json();
    contenidot = document.getElementById("producto_venta");
    if (json.status) {
      let cont = 1;
      contenidot.innerHTML = ``;
      json.data.forEach((producto) => {
        let product_list = ``;
        product_list += `
            <div class="card m-2 col-12">
                <img src="${
                  base_url + producto.imagen
                }" alt="" width=""100% height="150px">
                <p class="card-text">${producto.nombre}</p>
                <p>Precio:${producto.precio}</p>
                <p>Stock: ${producto.stock}</p>
                <button class="btn btn-primary"
                onclick="agregar_producto_venta(${producto.id})">
                Agregar
              </button>

            </div>`;

        let nueva_fila = document.createElement("div");
        nueva_fila.className = "div col-md-3 col-sm-6 col-xs-12";
        nueva_fila.innerHTML = product_list;
        cont++;
        contenidot.appendChild(nueva_fila);
        let id = document.getElementById("id_producto_venta");
        let precio = document.getElementById("producto_precio_venta");
        let cantidad = document.getElementById("producto_cantidad_venta");

        id.value = producto.id;
        precio.value = producto.precio;
        cantidad.value = 1;
      });
    }
  } catch (e) {
    console.log('Error en mostrar producto' + e);
  }
}
if (document.getElementById('producto_venta')) {
  listar_productos_venta();
}
