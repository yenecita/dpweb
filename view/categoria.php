<div class="container">
    <div class="card-header d-flex justify-content-start align-items-center mb-3">
        <a href="<?= BASE_URL ?>new-categoria/registro" class="btn btn-primary btn-sm">
            <i class="fas fa-list"></i> Nueva+
        </a>
    </div>
    <h4 class="mt-3 mb-3">LISTA DE CATEGORIAS</h4>
    <table class="table table-bordered table-striped">
        <thead style="background-color: #007bff; color: white;">
            <tr style="text-align: center;">
                <th style="text-align: center;">ID</th>
                <th style="text-align: center;">Nombre</th>
                <th style="text-align: center;">Detalle</th>
                <th style="text-align: center;">Acción</th>
            </tr>
        </thead>
        <tbody id="content_categoria">

        </tbody>
    </table>
</div>
<script src="<?= BASE_URL ?>view/function/categoria.js"></script>