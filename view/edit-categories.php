<div class="container-fluid">
    <div class="card">
        <h5 class="card-header">EDITAR LA CATEGORÍA</h5>
        <form id="frm_edit_categories" action="" method="POST">
            <div class="card-body">
                <input type="hidden" id="id_categoria" name="id_categoria">
                <div class="mb-3 row">
                    <label class="col-sm-4 col-form-label">Nombre:</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="nombre" name="nombre" required>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label class="col-sm-4 col-form-label">Detalle:</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="detalle" name="detalle" required>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <button type="submit" class="btn btn-success">Actualizar</button>
                <a href="<?php echo BASE_URL; ?>categorias" class="btn btn-danger">Cancelar</a>
            </div>
        </form>
    </div>
</div>
<script src="<?php echo BASE_URL; ?>view/function/categoria.js"></script>
<script>
    // Obtener el ID de la categoría desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const id_categoria = urlParams.get('id');
    if (id_categoria) {
        document.getElementById('id_categoria').value = id_categoria;
        edit_categories();
    }
</script>
