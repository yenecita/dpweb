<div class="container">
    <div class="card-header d-flex justify-content-start align-items-center mb-3">
        <a href="<?= BASE_URL ?>new-products" class="btn btn-primary btn-sm">
            <i class="fas fa-list"></i> Nueva+
        </a>
    </div>

    <h4 class="mt-3 mb-3">LISTA DE PRODUCTOS</h4>

    <table class="table table-bordered table-striped">
        <thead>
            <tr style="color: white; text-align: center; background-color: #343a40;">
                <th style="text-align: center;">ID</th>
                <th style="text-align: center;">Código</th>
                <th style="text-align: center;">Nombre</th>
                <th style="text-align: center;">Detalle</th>
                <th style="text-align: center;">Precio</th>
                <th style="text-align: center;">Stock</th>
                <th style="text-align: center;">Categoría</th>
                <th style="text-align: center;">Fecha Vencimiento</th>
                <th style="text-align: center;">Proveedor</th>
                <th style="text-align: center;">Imagen</th>
                <th style="text-align: center;">Acción</th>
            </tr>
        </thead>
        <tbody id="content_products">
            <!-- Aquí se cargan los productos dinámicamente con JS -->
        </tbody>
    </table>
</div>

<script src="<?= BASE_URL ?>view/function/products.js"></script>
