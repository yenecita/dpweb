<?php
require_once __DIR__ . '/../config/config.php';

class Conexion
{
    public static function connect()
    {
        $mysql = new mysqli(BD_HOST, BD_USER, BD_PASSWORD, BD_NAME);
        if ($mysql->connect_errno) {
            die('Error de Conexion: ' . $mysql->connect_error);
        }
        $mysql->set_charset(BD_CRARSET);
        date_default_timezone_set('America/Lima');
        return $mysql;
    }
}
