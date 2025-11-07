
  <!-- Bootstrap CSS (opcional) -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">

  <!-- SweetAlert2 -->
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

  <script>
    // Asegúrate de definir tu variable base_url
    const base_url = "https://yeny.yahtha.com/";
  </script>

</head>
<body class="bg-light">

  <div class="container mt-5">
    <div class="card shadow p-4">
      <h3 class="text-center mb-4">Registro de Proveedor</h3>

      <form id="frm_proveedor">

        <div class="row g-3">
          <div class="col-md-4">
            <label class="form-label">N° Identidad *</label>
            <input type="text" class="form-control" id="nro_identidad" name="nro_identidad" required>
          </div>

          <div class="col-md-8">
            <label class="form-label">Razón Social *</label>
            <input type="text" class="form-control" id="razon_social" name="razon_social" required>
          </div>

          <div class="col-md-4">
            <label class="form-label">Teléfono *</label>
            <input type="text" class="form-control" id="telefono" name="telefono" required>
          </div>

          <div class="col-md-4">
            <label class="form-label">Correo *</label>
            <input type="email" class="form-control" id="correo" name="correo" required>
          </div>

          <div class="col-md-4">
            <label class="form-label">Código Postal *</label>
            <input type="text" class="form-control" id="cod_postal" name="cod_postal" required>
          </div>

          <div class="col-md-4">
            <label class="form-label">Departamento *</label>
            <input type="text" class="form-control" id="departamento" name="departamento" required>
          </div>

          <div class="col-md-4">
            <label class="form-label">Provincia *</label>
            <input type="text" class="form-control" id="provincia" name="provincia" required>
          </div>

          <div class="col-md-4">
            <label class="form-label">Distrito *</label>
            <input type="text" class="form-control" id="distrito" name="distrito" required>
          </div>

          <div class="col-12">
            <label class="form-label">Dirección *</label>
            <input type="text" class="form-control" id="direccion" name="direccion" required>
          </div>

          <div class="col-md-6">
            <label class="form-label">Rol *</label>
            <select class="form-select" id="rol" name="rol" required>
              <option value="">Seleccione un rol</option>
              <option value="proveedor">Proveedor</option>
              <option value="distribuidor">Distribuidor</option>
              <option value="mayorista">Mayorista</option>
            </select>
          </div>

          <div class="col-md-6">
            <label class="form-label">Estado *</label>
            <select class="form-select" id="estado" name="estado" required>
              <option value="">Seleccione estado</option>
              <option value="1">Activo</option>
              <option value="0">Inactivo</option>
            </select>
          </div>
        </div>

        <div class="mt-4 text-center">
          <button type="submit" class="btn btn-success px-4">Registrar</button>
          <a href="<?= BASE_URL ?>proveedor" class="btn btn-secondary px-4">Cancelar</a>
        </div>

      </form>
    </div>
  </div>

  <!-- Archivo JS -->
  <script src="assets/js/proveedor.js"></script>

</body>
</html>
