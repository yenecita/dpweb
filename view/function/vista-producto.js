// Mostrar productos con Bootstrap puro
async function view_product() {
    try {
        const respuesta = await fetch(base_url + 'control/productsControl.php?tipo=ver_productos', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache'
        });

        if (!respuesta.ok) throw new Error("Respuesta no válida del servidor");
        const json = await respuesta.json();

        const container = document.getElementById('content_products');
        container.innerHTML = '';

        if (json.status && json.data && json.data.length > 0) {
            const cards = await Promise.all(json.data.map(async (product) => {
                let imgSrc = product.imagen
                    ? base_url + product.imagen
                    : 'https://via.placeholder.com/400x300?text=Sin+Imagen';

                return `
                <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="card h-100 border-0 shadow-sm">
                        <img src="${imgSrc}" class="card-img-top" alt="${product.nombre}" style="height:200px; object-fit:cover;">
                        <div class="card-body d-flex flex-column">
                            <h6 class="card-title text-truncate fw-semibold">${product.nombre || 'Sin nombre'}</h6>
                            <p class="text-muted small mb-1">${product.categoria || 'Sin categoría'}</p>
                            <p class="mb-1"><strong>Precio:</strong> $${product.precio || 0}</p>
                            <p class="mb-3"><strong>Stock:</strong> ${product.stock || 0}</p>
                            <div class="mt-auto d-flex gap-2">
                                <button onclick="verProducto(${product.id});" class="btn btn-primary btn-sm w-50">
                                    <i class="fas fa-eye"></i> Ver
                                </button>
                                <button onclick="detalleProducto(${product.id});" class="btn btn-success btn-sm w-50">
                                    <i class="fas fa-info-circle"></i> Detalle
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`;
            }));

            container.innerHTML = cards.join('');
        } else {
            container.innerHTML = `
                <div class="col-12 text-center text-muted py-5">
                    <i class="fas fa-box-open fa-3x mb-3"></i><br>
                    <p>No hay productos disponibles</p>
                </div>`;
        }
    } catch (error) {
        console.error("Error al obtener productos:", error);
        document.getElementById('content_products').innerHTML =
            '<div class="col-12 text-center text-danger">Error al cargar los productos</div>';
    }
}
if (document.getElementById('content_products')) view_product();

// Mostrar imagen con Swal
async function verProducto(id) {
    try {
        const res = await fetch(base_url + 'control/productsControl.php?tipo=ver_productos', {
            method: 'POST'
        });
        const json = await res.json();
        const producto = json.data.find(p => p.id == id);

        if (!producto) return Swal.fire('Error', 'Producto no encontrado', 'error');

        const imgSrc = producto.imagen
            ? base_url + producto.imagen
            : 'https://via.placeholder.com/500x400?text=Sin+Imagen';

        Swal.fire({
            title: producto.nombre || 'Producto',
            html: `<img src="${imgSrc}" alt="${producto.nombre}" 
                     class="img-fluid rounded shadow-sm" 
                     style="max-height:400px; object-fit:cover;">`,
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#0d6efd',
            width: 600,
            background: '#fff'
        });
    } catch (error) {
        console.error(error);
    }
}

// Mostrar detalles con Swal
async function detalleProducto(id) {
    try {
        const res = await fetch(base_url + 'control/productsControl.php?tipo=ver_productos', {
            method: 'POST'
        });
        const json = await res.json();
        const producto = json.data.find(p => p.id == id);

        if (!producto) return Swal.fire('Error', 'No se encontró el producto', 'error');

        const html = `
            <div class="text-start">
                <p><strong>Nombre:</strong> ${producto.nombre}</p>
                <p><strong>Categoría:</strong> ${producto.categoria}</p>
                <p><strong>Precio:</strong> $${producto.precio}</p>
                <p><strong>Stock:</strong> ${producto.stock}</p>
                <p><strong>Fecha vencimiento:</strong> ${producto.fecha_vencimiento || 'No especificada'}</p>
                <p><strong>Detalle:</strong> ${producto.detalle || 'Sin detalle disponible'}</p>
            </div>`;

        Swal.fire({
            title: 'Detalle del Producto',
            html: html,
            icon: 'info',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#198754',
            width: 550
        });
    } catch (error) {
        console.error(error);
    }
}
