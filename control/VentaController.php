<?php
require_once("../model/VentaModel.php");
require_once("../model/ProductsModel.php");

$objProducto = new ProductsModel();
$objVenta = new VentaModel();

$tipo = isset($_GET['tipo']) ? $_GET['tipo'] : '';

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


if ($tipo == "listar_venta_temporal" || $tipo == "listar_venta_Temporal") {
    $respuesta = array('status' => false, 'msg' => 'fallo el controlador');
    $b_productos = $objVenta->buscarTemporales();
    if ($b_productos && count($b_productos) > 0) {
        $respuesta = array('status' => true, 'data' => $b_productos);
    } else {
        $respuesta = array('status' => false, 'msg' => 'no se encontraron datos');
    }
    echo json_encode($respuesta);
}

// Devuelve los temporales (usado para calcular subtotal/igv/total en el frontend)
if ($tipo == "subtotal_temporal") {
    $respuesta = array('status' => false, 'msg' => 'fallo el controlador');
    $b_productos = $objVenta->buscarTemporales();
    if ($b_productos) {
        $respuesta = array('status' => true, 'data' => $b_productos);
    } else {
        $respuesta = array('status' => false, 'msg' => 'no se encontraron datos');
    }
    echo json_encode($respuesta);
}

if ($tipo=="actualizar_cantidad") {
    $id = $_POST['id'];
    $cantidad = $_POST['cantidad'];
    $respuesta = array('status' => false, 'msg' => 'fallo el controlador');
    $consulta = $objVenta->actualizarCantidadTemporalByid($id, $cantidad);
    if($consulta) {
        $respuesta = array('status' => true, 'msg' => 'success');
    }else {
        $respuesta = array('status' => false, 'msg' => 'Error');
    }
    echo json_encode($respuesta);
}
if ($tipo == "eliminar_temporal") {
    $id = $_POST['id'];
    $respuesta = array('status' => false, 'msg' => 'fallo el controlador');
    $consulta = $objVenta->eliminarTemporal($id);
    if ($consulta) {
        $respuesta = array('status' => true, 'msg' => 'eliminado');
    } else {
        $respuesta = array('status' => false, 'msg' => 'Error al eliminar');
    }
    echo json_encode($respuesta);
}
