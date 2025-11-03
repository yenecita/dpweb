<!-- INICIO DE CUERPO DE PÁGINA -->
<div class="container-fluid">
    <div class="card">
        <h5 class="card-header">EDITAR DATOS DE PRODUCTOS</h5>

        <form id="frm_edit_product" action="" method="POST" enctype="multipart/form-data">
            <input type="hidden" id="id_producto" name="id_producto" value="<?php echo $_GET['id'] ?? ''; ?>">

            <div class="card-body">
                <div class="mb-3 row">
                    <label for="codigo" class="col-sm-4 col-form-label">Código:</label>
                    <div class="col-sm-8">
                        <input type="number" class="form-control" id="codigo" name="codigo" required>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="nombre" class="col-sm-4 col-form-label">Nombre:</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="nombre" name="nombre" required>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="detalle" class="col-sm-4 col-form-label">Detalle:</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="detalle" name="detalle" required>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="precio" class="col-sm-4 col-form-label">Precio:</label>
                    <div class="col-sm-8">
                        <input type="number" step="0.01" class="form-control" id="precio" name="precio" required>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="stock" class="col-sm-4 col-form-label">Stock:</label>
                    <div class="col-sm-8">
                        <input type="number" class="form-control" id="stock" name="stock" required>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="id_categoria" class="col-sm-4 col-form-label">Categoría:</label>
                    <div class="col-sm-8">
                        <select class="form-control" name="id_categoria" id="id_categoria" required>
                            <option value="">Seleccione</option>
                        </select>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="fecha_vencimiento" class="col-sm-4 col-form-label">Fecha de vencimiento:</label>
                    <div class="col-sm-8">
                        <input type="date" class="form-control" id="fecha_vencimiento" name="fecha_vencimiento" required>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="imagen" class="col-sm-4 col-form-label">Imagen:</label>
                    <div class="col-sm-8">
                        <div id="current_image_preview" style="margin-bottom: 10px;"></div>
                        <input type="file" class="form-control" id="imagen" name="imagen" accept=".jpg, .jpeg, .png">
                        <small class="form-text text-muted">Deja vacío para mantener la imagen actual</small>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="id_proveedor" class="col-sm-4 col-form-label">Proveedor:</label>
                    <div class="col-sm-8">
                        <select class="form-control" name="id_proveedor" id="id_proveedor" required>
                            <option value="">Seleccione</option>
                        </select>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="estado" class="col-sm-4 col-form-label">Estado:</label>
                    <div class="col-sm-8">
                        <select class="form-control" name="estado" id="estado" required>
                            <option value="1">Activo</option>
                            <option value="0">Inactivo</option>
                        </select>
                    </div>
                </div>

                <div class="mt-3 text-end">
                    <button type="submit" class="btn btn-success">Actualizar</button>
                    <a href="<?= BASE_URL ?>product" class="btn btn-danger">Cancelar</a>
                </div>
            </div>
        </form>
    </div>
</div>
<!-- FIN DE CUERPO DE PÁGINA -->

<script src="<?php echo BASE_URL; ?>view/function/products.js"></script>
<script>
    async function initEdit() {
        await cargar_categorias();
        await cargar_proveedor();
        await edit_product();
    }
    initEdit();
</script>
