<?php
require_once 'library/conexion.php';

$conn = new Conexion();
$conn = $conn->connect();

$result = $conn->query('SELECT * FROM categoria');
while($row = $result->fetch_assoc()) {
    print_r($row);
    echo "\n";
}
