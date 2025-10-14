<div class="container">

    <div class="card-header d-flex justify-content-start align-items-center mb-3">
        <a href="<?= BASE_URL ?>new-clients/registro" class="btn btn-primary btn-sm">
            <i class="fas fa-list"></i> Nueva+
        </a>
    </div>
    <h4 class="mt-3 -3mb">LISTA DE CLIENTES </h4>
    <table class="table table-bordered table-striped">
        <thead>
            <tr style="color: white; text-align: center;">
                <th style="text-align: center;">Nro</th>
                <th style="text-align: center;">DNI</th>
                <th style="text-align: center;">Nombres y apellidos</th>
                <th style="text-align: center;">Correo</th>
                <th style="text-align: center;">Rol</th>
                <th style="text-align: center;">Editor</th>
                <th style="text-align: center;">Estado</th>
                <th style="text-align: center;">Acciones</th>
            </tr>
        </thead>
        <tbody id="content_client">
        </tbody>
    </table>
    <script src="<?= BASE_URL ?>view/function/clients.js"></script>
