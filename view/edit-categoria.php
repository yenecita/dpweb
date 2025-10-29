<?php require_once("include/header.php"); ?>
<body>

    <!-- INICIO DE CUERPO DE PAGINA -->
    <div class="container-fluid">
        <div class="card">
            <h5 class="card-header">EDITAR LA CATEGORÍA</h5>
            <form id="frm_edit_categoria" action="" method="">
                <div class="card-body">
                    <div class="mb-3 row"><label class="col-sm-4 col-form-label">nombre:</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="nombre" name="nombre" required>
                        </div>
                    </div>
                    <div class="mb-3 row"><label class="col-sm-4 col-form-label">detalle:</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="detalle" name="detalle" required>
                        </div>
                    </div>
                    <input type="hidden" id="id_categoria" name="id_categoria" value="<?php echo $_GET['id'] ?? ''; ?>">
                    <div class="card-body">
                        <button type="submit" class="btn btn-success">Actualizar</button>
                        <a href="<?= BASE_URL ?>categoria" class="btn btn-danger">Cancelar</a>
                    </div>
            </form>
        </div>
    </div>
    <!-- FIN DE CUERPO DE PAGINA -->
</body>
<script src="<?php echo BASE_URL; ?>view/function/categoria.js"></script>
<script>
   edit_categoria()
</script>

</html>
