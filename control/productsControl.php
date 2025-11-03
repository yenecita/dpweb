<?php
require_once("../model/ProductsModel.php");
require_once("../model/CategoriaModel.php");

$objProducto = new ProductsModel();
$objCategoria = new CategoriaModel();
$tipo = $_GET['tipo'];

if ($tipo == "registrar") {
    $codigo = $_POST['codigo'];
    $nombre = $_POST['nombre'];
    $detalle = $_POST['detalle'];
    $precio = $_POST['precio'];
    $stock = $_POST['stock'];
    $id_categoria = $_POST['id_categoria'];
    $fecha_vencimiento = $_POST['fecha_vencimiento'];
    $id_proveedor = $_POST['id_proveedor'];

    if ($codigo == "" || $nombre == "" || $detalle == "" || $precio == "" || $stock == "" || $id_categoria == "" || $fecha_vencimiento == "" || $id_proveedor == "") {
        echo json_encode(['status' => false, 'msg' => 'Error, campos vacíos']);
        exit;
    }

    // Verificar si la categoría existe
    $categoriaExiste = $objCategoria->ver($id_categoria);
    if (!$categoriaExiste) {
        echo json_encode(['status' => false, 'msg' => 'Error, categoría no existe']);
        exit;
    }

    if (!isset($_FILES['imagen']) || $_FILES['imagen']['error'] !== UPLOAD_ERR_OK) {
        echo json_encode(['status' => false, 'msg' => 'Error, imagen no recibida']);
        exit;
    }

    if ($objProducto->existeCodigo($codigo) > 0) {
        echo json_encode(['status' => false, 'msg' => 'Error, el código ya existe']);
        exit;
    }

    $file = $_FILES['imagen'];
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $extPermitidas = ['jpg', 'jpeg', 'png'];

    if (!in_array($ext, $extPermitidas)) {
        echo json_encode(['status' => false, 'msg' => 'Formato de imagen no permitido']);
        exit;
    }

    if ($file['size'] > 5 * 1024 * 1024) { // 5MB
        echo json_encode(['status' => false, 'msg' => 'La imagen supera 5MB']);
        exit;
    }

    $carpetaUploads = "../uploads/productos/";
    if (!is_dir($carpetaUploads)) {
        @mkdir($carpetaUploads, 0775, true);
    }

    $nombreUnico = uniqid('prod_') . '.' . $ext;
    $rutaFisica = $carpetaUploads . $nombreUnico;
    $rutaRelativa = "uploads/productos/" . $nombreUnico;

    if (!move_uploaded_file($file['tmp_name'], $rutaFisica)) {
        echo json_encode(['status' => false, 'msg' => 'No se pudo guardar la imagen']);
        exit;
    }

    $id = $objProducto->registrar($codigo, $nombre, $detalle, $precio, $stock, $id_categoria, $fecha_vencimiento, $rutaRelativa, $id_proveedor);
    if ($id > 0) {
        echo json_encode(['status' => true, 'msg' => 'Registrado correctamente', 'id' => $id, 'img' => $rutaRelativa]);
    } else {
        @unlink($rutaFisica); // eliminar imagen si falla la BD
        echo json_encode(['status' => false, 'msg' => 'Error, falló en registro']);
    }
    exit;
}

if ($tipo == "ver_productos") {
    $productos = $objProducto->verProducts();
    $respuesta = array('status' => true, 'msg' => '', 'data' => $productos);
    echo json_encode($respuesta);
}

if ($tipo == "ver") {
    $respuesta = array('status' => false, 'msg' => 'Error');
    $id_producto = $_POST['id_producto'];
    $producto = $objProducto->ver($id_producto);
    if ($producto) {
        $respuesta['status'] = true;
        $respuesta['msg'] = '';
        $respuesta['data'] = $producto;
    } else {
        $respuesta['msg'] = 'Error, producto no existe';
    }
    echo json_encode($respuesta);
}

if ($tipo == "actualizar") {
    $id_producto = $_POST['id_producto'];
    $codigo = $_POST['codigo'];
    $nombre = $_POST['nombre'];
    $detalle = $_POST['detalle'];
    $precio = $_POST['precio'];
    $stock = $_POST['stock'];
    $id_categoria = $_POST['id_categoria'];
    $fecha_vencimiento = $_POST['fecha_vencimiento'];
    $id_proveedor = $_POST['id_proveedor'];

    if ($codigo == "" || $nombre == "" || $detalle == "" || $precio == "" || $stock == "" || $id_categoria == "" || $fecha_vencimiento == "" || $id_proveedor == "") {
        $arrResponse = array('status' => false, 'msg' => 'Error, campos vacíos');
    } else {
        // Verificar si la categoría existe
        $categoriaExiste = $objCategoria->ver($id_categoria);
        if (!$categoriaExiste) {
            $arrResponse = array('status' => false, 'msg' => 'Error, categoría no existe');
        } else {
            $existeProducto = $objProducto->ver($id_producto);
            if (!$existeProducto) {
                $arrResponse = array('status' => false, 'msg' => 'Error, producto no existe en base de datos');
            } else {
                // Manejar imagen si se sube nueva
                $imagen_actual = $existeProducto->imagen;
                if (!empty($_FILES['imagen']['name'])) {
                    $file = $_FILES['imagen'];
                    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
                    $extPermitidas = ['jpg', 'jpeg', 'png'];

                    if (!in_array($ext, $extPermitidas)) {
                        echo json_encode(['status' => false, 'msg' => 'Formato de imagen no permitido']);
                        exit;
                    }

                    if ($file['size'] > 5 * 1024 * 1024) { // 5MB
                        echo json_encode(['status' => false, 'msg' => 'La imagen supera 5MB']);
                        exit;
                    }

                    $carpetaUploads = "../uploads/productos/";
                    if (!is_dir($carpetaUploads)) {
                        @mkdir($carpetaUploads, 0775, true);
                    }

                    $nombreUnico = uniqid('prod_') . '.' . $ext;
                    $rutaFisica = $carpetaUploads . $nombreUnico;
                    $rutaRelativa = "uploads/productos/" . $nombreUnico;

                    if (!move_uploaded_file($file['tmp_name'], $rutaFisica)) {
                        echo json_encode(['status' => false, 'msg' => 'No se pudo guardar la imagen']);
                        exit;
                    }

                    $imagen = $rutaRelativa;
                    // Eliminar imagen anterior
                    if (!empty($imagen_actual) && file_exists("../" . $imagen_actual)) {
                        @unlink("../" . $imagen_actual);
                    }
                } else {
                    $imagen = $imagen_actual;
                }

                $actualizar = $objProducto->actualizar($id_producto, $codigo, $nombre, $detalle, $precio, $stock, $id_categoria, $fecha_vencimiento, $imagen, $id_proveedor);
                if ($actualizar) {
                    $arrResponse = array('status' => true, 'msg' => 'Actualizado correctamente');
                } else {
                    $arrResponse = array('status' => false, 'msg' => 'Error al actualizar');
                }
            }
        }
    }
    echo json_encode($arrResponse);
} elseif ($tipo == "eliminar") {
    $id_producto = $_POST['id_producto'];
    $resultado = $objProducto->eliminar($id_producto);
    if ($resultado) {
        $arrResponse = array('status' => true, 'msg' => 'Producto eliminado correctamente');
    } else {
        $arrResponse = array('status' => false, 'msg' => 'Error al eliminar producto');
    }
    echo json_encode($arrResponse);
}
