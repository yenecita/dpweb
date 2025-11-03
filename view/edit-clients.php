<!-- INICIO DE CUERPO DE PÁGINA -->
<div class="container-fluid">
    <div class="card">
        <h5 class="card-header">EDITAR DATOS DEL CLIENTE</h5>

        <?php
        if (isset($_GET["views"])) {
            $ruta = explode("/", $_GET["views"]);
            $id = $ruta[1] ?? '';
        } else {
            $id = $_GET['id'] ?? '';
        }
        ?>

        <form id="frm_edit_client" action="" method="POST">
            <input type="hidden" id="id_persona" name="id_persona" value="<?php echo $id; ?>">

            <div class="card-body">
                <div class="mb-3 row">
                    <label for="nro_identidad" class="col-sm-4 col-form-label">Nro. Documento:</label>
                    <div class="col-sm-8">
                        <input type="number" class="form-control" id="nro_identidad" name="nro_identidad" required>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="razon_social" class="col-sm-4 col-form-label">Razón Social:</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="razon_social" name="razon_social" required>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="telefono" class="col-sm-4 col-form-label">Teléfono:</label>
                    <div class="col-sm-8">
                        <input type="number" class="form-control" id="telefono" name="telefono" required>
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
                    <label for="cod_postal" class="col-sm-4 col-form-label">Código Postal:</label>
                    <div class="col-sm-8">
                        <input type="number" class="form-control" id="cod_postal" name="cod_postal" required>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="direccion" class="col-sm-4 col-form-label">Dirección:</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="direccion" name="direccion" required>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="rol" class="col-sm-4 col-form-label">Rol:</label>
                    <div class="col-sm-8">
                        <select class="form-control" name="rol" id="rol" required readonly>
                            <option value="clients">Clients</option>
                        </select>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="estado" class="col-sm-4 col-form-label">Estado:</label>
                    <div class="col-sm-8">
                        <select class="form-control" name="estado" id="estado" required>
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                        </select>
                    </div>
                </div>

            </div>

            <div class="card-footer">
                <button type="submit" class="btn btn-success">Actualizar</button>
                <a href="<?= BASE_URL ?>clients" class="btn btn-danger">Cancelar</a>
            </div>
        </form>
    </div>
</div>
<!-- FIN DE CUERPO DE PÁGINA -->

<script src="<?php echo BASE_URL; ?>view/function/clients.js"></script>
<script>
    edit_client();
</script>
