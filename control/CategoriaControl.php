<?php
require_once("../model/CategoriaModel.php");

$objCategoria = new CategoriaModel();

$tipo = $_GET['tipo'];
if ($tipo == "registrar") {
    //print_r($_POST);
    $nombre = $_POST['nombre'];
    $detalle = $_POST['detalle'];

    if ($nombre== "" || $detalle == "" ) {
        $arrResponse = array('status' => false, 'msg' => 'Error, campos vacios');
    } else {
        $existeCategoria = $objCategoria->existePersona($nombre);
        if ($existeCategoria > 0) {
            $arrResponse = array('status' => false, 'msg' => 'Error, nro de documento ya existe');
        } else {
            $respuesta = $objCategoria->registrar($nombre, $detalle);
            if ($respuesta) {
                $arrResponse = array('status' => true, 'msg' => 'Registrar Correctamente');
            } else {
                $arrResponse = array('status' => false, 'msg' => 'Error,falló en registro');
            }
        }
    }
    echo json_encode($arrResponse);
}
