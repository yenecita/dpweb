<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Catálogo de Productos</title>
  
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

  <div class="container py-5">
    <h1 class="text-center mb-5">Catálogo de Productos</h1>

    <div id="carouselExampleInterval" class="carousel slide mb-5 shadow-sm rounded-3 overflow-hidden" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active" data-bs-interval="200">
      <img src="img1" class="d-block w-100" alt="Auriculares Bluetooth">
      <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
        <h5>Auriculares Bluetooth</h5>
        <p>Sonido premium con cancelación de ruido</p>
      </div>
    </div>
    <div class="carousel-item" data-bs-interval="200">
      <img src="img2" class="d-block w-100" alt="Silla Ergonómica">
      <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
        <h5>Silla Ergonómica</h5>
        <p>Comodidad y soporte durante todo el día</p>
      </div>
    </div>
    <div class="carousel-item" data-bs-interval="200">
      <img src="" class="d-block w-100" alt="Teclado Mecánico RGB">
      <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
        <h5>Teclado Mecánico RGB</h5>
        <p>Diseñado para gamers y profesionales</p>
      </div>
    </div>
  </div>

  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Anterior</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Siguiente</span>
  </button>
</div>


    <div class="row g-4">
      <!-- Producto 1 -->
      <div class="col-md-3">
        <div class="card h-100 shadow-sm">
          <img src="https://via.placeholder.com/400x250?text=Auriculares" class="card-img-top" alt="Producto 1">
          <div class="card-body">
            <h5 class="card-title">Auriculares Bluetooth</h5>
            <p class="text-muted mb-1">Categoría: Electrónica</p>
            <p class="fw-bold text-success">$120.00</p>
          </div>
          <div class="card-footer bg-white border-0 d-flex justify-content-between">
            <a href="#" class="btn btn-outline-primary btn-sm">Ver</a>
            <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#detalle1">Detalle</button>
          </div>
        </div>
      </div>

      <!-- Producto 2 -->
      <div class="col-md-3">
        <div class="card h-100 shadow-sm">
          <img src="https://via.placeholder.com/400x250?text=Lámpara" class="card-img-top" alt="Producto 2">
          <div class="card-body">
            <h5 class="card-title">Lámpara de Mesa LED</h5>
            <p class="text-muted mb-1">Categoría: Hogar</p>
            <p class="fw-bold text-success">$75.00</p>
          </div>
          <div class="card-footer bg-white border-0 d-flex justify-content-between">
            <a href="#" class="btn btn-outline-primary btn-sm">Ver</a>
            <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#detalle2">Detalle</button>
          </div>
        </div>
      </div>

      <!-- Producto 3 -->
      <div class="col-md-3">
        <div class="card h-100 shadow-sm">
          <img src="https://via.placeholder.com/400x250?text=Camisa" class="card-img-top" alt="Producto 3">
          <div class="card-body">
            <h5 class="card-title">Camisa de Algodón</h5>
            <p class="text-muted mb-1">Categoría: Ropa</p>
            <p class="fw-bold text-success">$49.99</p>
          </div>
          <div class="card-footer bg-white border-0 d-flex justify-content-between">
            <a href="#" class="btn btn-outline-primary btn-sm">Ver</a>
            <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#detalle3">Detalle</button>
          </div>
        </div>
      </div>

      <!-- Producto 4 -->
      <div class="col-md-3">
        <div class="card h-100 shadow-sm">
          <img src="https://via.placeholder.com/400x250?text=Teclado" class="card-img-top" alt="Producto 4">
          <div class="card-body">
            <h5 class="card-title">Teclado Mecánico RGB</h5>
            <p class="text-muted mb-1">Categoría: Electrónica</p>
            <p class="fw-bold text-success">$89.99</p>
          </div>
          <div class="card-footer bg-white border-0 d-flex justify-content-between">
            <a href="#" class="btn btn-outline-primary btn-sm">Ver</a>
            <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#detalle4">Detalle</button>
          </div>
        </div>
      </div>

      <!-- Producto 5 -->
      <div class="col-md-3">
        <div class="card h-100 shadow-sm">
          <img src="https://via.placeholder.com/400x250?text=Silla" class="card-img-top" alt="Producto 5">
          <div class="card-body">
            <h5 class="card-title">Silla Ergonómica</h5>
            <p class="text-muted mb-1">Categoría: Oficina</p>
            <p class="fw-bold text-success">$199.00</p>
          </div>
          <div class="card-footer bg-white border-0 d-flex justify-content-between">
            <a href="#" class="btn btn-outline-primary btn-sm">Ver</a>
            <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#detalle5">Detalle</button>
          </div>
        </div>
      </div>

      <!-- Producto 6 -->
      <div class="col-md-3">
        <div class="card h-100 shadow-sm">
          <img src="https://via.placeholder.com/400x250?text=Reloj" class="card-img-top" alt="Producto 6">
          <div class="card-body">
            <h5 class="card-title">Reloj Deportivo</h5>
            <p class="text-muted mb-1">Categoría: Accesorios</p>
            <p class="fw-bold text-success">$59.00</p>
          </div>
          <div class="card-footer bg-white border-0 d-flex justify-content-between">
            <a href="#" class="btn btn-outline-primary btn-sm">Ver</a>
            <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#detalle6">Detalle</button>
          </div>
        </div>
      </div>

      <!-- Producto 7 -->
      <div class="col-md-3">
        <div class="card h-100 shadow-sm">
          <img src="..." class="card-img-top" alt="Producto 7">
          <div class="card-body">
            <h5 class="card-title">Reloj Deportivo</h5>
            <p class="text-muted mb-1">Categoría: Accesorios</p>
            <p class="fw-bold text-success">$59.00</p>
          </div>
          <div class="card-footer bg-white border-0 d-flex justify-content-between">
            <a href="#" class="btn btn-outline-primary btn-sm">Ver</a>
            <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#detalle6">Detalle</button>
          </div>
        </div>
      </div>

      <!-- Producto 8 -->
      <div class="col-md-3">
        <div class="card h-100 shadow-sm">
          <img src="https://via.placeholder.com/400x250?text=Reloj" class="card-img-top" alt="Producto 8">
          <div class="card-body">
            <h5 class="card-title">Reloj Deportivo</h5>
            <p class="text-muted mb-1">Categoría: Accesorios</p>
            <p class="fw-bold text-success">$59.00</p>
          </div>
          <div class="card-footer bg-white border-0 d-flex justify-content-between">
            <a href="#" class="btn btn-outline-primary btn-sm">Ver</a>
            <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#detalle6">Detalle</button>
          </div>
        </div>
      </div>

      <!-- Producto 9 -->
      <div class="col-md-3">
        <div class="card h-100 shadow-sm">
          <img src="https://via.placeholder.com/400x250?text=Reloj" class="card-img-top" alt="Producto 9">
          <div class="card-body">
            <h5 class="card-title">Reloj Deportivo</h5>
            <p class="text-muted mb-1">Categoría: Accesorios</p>
            <p class="fw-bold text-success">$59.00</p>
          </div>
          <div class="card-footer bg-white border-0 d-flex justify-content-between">
            <a href="#" class="btn btn-outline-primary btn-sm">Ver</a>
            <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#detalle6">Detalle</button>
          </div>
        </div>
      </div>

      <!-- Producto 10 -->
      <div class="col-md-3">
        <div class="card h-100 shadow-sm">
          <img src="https://via.placeholder.com/400x250?text=Reloj" class="card-img-top" alt="Producto 10">
          <div class="card-body">
            <h5 class="card-title">Reloj Deportivo</h5>
            <p class="text-muted mb-1">Categoría: Accesorios</p>
            <p class="fw-bold text-success">$59.00</p>
          </div>
          <div class="card-footer bg-white border-0 d-flex justify-content-between">
            <a href="#" class="btn btn-outline-primary btn-sm">Ver</a>
            <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#detalle6">Detalle</button>
          </div>
        </div>
      </div>

      <!-- Producto 11 -->
      <div class="col-md-3">
        <div class="card h-100 shadow-sm">
          <img src="https://via.placeholder.com/400x250?text=Reloj" class="card-img-top" alt="Producto 11">
          <div class="card-body">
            <h5 class="card-title">Reloj Deportivo</h5>
            <p class="text-muted mb-1">Categoría: Accesorios</p>
            <p class="fw-bold text-success">$59.00</p>
          </div>
          <div class="card-footer bg-white border-0 d-flex justify-content-between">
            <a href="#" class="btn btn-outline-primary btn-sm">Ver</a>
            <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#detalle6">Detalle</button>
          </div>
        </div>
      </div>

      <!-- Producto 12 -->
      <div class="col-md-3">
        <div class="card h-100 shadow-sm">
          <img src="https://via.placeholder.com/400x250?text=Reloj" class="card-img-top" alt="Producto 12">
          <div class="card-body">
            <h5 class="card-title">Reloj Deportivo</h5>
            <p class="text-muted mb-1">Categoría: Accesorios</p>
            <p class="fw-bold text-success">$59.00</p>
          </div>
          <div class="card-footer bg-white border-0 d-flex justify-content-between">
            <a href="#" class="btn btn-outline-primary btn-sm">Ver</a>
            <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#detalle6">Detalle</button>
          </div>
        </div>
      </div>

      <!-- Producto 13 -->
      <div class="col-md-3">
        <div class="card h-100 shadow-sm">
          <img src="https://via.placeholder.com/400x250?text=Reloj" class="card-img-top" alt="Producto 13">
          <div class="card-body">
            <h5 class="card-title">Reloj Deportivo</h5>
            <p class="text-muted mb-1">Categoría: Accesorios</p>
            <p class="fw-bold text-success">$59.00</p>
          </div>
          <div class="card-footer bg-white border-0 d-flex justify-content-between">
            <a href="#" class="btn btn-outline-primary btn-sm">Ver</a>
            <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#detalle6">Detalle</button>
          </div>
        </div>
      </div>

      <!-- Producto 14 -->
      <div class="col-md-3">
        <div class="card h-100 shadow-sm">
          <img src="https://via.placeholder.com/400x250?text=Reloj" class="card-img-top" alt="Producto 14">
          <div class="card-body">
            <h5 class="card-title">Reloj Deportivo</h5>
            <p class="text-muted mb-1">Categoría: Accesorios</p>
            <p class="fw-bold text-success">$59.00</p>
          </div>
          <div class="card-footer bg-white border-0 d-flex justify-content-between">
            <a href="#" class="btn btn-outline-primary btn-sm">Ver</a>
            <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#detalle6">Detalle</button>
          </div>
        </div>
      </div>

      <!-- Producto 15 -->
      <div class="col-md-3">
        <div class="card h-100 shadow-sm">
          <img src="https://via.placeholder.com/400x250?text=Reloj" class="card-img-top" alt="Producto 15">
          <div class="card-body">
            <h5 class="card-title">Reloj Deportivo</h5>
            <p class="text-muted mb-1">Categoría: Accesorios</p>
            <p class="fw-bold text-success">$59.00</p>
          </div>
          <div class="card-footer bg-white border-0 d-flex justify-content-between">
            <a href="#" class="btn btn-outline-primary btn-sm">Ver</a>
            <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#detalle6">Detalle</button>
          </div>
        </div>
      </div>

      <!-- Producto 16 -->
      <div class="col-md-3">
        <div class="card h-100 shadow-sm">
          <img src="https://via.placeholder.com/400x250?text=Reloj" class="card-img-top" alt="Producto 16">
          <div class="card-body">
            <h5 class="card-title">Reloj Deportivo</h5>
            <p class="text-muted mb-1">Categoría: Accesorios</p>
            <p class="fw-bold text-success">$59.00</p>
          </div>
          <div class="card-footer bg-white border-0 d-flex justify-content-between">
            <a href="#" class="btn btn-outline-primary btn-sm">Ver</a>
            <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#detalle6">Detalle</button>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- MODALES DETALLE -->
  <div class="modal fade" id="detalle1" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Auriculares Bluetooth</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body text-center">
          <img src="https://via.placeholder.com/400x250?text=Auriculares" class="img-fluid mb-3" alt="Auriculares">
          <p><strong>Categoría:</strong> Electrónica</p>
          <p><strong>Precio:</strong> $120.00</p>
          <p>Con cancelación de ruido y batería de larga duración. Perfectos para trabajar o hacer ejercicio.</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          <button class="btn btn-success">Agregar al carrito</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="detalle2" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Lámpara de Mesa LED</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body text-center">
          <img src="https://via.placeholder.com/400x250?text=Lámpara" class="img-fluid mb-3" alt="Lámpara">
          <p><strong>Categoría:</strong> Hogar</p>
          <p><strong>Precio:</strong> $75.00</p>
          <p>Diseño moderno y luz cálida. Ideal para el dormitorio o la oficina.</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          <button class="btn btn-success">Agregar al carrito</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="detalle3" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Camisa de Algodón</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body text-center">
          <img src="https://via.placeholder.com/400x250?text=Camisa" class="img-fluid mb-3" alt="Camisa">
          <p><strong>Categoría:</strong> Ropa</p>
          <p><strong>Precio:</strong> $49.99</p>
          <p>Camisa fresca y ligera, ideal para cualquier ocasión. Disponible en varias tallas y colores.</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          <button class="btn btn-success">Agregar al carrito</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="detalle4" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Teclado Mecánico RGB</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body text-center">
          <img src="https://via.placeholder.com/400x250?text=Teclado" class="img-fluid mb-3" alt="Teclado">
          <p><strong>Categoría:</strong> Electrónica</p>
          <p><strong>Precio:</strong> $89.99</p>
          <p>Teclado gamer con retroiluminación RGB, switches mecánicos y diseño ergonómico.</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          <button class="btn btn-success">Agregar al carrito</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="detalle5" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Silla Ergonómica</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body text-center">
          <img src="https://via.placeholder.com/400x250?text=Silla" class="img-fluid mb-3" alt="Silla">
          <p><strong>Categoría:</strong> Oficina</p>
          <p><strong>Precio:</strong> $199.00</p>
          <p>Diseñada para largas horas de trabajo, con soporte lumbar y materiales de alta calidad.</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          <button class="btn btn-success">Agregar al carrito</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="detalle6" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Reloj Deportivo</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body text-center">
          <img src="https://via.placeholder.com/400x250?text=Reloj" class="img-fluid mb-3" alt="Reloj">
          <p><strong>Categoría:</strong> Accesorios</p>
          <p><strong>Precio:</strong> $59.00</p>
          <p>Resistente al agua, con cronómetro y correa ajustable. Ideal para actividades deportivas.</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          <button class="btn btn-success">Agregar al carrito</button>
        </div>
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
