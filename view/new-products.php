<!-- INICIO DE CUERPO DE PAGINA -->
<div class="container-fluid">
    <div class="card">
        <h5 class="card-header">REGISTRO DE PRODUCTO</h5>
        <form id="frm_products" action="" method="POST" enctype="multipart/form-data">
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

                <div class="card-body">
                    <div class="mb-3 row">
                        <label for="id_categoria" class="col-sm-4 col-form-label">Categoría:</label>
                        <div class="col-sm-8">
                            <select class="form-control" name="id_categoria" id="id_categoria" required>
                                <option value="" disable selected>Seleccione</option>
                            </select>
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label for="fecha_vencimiento" class="col-sm-4 col-form-label">Fecha Vencimiento:</label>
                        <div class="col-sm-8">
                            <input type="date" class="form-control" id="fecha_vencimiento" name="fecha_vencimiento" required>
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label for="imagen" class="col-sm-4 col-form-label">Imagen:</label>
                        <div class="col-sm-8">
                            <input type="file" class="form-control" id="imagen" name="imagen" accept=".jpg, .jpeg, .png" required>
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label for="id_proveedor" class="col-sm-4 col-form-label">Proveedor:</label>
                        <div class="col-sm-8">
                            <select class="form-control" name="id_proveedor" id="id_proveedor" required>
                                <option value="">Seleccione</option>
                                <option value="proveedor">proveedor</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="mt-3">
                    <button type="submit" class="btn btn-success">Registrar</button>
                    <button type="reset" class="btn btn-info">Limpiar</button>
                    <a href="<?= BASE_URL ?>category" class="btn btn-danger">Cancelar</a>
                </div>

        </form>
    </div>
</div>
<!-- FIN DE CUERPO DE PAGINA -->

<script src="<?php echo BASE_URL; ?>view/function/products.js"></script>


<script>
    cargar_categorias();
    cargar_proveedor();
</script>