<div class="container">
    <div class="card-header d-flex justify-content-start align-items-center mb-3">
        <a href="<?= BASE_URL ?>new-products/registro" class="btn btn-primary btn-sm">
            <i class="fas fa-list"></i> Nueva+
        </a>
    </div>
    <h4 class="mt-3 -3mb">LISTA DE PRODUCTOS</h4>
    <table class="table table-bordered table-striped">
        <thead>
            <tr style="color: white; text-align: center;">
                <th style="text-align: center;">ID</th>
                <th style="text-align: center;">Codigo</th>
                <th style="text-align: center;">Nombres</th>
                <th style="text-align: center;">detalle</th>
                <th style="text-align: center;">precio</th>
                <th style="text-align: center;">stock</th>
                <th style="text-align: center;">accion</th>
                
            </tr>
        </thead>
        <tbody id="content_products">
            
        </tbody>
    </table>
</div>
<script src="<?= BASE_URL ?>view/function/products.js"></script>
