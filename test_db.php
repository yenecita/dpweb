<?php
require_once __DIR__ . '/library/conexion.php';
require_once __DIR__ . '/model/ProductsModel.php';

try {
    // Verificar conexión básica primero
    $conexion = new Conexion();
    $conn = $conexion->connect();
    if ($conn) {
        echo 'Conexión a la base de datos exitosa.' . PHP_EOL;

        // Verificar si las tablas existen
        $tables = ['producto', 'categoria', 'proveedor'];
        foreach ($tables as $table) {
            $result = $conn->query("SHOW TABLES LIKE '$table'");
            if ($result->num_rows > 0) {
                echo "Tabla '$table' existe." . PHP_EOL;
            } else {
                echo "Tabla '$table' NO existe." . PHP_EOL;
            }
        }

        $objProducto = new ProductsModel();
        $productos = $objProducto->verProducts();

        echo 'Número de productos encontrados: ' . count($productos) . PHP_EOL;

        if (count($productos) > 0) {
            echo 'Primer producto:' . PHP_EOL;
            print_r($productos[0]);
        } else {
            echo 'No hay productos en la base de datos.' . PHP_EOL;
        }
    } else {
        echo 'Error en la conexión a la base de datos.' . PHP_EOL;
    }

} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage() . PHP_EOL;
}
