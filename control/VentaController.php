<?php
require_once("../model/VentaModel.php");
require_once("../model/ProductsModel.php");

$objProducto = new ProductsModel();
$objVenta = new VentaModel();

$tipo = $_GET['tipo'];

if ($tipo == "registrarTemporal") {
    $respuesta = array('status' => false, 'msg' => 'fallo el controlador');
    $id_producto = $_POST['id_producto'];
    $precio = $_POST['precio'];
    $cantidad = $_POST['cantidad'];

    $b_producto = $objVenta->buscarTemporal($id_producto);
    if ($b_producto) {
        $n_cantidad = $b_producto->cantidad + 1;
        $objVenta->actualizarCantidadTemporal($id_producto, $n_cantidad);
        $respuesta = array('status' => true, 'msg' => 'actualizado');
    } else {
        $registrar = $objVenta->registrar_temporal($id_producto, $precio, $cantidad);
        $respuesta = array('status' => true, 'msg' => 'registrado');
    }
    echo json_encode($respuesta);
}

if ($tipo == "ver_temporal") {
    $productos = $objVenta->verTemporal();
    $respuesta = array('status' => true, 'msg' => '', 'data' => $productos);
    echo json_encode($respuesta);
}

if ($tipo == "eliminarTemporal") {
    $id_producto = $_POST['id_producto'];
    $resultado = $objVenta->eliminarTemporal($id_producto);
    if ($resultado) {
        $respuesta = array('status' => true, 'msg' => 'Producto eliminado de la lista');
    } else {
        $respuesta = array('status' => false, 'msg' => 'Error al eliminar');
    }
    echo json_encode($respuesta);
}

if ($tipo == "registrarVenta") {
    $productos_temporal = $objVenta->verTemporal();
    if (count($productos_temporal) > 0) {
        $total = 0;
        foreach ($productos_temporal as $item) {
            $total += $item->precio * $item->cantidad;
        }
        $id_venta = $objVenta->registrarVenta($total);
        if ($id_venta > 0) {
            foreach ($productos_temporal as $item) {
                $objVenta->registrarDetalle($id_venta, $item->id_producto, $item->cantidad, $item->precio);
                // Actualizar stock
                $objProducto->actualizarStock($item->id_producto, $item->cantidad);
            }
            $objVenta->limpiarTemporal();
            $respuesta = array('status' => true, 'msg' => 'Venta registrada correctamente');
        } else {
            $respuesta = array('status' => false, 'msg' => 'Error al registrar venta');
        }
    } else {
        $respuesta = array('status' => false, 'msg' => 'No hay productos en la lista');
    }
    echo json_encode($respuesta);
}
?>
