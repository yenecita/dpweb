<?php
require_once "../config/config.php";

class Conexion
{
   public static function connect()
   {
      $mysql = new mysqli(BD_HOST, BD_USER, BD_PASSWORD, BD_NAME,);
      $mysql->set_charset(BD_CRARSET);
      date_default_timezone_set("America/Lima");
      if (mysqli_connect_errno()) {
         echo "Error de Conexion:" . mysqli_connect_errno();
      }
      return $mysql;
   }
  
}
 
