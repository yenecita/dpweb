
    <!-- INICIO DE CUERPO DE PAGINA -->
    <div class="container-fluid">
        <div class="card">
            <h5 class="card-header">REGISTRO DE USUARIO

            </h5>
            <form id="frm_user" action="" method="">
                <div class="card-body">
                    <div class="mb-3 row">
                        <label for="nro_identidad" class="col-sm-4 col-form-label">nro_identidad:</label>
                        <div class="col-sm-8">
                            <input type="number" class="form-control" id="nro_identidad" name="nro_identidad" required>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="mb-3 row">
                        <label for="razon_social" class="col-sm-4 col-form-label">razon_social :</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="razon_social" name="razon_social" required>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="mb-3 row">
                        <label for="telefono" class="col-sm-4 col-form-label">telefono:</label>
                        <div class="col-sm-8">
                            <input type="number" class="form-control" id="telefono" name="telefono" required>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="mb-3 row">
                        <label for="correo" class="col-sm-4 col-form-label">correo:</label>
                        <div class="col-sm-8">
                            <input type="email" class="form-control" id="correo" name="correo" required>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="mb-3 row">
                        <label for="departamento" class="col-sm-4 col-form-label">departamento:</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="departamento" name="departamento" required>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="mb-3 row">
                        <label for="provincia" class="col-sm-4 col-form-label">provincia:</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="provincia" name="provincia" required>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="mb-3 row">
                        <label for="distrito" class="col-sm-4 col-form-label">distrito:</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="distrito" name="distrito" required>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="mb-3 row">
                        <label for="cod_postal" class="col-sm-4 col-form-label">cod_postal:</label>
                        <div class="col-sm-8">
                            <input type="number" class="form-control" id="cod_postal" name="cod_postal" required>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="mb-3 row">
                        <label for="direccion" class="col-sm-4 col-form-label">direccion:</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="direccion" name="direccion" required>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="mb-3 row">
                        <label for="rol" class="col-sm-4 col-form-label">rol:</label>
                        <div class="col-sm-8">
                            <select class="form-control" name="rol" id="rol" required>
                                <option value="" disable selected>Seleccione</option>
                                <option value="vendedor">vendedor</option>
                                <option value="administrador">administrador</option>
                                <option value="cliente">cliente</option>
                                <option value="proveedor">proveedor</option>
                                <option value="Usuario">Usuario</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-success">Registrar</button>
                    <button type="reset" class="btn btn-info">Limpiar</button>
                    <button type="button" class="btn btn-danger">Cancelar</button>
            </form>
        </div>
    </div>
    <!-- FIN DE CUERPO DE PAGINA -->

<script src="<?php echo BASE_URL; ?>view/function/user.js"></script>