<div class="container">
    <div class="card-header d-flex justify-content-start align-items-center mb-3">
        <a href="<?php echo BASE_URL; ?>new-proveedor" class="btn btn-primary btn-sm">
            <i class="fas fa-list"></i> Nueva+
        </a>
        
    </div>

    <h4 class="mt-3 mb-3">LISTA DE PROVEEDORES</h4>

    <table class="table table-bordered table-striped">
        <thead>
            <tr style="color: white; text-align: center; background-color: #343a40;">
                <th style="text-align: center;">ID</th>
                <th style="text-align: center;">Nro Identidad</th>
                <th style="text-align: center;">Razón Social</th>
                <th style="text-align: center;">Teléfono</th>
                <th style="text-align: center;">Correo</th>
                <th style="text-align: center;">Dirección</th>
                <th style="text-align: center;">Estado</th>
                <th style="text-align: center;">Acción</th>
            </tr>
        </thead>
        <tbody id="content_proveedor">
            <!-- Contenido dinámico cargado por proveedor.js -->
        </tbody>
    </table>
</div>

<script src="<?= BASE_URL ?>view/function/proveedor.js"></script>
