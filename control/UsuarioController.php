<?php
require_once(__DIR__ . "/../model/UsuarioModel.php");

$objPersona = new UsuarioModel();
$tipo = $_GET['tipo'];

if ($tipo == "registrar") {
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
    $estado = $_POST['estado'];
    $editor = $_POST['editor'] ?? null;
    // Proveedores no necesitan password
    $password = ($rol == 'proveedor') ? null : password_hash($nro_identidad, PASSWORD_DEFAULT);

    if (
        $nro_identidad == "" || $razon_social == "" || $telefono == "" || $correo == "" ||
        $departamento == "" || $provincia == "" || $distrito == "" || $cod_postal == "" ||
        $direccion == "" || $rol == "" || $estado == ""
    ) {
        $arrResponse = array('status' => false, 'msg' => 'Error, campos vacíos');
    } else {
        $existePersona = $objPersona->existePersona($nro_identidad);
        if ($existePersona > 0) {
            $arrResponse = array('status' => false, 'msg' => 'Error, nro de documento ya existe');
        } else {
            $respuesta = $objPersona->registrar(
                $nro_identidad, $razon_social, $telefono, $correo,
                $departamento, $provincia, $distrito, $cod_postal,
                $direccion, $rol, $password, $estado
            );
            if ($respuesta) {
                $arrResponse = array('status' => true, 'msg' => 'Registrado correctamente');
            } else {
                $arrResponse = array('status' => false, 'msg' => 'Error, falló en registro');
            }
        }
    }
    echo json_encode($arrResponse);
}

if ($tipo == "iniciar_sesion") {
    $nro_identidad = $_POST['username'];
    $password = $_POST['password'];
    if ($nro_identidad == "" || $password == "") {
        $respuesta = array('status' => false, 'msg' => 'Error, campos vacíos');
    } else {
        $existePersona = $objPersona->existePersona($nro_identidad);
        if (!$existePersona) {
            $respuesta = array('status' => false, 'msg' => 'Error, usuario no registrado');
        } else {
            $persona = $objPersona->buscarPersonaPorNroIdentidad($nro_identidad);
            if (password_verify($password, $persona->password)) {
                session_start();
                $_SESSION['ventas_id'] = $persona->id;
                $_SESSION['ventas_usuario'] = $persona->razon_social;
                $respuesta = array('status' => true, 'msg' => 'ok');
            } else {
                $respuesta = array('status' => false, 'msg' => 'Error, contraseña incorrecta');
            }
        }
    }
    echo json_encode($respuesta);
}

if ($tipo == "ver_usuarios") {
    $usuarios = $objPersona->verUsuarios();
    if (count($usuarios)) {
        $respuesta = array('status' => true, 'msg' => '', 'data' => $usuarios);
    } else {
        $respuesta = array('status' => false, 'msg' => 'No hay usuarios');
    }
    echo json_encode($respuesta);
}

if ($tipo == "listar_proveedores") {
    $usuarios = $objPersona->verProveedor();
    if (count($usuarios)) {
        $respuesta = array('status' => true, 'msg' => '', 'data' => $usuarios);
    } else {
        $respuesta = array('status' => false, 'msg' => 'No hay proveedores');
    }
    echo json_encode($respuesta);
}

if ($tipo == "ver_proveedor") {
    $id_persona = $_POST['id_persona'];
    $proveedor = $objPersona->ver($id_persona);
    if ($proveedor) {
        $respuesta = array('status' => true, 'data' => $proveedor);
    } else {
        $respuesta = array('status' => false, 'msg' => 'Error, proveedor no existe');
    }
    echo json_encode($respuesta);
}

if ($tipo == "actualizar_proveedor") {
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
    $estado = $_POST['estado'];

    if (
        $id_persona == "" || $nro_identidad == "" || $razon_social == "" ||
        $telefono == "" || $correo == "" || $departamento == "" || $provincia == "" ||
        $distrito == "" || $cod_postal == "" || $direccion == "" || $rol == "" || $estado == ""
    ) {
        $arrResponse = array('status' => false, 'msg' => 'Error, campos vacíos');
    } else {
        $existeID = $objPersona->ver($id_persona);
        if (!$existeID) {
            $arrResponse = array('status' => false, 'msg' => 'Error, proveedor no existe');
        } else {
            // Verificar unicidad del nro_identidad para otros proveedores
            $existeOtro = $objPersona->existePersonaOtro($nro_identidad, $id_persona);
            if ($existeOtro > 0) {
                $arrResponse = array('status' => false, 'msg' => 'Error, nro de documento ya existe para otro proveedor');
            } else {
                $actualizar = $objPersona->actualizar(
                    $id_persona, $nro_identidad, $razon_social, $telefono, $correo,
                    $departamento, $provincia, $distrito, $cod_postal, $direccion, $rol, $estado
                );
                if ($actualizar) {
                    $arrResponse = array('status' => true, 'msg' => 'Proveedor actualizado correctamente');
                } else {
                    $arrResponse = array('status' => false, 'msg' => 'Error al actualizar');
                }
            }
        }
    }
    echo json_encode($arrResponse);
}

if ($tipo == "eliminar_proveedor") {
    $id_persona = $_POST['id_persona'];
    // Verificar si el proveedor está asociado a productos
    $tieneProductos = $objPersona->proveedorTieneProductos($id_persona);
    if ($tieneProductos > 0) {
        $arrResponse = array('status' => false, 'msg' => 'No se puede eliminar el proveedor porque tiene productos asociados');
    } else {
        $resultado = $objPersona->eliminar($id_persona);
        if ($resultado) {
            $arrResponse = array('status' => true, 'msg' => 'Proveedor eliminado correctamente');
        } else {
            $arrResponse = array('status' => false, 'msg' => 'Error al eliminar');
        }
    }
    echo json_encode($arrResponse);
}

if ($tipo == "ver") {
    $id_persona = $_POST['id_persona'];
    $usuario = $objPersona->ver($id_persona);
    if ($usuario) {
        $respuesta = array('status' => true, 'data' => $usuario);
    } else {
        $respuesta = array('status' => false, 'msg' => 'Error, usuario no existe');
    }
    echo json_encode($respuesta);
}

if ($tipo == "actualizar") {
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
    $estado = $_POST['estado'];
    $editor = $_POST['editor'] ?? null;

    if (
        $id_persona == "" || $nro_identidad == "" || $razon_social == "" || $telefono == "" ||
        $correo == "" || $departamento == "" || $provincia == "" || $distrito == "" ||
        $cod_postal == "" || $direccion == "" || $rol == "" || $estado == ""
    ) {
        $arrResponse = array('status' => false, 'msg' => 'Error, campos vacíos');
    } else {
        $existeID = $objPersona->ver($id_persona);
        if (!$existeID) {
            $arrResponse = array('status' => false, 'msg' => 'Error, usuario no existe');
        } else {
            $actualizar = $objPersona->actualizar(
                $id_persona, $nro_identidad, $razon_social, $telefono, $correo,
                $departamento, $provincia, $distrito, $cod_postal, $direccion,
                $rol, $estado, $editor
            );
            if ($actualizar) {
                $arrResponse = array('status' => true, 'msg' => 'Actualizado correctamente');
            } else {
                $arrResponse = array('status' => false, 'msg' => 'Error al actualizar');
            }
        }
    }
    echo json_encode($arrResponse);
}

if ($tipo == "eliminar") {
    $id_persona = $_POST['id_persona'];
    $resultado = $objPersona->eliminar($id_persona);
    if ($resultado) {
        $arrResponse = array('status' => true, 'msg' => 'Usuario eliminado correctamente');
    } else {
        $arrResponse = array('status' => false, 'msg' => 'Error al eliminar');
    }
    echo json_encode($arrResponse);
}

if ($tipo == "ver_client") {
    $usuarios = $objPersona->verClient();
    if (count($usuarios)) {
        $respuesta = array('status' => true, 'msg' => '', 'data' => $usuarios);
    } else {
        $respuesta = array('status' => false, 'msg' => 'No hay clientes');
    }
    echo json_encode($respuesta);
    exit;
}

// Si no coincide ningún tipo
echo json_encode(['status' => false, 'msg' => 'Tipo de operación no válida']);
exit;

if ($tipo == "ver_client") {
    $usuarios = $objPersona->verClient();
    if (count($usuarios)) {
        $respuesta = array('status' => true, 'msg' => '', 'data' => $usuarios);
    } else {
        $respuesta = array('status' => false, 'msg' => 'No hay clientes');
    }
    echo json_encode($respuesta);
}


