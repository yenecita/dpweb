<div class="container">

     <div class="card-header d-flex justify-content-start align-items-center mb-3">
        <a href="<?= BASE_URL ?>new-proveedor/registro" class="btn btn-primary btn-sm">
            <i class="fas fa-list"></i> Nueva+
        </a>
    </div>

    <h4 class="mt-3 -3mb">LISTA DE PROVEEDORES</h4>
    <table class="table table-bordered table-striped">
        <thead>
            <tr style="color: white; text-align: center;">
                <th style="text-align: center;">ID</th>
                <th style="text-align: center;">Nro Identidad</th>
                <th style="text-align: center;">Razon Social</th>
                <th style="text-align: center;">Telefono</th>
                <th style="text-align: center;">Correo</th>
                <th style="text-align: center;">Direccion</th>
                <th style="text-align: center;">Estado</th>
                <th style="text-align: center;">Accion</th>

            </tr>
        </thead>
        <tbody id="content_proveedor">
            
        </tbody>
    </table>
</div>
<script src="<?= BASE_URL ?>view/function/proveedor.js"></script>