<?php
require_once("../library/conexion.php");
class CategoriaModel
{
    private $conexion;
    function __construct()
    {
        $this->conexion = new Conexion();
        $this->conexion = $this->conexion->connect();
    }
    public function registrar($nombre, $detalle)
    {
        $stmt = $this->conexion->prepare("INSERT INTO categoria(nombre, detalle) VALUES(?, ?)");
        $stmt->bind_param("ss", $nombre, $detalle);
        $result = $stmt->execute();
        if ($result) {
            $id = $this->conexion->insert_id;
        } else {
            $id = 0;
        }
        $stmt->close();
        return $id;
    }

    public function existeCategoria($nombre)
    {
        $stmt = $this->conexion->prepare("SELECT * FROM categoria WHERE nombre = ?");
        $stmt->bind_param("s", $nombre);
        $stmt->execute();
        $result = $stmt->get_result();
        $num_rows = $result->num_rows;
        $stmt->close();
        return $num_rows;
    }

    public function verCategoria()
    {
        $stmt = $this->conexion->prepare("SELECT * FROM categoria");
        $stmt->execute();
        $result = $stmt->get_result();
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        $stmt->close();
        return $data;
    }

    public function ver($id)
    {
        $stmt = $this->conexion->prepare("SELECT * FROM categoria WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $categoria = $result->fetch_object();
        $stmt->close();
        return $categoria;
    }

    public function actualizar($id, $nombre, $detalle)
    {
        $stmt = $this->conexion->prepare("UPDATE categoria SET nombre = ?, detalle = ? WHERE id = ?");
        $stmt->bind_param("ssi", $nombre, $detalle, $id);
        $result = $stmt->execute();
        $stmt->close();
        return $result;
    }

    public function eliminar($id)
    {
        $stmt = $this->conexion->prepare("DELETE FROM categoria WHERE id = ?");
        $stmt->bind_param("i", $id);
        $result = $stmt->execute();
        $stmt->close();
        return $result;
    }
}
