<!-- INICIO DE CUERPO DE PAGINA -->
<div class="container-fluid">
    <div class="card">
        <h5 class="card-header">REGISTRO DE PROVEEDOR</h5>
        <form id="frm_proveedor" action="" method="POST" enctype="multipart/form-data">
            <div class="card-body">

                <div class="mb-3 row">
                    <label for="nro_identidad" class="col-sm-4 col-form-label">Nro Identidad:</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="nro_identidad" name="nro_identidad" required>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="razon_social" class="col-sm-4 col-form-label">Razon Social:</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="razon_social" name="razon_social" required>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="telefono" class="col-sm-4 col-form-label">Telefono:</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="telefono" name="telefono" required>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="correo" class="col-sm-4 col-form-label">Correo:</label>
                    <div class="col-sm-8">
                        <input type="email" class="form-control" id="correo" name="correo" required>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="departamento" class="col-sm-4 col-form-label">Departamento:</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="departamento" name="departamento" required>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="provincia" class="col-sm-4 col-form-label">Provincia:</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="provincia" name="provincia" required>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="distrito" class="col-sm-4 col-form-label">Distrito:</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="distrito" name="distrito" required>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="cod_postal" class="col-sm-4 col-form-label">Cod Postal:</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="cod_postal" name="cod_postal" required>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="direccion" class="col-sm-4 col-form-label">Direccion:</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="direccion" name="direccion" required>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="rol" class="col-sm-4 col-form-label">Rol:</label>
                    <div class="col-sm-8">
                        <select class="form-control" name="rol" id="rol" required>
                            <option value="" disabled selected>Seleccione</option>
                            <option value="proveedor">Proveedor</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="mt-3">
                <button type="submit" class="btn btn-success">Registrar</button>
                <button type="reset" class="btn btn-info">Limpiar</button>
                <a href="<?= BASE_URL ?>proveedor" class="btn btn-danger">Cancelar</a>
            </div>

        </form>
    </div>
</div>
<!-- FIN DE CUERPO DE PAGINA -->

<script src="<?php echo BASE_URL; ?>view/function/proveedor.js"></script>


<script>
    // No need for cargar_categorias or cargar_proveedor here as it's for registering a new provider
</script>
