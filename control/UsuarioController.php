<?php
require_once("../model/UsuarioModel.php");

$objPersona = new UsuarioModel();

$tipo = $_GET['tipo'];

if ($tipo == "registrar") {
    //print_r($_POST);
    $nro_identidad = $_POST['nro_identidad'];
    $razon_social = $_POST['razon_social'];
    $telefono = $_POST['telefono'];
    $correo = $_POST['correo'];
    $departamento = $_POST['departamento'];
    $provincia = $_POST['provincia'];
    $distrito = $_POST['distrito'];
    $cod_postal = $_POST['cod_postal'];
    $direccion = $_POST['direccion'];
    $rol = $_POST['rol'];
    //ENCRIPTANDO nro_intidad PARA UTILIZAR COMO CONTRSEÑA
    $password = password_hash($nro_identidad, PASSWORD_DEFAULT);

    if ($nro_identidad == "" || $razon_social == "" || $telefono == "" || $correo == "" || $departamento == "" || $provincia == "" || $distrito == "" || $cod_postal == "" || $direccion  == "" || $rol == "") {
        $arrResponse = array('status' => false, 'msg' => 'Error, campos vacios');
    } else {
        //validacion si existe persona con la mismo dni.
        $existePersona = $objPersona->existePersona($nro_identidad);
        if ($existePersona > 0) {
            $arrResponse = array('status' => false, 'msg' => 'Error, nro de documento ya existe');
        } else {
            $editor = $_POST['editor'] ?? null;
            $respuesta = $objPersona->registrar($nro_identidad, $razon_social, $telefono, $correo, $departamento, $provincia, $distrito, $cod_postal, $direccion, $rol, $password, $editor);
            if ($respuesta) {
                $arrResponse = array('status' => true, 'msg' => 'Registrar Correctamente');
            } else {
                $arrResponse = array('status' => false, 'msg' => 'Error,falló en registro');
            }
        }
    }
    echo json_encode($arrResponse);
}

if ($tipo == "iniciar_sesion") {
    $nro_identidad = $_POST['username'];
    $password = $_POST['password'];
    if ($nro_identidad == "" || $password == "") {
        $respuesta = array('status' => false, 'msg' => 'Error, Campos vacios');
    } else {
        $existePersona = $objPersona->existePersona($nro_identidad);
        if (!$existePersona) {
            $respuesta = array('status' => false, 'msg' => 'Error, Usuario no registrado');
        } else {
            $persona = $objPersona->buscarPersonaPorNroIdentidad($nro_identidad);
            if (password_verify($password, $persona->password)) {
                //inicio de sesión y tambien eliminar
                session_start();
                //crear una variable de sesión
                $_SESSION['ventas_id'] = $persona->id;
                $_SESSION['ventas_usuario'] = $persona->razon_social;
                $respuesta = array('status' => true, 'msg' => 'ok');
            } else {
                $respuesta = array('status' => false, 'msg' => 'Error, contraseña encorrecta');
            }
        }
    }
    echo json_encode($respuesta);
}

if ($tipo == "ver_usuarios") {
    $respuesta = array('status' => false, 'msg' => 'fallo el controlador');
    $usuarios = $objPersona->verUsuarios();
    if (count($usuarios)) {
        $respuesta = array('status' => true, 'msg' => '', 'data' => $usuarios);
    }
    echo json_encode($respuesta);
}
if ($tipo == "listar_proveedores"){
    $respuesta = array('status' => false, 'msg' => 'fallo en controlador');
    $usuarios = $objPersona->verProveedor();
    if (count($usuarios)) {
        $respuesta = array('status' => true, 'msg' => '', 'data' => $usuarios);
    }
    echo json_encode($respuesta);
}

if ($tipo == "ver") {
    //print_r($_POST);
    $respuesta = array('status' => false, 'msg' => 'Error');
    $id_persona = $_POST['id_persona'];
    $usuario = $objPersona->ver($id_persona);
    if ($usuario) {
        $respuesta['status'] = true;
        $respuesta['data'] = $usuario;
    } else {
        $respuesta['msg'] = 'Error, usuario no existe';
    }
    echo json_encode($respuesta);
}


if ($tipo == "actualizar") {
    //print_r($_POST);
    $id_persona = $_POST['id_persona'];
    $nro_identidad = $_POST['nro_identidad'];
    $razon_social = $_POST['razon_social'];
    $telefono = $_POST['telefono'];
    $correo = $_POST['correo'];
    $departamento = $_POST['departamento'];
    $provincia = $_POST['provincia'];
    $distrito = $_POST['distrito'];
    $cod_postal = $_POST['cod_postal'];
    $direccion = $_POST['direccion'];
    $rol = $_POST['rol'];
    if ($id_persona == "" || $nro_identidad == "" || $razon_social == "" || $telefono == "" || $correo == "" || $departamento == "" || $provincia == "" || $distrito == "" || $cod_postal == "" || $direccion  == "" || $rol == "") {
        $arrResponse = array('status' => false, 'msg' => 'Error, campos vacios');
    } else {
        $existeID = $objPersona->ver($id_persona);
        if (!$existeID) {
            $arrResponse = array('status' => false, 'msg' => 'Error, usuario no existe en base de datos');
        } else {
            //actualizar
            $editor = $_POST['editor'] ?? null;
            $actualizar = $objPersona->actualizar($id_persona, $nro_identidad, $razon_social, $telefono, $correo, $departamento, $provincia, $distrito, $cod_postal, $direccion, $rol, $editor);
            if ($actualizar) {
                $arrResponse = array('status' => true, 'msg' => "Actualizado correctamente");
            } else {
                $arrResponse = array('status' => false, 'msg' => 'Error al actualizar');
            }
        }
    }
    echo json_encode($arrResponse);
}

if ($tipo == "eliminar") {
    //print_r($_POST);
    $id_persona = $_POST['id_persona'];
    $respuesta = array('status' => false, 'msg' => '');
    $resultado = $objPersona->eliminar($id_persona);

    if ($resultado) {
        $arrResponse = array('status' => true, 'msg' => 'Usuario eliminado correctamente');
    } else {
        $arrResponse = array('status' => false, 'msg' => 'Error al eliminar');
    }
    echo json_encode($arrResponse);
}

if ($tipo == "ver_client") {
    $respuesta = array('status' => false, 'msg' => 'fallo el controlador');
    $usuarios = $objPersona->verClient();
    if (count($usuarios)) {
        $respuesta = array('status' => true, 'msg' => '', 'data' => $usuarios);
    }
    echo json_encode($respuesta);
}

if ($tipo == "ver_proveedor") {
    $respuesta = array('status' => false, 'msg' => 'fallo el controlador');
    $usuarios = $objPersona->verProveedor();
    if (count($usuarios)) {
        $respuesta = array('status' => true, 'msg' => '', 'data' => $usuarios);
    }
    echo json_encode($respuesta);
}
