<div class="container mt-4">

    <!-- Botón para registrar un nuevo cliente -->
    <div class="card-header d-flex justify-content-start align-items-center mb-3">
        <a href="<?= BASE_URL ?>new-clients/registro" class="btn btn-primary btn-sm">
            <i class="fas fa-list"></i> Nuevo +
        </a>
    </div>

    <h4 class="mt-3 mb-3">LISTA DE CLIENTES</h4>

    <table class="table table-bordered table-striped">
        <thead style="background-color: #007bff; color: white;">
            <tr style="text-align: center;">
                <th>Nro</th>
                <th>DNI</th>
                <th>Razón Social / Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>
        </thead>

        <tbody id="content_clients">
            <!-- Aquí se llenarán los clientes mediante JS -->
        </tbody>
    </table>

    <!-- Script de funciones -->
    <script src="<?= BASE_URL ?>view/function/clients.js"></script>

</div>
