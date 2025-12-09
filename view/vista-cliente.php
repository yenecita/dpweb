<div class="container-fluid mt-4 row">
    <h2>NUESTROS PRODUCTOS</h2>
    <div class="col-9">
        <div class="card">
            <div class="card-body row">
                <h5 class="card-title">Busqueda de Productos</h5>

                
                <div class="col-md-6">
                    <input type="text" class="form-control col-md-12"
                        placeholder="buscar productos por nombre o codigó"
                        id="busqueda_venta" onkeyup="listar_productos_venta();">
                        <input type="hidden" id="id_producto_venta">
                        <input type="hidden" id="producto_precio_venta">
                        <input type="hidden" id="producto_cantidad_venta" value="1">
                </div>
                <div class="row container-fluid" id="producto_venta">
                
                </div>
            </div>
        </div>
    </div>
    <div class="col-3">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Lista de Compra</h5>
                <div class="row" style="min-height: 500px;">
                    <div class="col-12">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
                                    <th>Total</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="lista_compra">
                                <!-- Lista dinámica cargada por JS -->
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 text-end">
                        <h4>Subtotal : <label id="subtotal">$0.00</label></h4>
                        <h4>Igv : <label id="igv">$0.00</label></h4>
                        <h4>Total : <label id="total">$0.00</label></h4>
                        <button class="btn btn-success" onclick="realizar_venta()">Realizar Venta</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<?= BASE_URL ?>view/function/products.js"></script>
<script src="<?= BASE_URL ?>view/function/vista-producto.js"></script>
<script>
    let input = document.getElementById("busqueda_venta")
    input.addEventListener('keydown' , (event)=>{
        if (event.key == 'Enter'){
            agregar_producto_temporal();
        }
    })
</script>