<div class="container">

    <div class="card-header d-flex justify-content-start align-items-center mb-3">
        <a href="<?= BASE_URL ?>new-user" class="btn btn-primary btn-sm">
            <i class="fas fa-list"></i> Nueva+
        </a>
    </div>

    <h4 class="mt-3 mb-3">LISTA DE USUARIOS</h4>

    <table class="table table-bordered table-striped">
        <thead>
            <tr style="color: white; text-align: center; background-color: #343a40;">
                <th style="text-align: center;">Nro</th>
                <th style="text-align: center;">DNI</th>
                <th style="text-align: center;">Nombres y Apellidos</th>
                <th style="text-align: center;">Correo</th>
                <th style="text-align: center;">Rol</th>
                <th style="text-align: center;">Estado</th>
                <th style="text-align: center;">Acciones</th>
            </tr>
        </thead>
        <tbody id="content_users">
            <!-- Contenido dinámico cargado por user.js -->
        </tbody>
    </table>

    <!--
    <div id="userDetails" style="display:none; margin-top: 20px;">
        <h5>Detalles del Usuario</h5>
        <p><strong>Nro:</strong> <span id="detailNro"></span></p>
        <p><strong>DNI:</strong> <span id="detailDNI"></span></p>
        <p><strong>Nombre:</strong> <span id="detailNombre"></span></p>
        <p><strong>Correo:</strong> <span id="detailCorreo"></span></p>
        <p><strong>Rol:</strong> <span id="detailRol"></span></p>
        <p><strong>Estado:</strong> <span id="detailEstado"></span></p>
        <button onclick="hideDetails()">Cerrar</button>
        <button onclick="redirectEdit()">Editar Usuario</button>
    </div>
    -->
</div>

<script src="<?= BASE_URL ?>view/function/user.js"></script>
