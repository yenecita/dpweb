<?php
header('Content-Type: application/json; charset=utf-8');

require_once("../model/CategoriaModel.php");

$objCategoria = new CategoriaModel();

$tipo = $_GET['tipo'] ?? '';

if ($tipo == "registrar") {
    $nombre = $_POST['nombre'] ?? '';
    $detalle = $_POST['detalle'] ?? '';

    if ($nombre == "" || $detalle == "") {
        $arrResponse = array('status' => false, 'msg' => 'Error, campos vacíos');
    } else {
        $existeCategoria = $objCategoria->existeCategoria($nombre);
        if ($existeCategoria > 0) {
            $arrResponse = array('status' => false, 'msg' => 'Error, categoría ya existe');
        } else {
            $respuesta = $objCategoria->registrar($nombre, $detalle);
            if ($respuesta) {
                $arrResponse = array('status' => true, 'msg' => 'Registrado correctamente');
            } else {
                $arrResponse = array('status' => false, 'msg' => 'Error, falló el registro');
            }
        }
    }
    echo json_encode($arrResponse);

} elseif ($tipo == "ver_categorias") {
    $categorias = $objCategoria->verCategoria();
    if ($categorias) {
        $arrResponse = array('status' => true, 'data' => $categorias);
    } else {
        $arrResponse = array('status' => false, 'msg' => 'No hay categorías registradas');
    }
    echo json_encode($arrResponse);

} elseif ($tipo == "ver") {
    $id_categoria = $_POST['id_categoria'] ?? 0;
    $categoria = $objCategoria->ver($id_categoria);

    if ($categoria) {
        $arrResponse = array('status' => true, 'data' => $categoria);
    } else {
        $arrResponse = array('status' => false, 'msg' => 'Error, categoría no existe');
    }
    echo json_encode($arrResponse);

} elseif ($tipo == "actualizar") {
    $id_categoria = $_POST['id_categoria'] ?? 0;
    $nombre = $_POST['nombre'] ?? '';
    $detalle = $_POST['detalle'] ?? '';

    if ($nombre == "" || $detalle == "") {
        $arrResponse = array('status' => false, 'msg' => 'Error, campos vacíos');
    } else {
        $existeCategoria = $objCategoria->ver($id_categoria);
        if (!$existeCategoria) {
            $arrResponse = array('status' => false, 'msg' => 'Error, categoría no existe en base de datos');
        } else {
            $actualizar = $objCategoria->actualizar($id_categoria, $nombre, $detalle);
            if ($actualizar) {
                $arrResponse = array('status' => true, 'msg' => 'Actualizado correctamente');
            } else {
                $arrResponse = array('status' => false, 'msg' => 'Error al actualizar');
            }
        }
    }
    echo json_encode($arrResponse);

} elseif ($tipo == "eliminar") {
    $id_categoria = $_POST['id_categoria'] ?? 0;

    // Verificar si hay productos asociados a esta categoría
    require_once("../model/ProductsModel.php");
    $objProducto = new ProductsModel();
    $productosAsociados = $objProducto->contarProductosPorCategoria($id_categoria);

    if ($productosAsociados > 0) {
        $arrResponse = array('status' => false, 'msg' => 'No se puede eliminar la categoría porque tiene productos asociados');
    } else {
        $resultado = $objCategoria->eliminar($id_categoria);
        if ($resultado) {
            $arrResponse = array('status' => true, 'msg' => 'Categoría eliminada correctamente');
        } else {
            $arrResponse = array('status' => false, 'msg' => 'Error al eliminar categoría');
        }
    }
    echo json_encode($arrResponse);

} else {
    echo json_encode(array('status' => false, 'msg' => 'Tipo de operación no válido'));
}
