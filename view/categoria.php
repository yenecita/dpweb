<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Categorías - Yeny</title>
    <link rel="stylesheet" href="<?php echo BASE_URL; ?>view/bootstrap/css/bootstrap.min.css">
    <script>
        const base_url = '<?php echo BASE_URL; ?>';
    </script>
</head>

<body>

<div class="container mt-4">
    <!-- BOTÓN PARA NUEVA CATEGORÍA -->
    <div class="card-header d-flex justify-content-start align-items-center mb-3">
        <a href="<?= BASE_URL ?>new-categoria" class="btn btn-primary btn-sm">
            <i class="fas fa-list"></i> Nueva +
        </a>
    </div>

    <!-- LISTA DE CATEGORÍAS -->
    <h4 class="mt-4 mb-3">LISTA DE CATEGORÍAS</h4>
    <table class="table table-bordered table-striped">
        <thead style="background-color: #007bff; color: white;">
            <tr class="text-center">
                <th>ID</th>
                <th>Nombre</th>
                <th>Detalle</th>
                <th>Acción</th>
            </tr>
        </thead>
        <tbody id="content_categoria">
            <!-- Aquí se cargan las categorías con JS -->
        </tbody>
    </table>
</div>

<script src="<?= BASE_URL ?>view/function/categoria.js"></script>
<script src="<?php echo BASE_URL; ?>view/bootstrap/js/bootstrap.bundle.min.js"></script>
</body>
</html>
