<?php
http_response_code(404);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Página no encontrada</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color:rgb(167, 175, 184);
            color: #333;
            text-align: center;
            padding: 80px;
        }
        h1 {
            font-size: 6em;
            color:rgb(134, 51, 60);
            margin-bottom: 0.5em;
        }
        p {
            font-size: 1.5em;
            margin: 20px 0;
        }
        a {
            font-size: 1.2em;
            color:rgb(26, 123, 226);
            text-decoration: none;
            border: 1px solid #007bff;
            padding: 10px 20px;
            border-radius: 5px;
        }
        a:hover {
            background-color: #007bff;
            color: white;
        }
        .image-container {
            margin-top: 30px;
        }
        img {
            width: 250px;  /* Puedes ajustar el tamaño de la imagen */
            height: auto;
        }
    </style>
</head>
<body>
    <h1>404</h1>
    <p><strong>¡Vaya!</strong> La página que buscas no se ha encontrado.</p>
    <p>Es posible que el enlace esté roto o que la página haya sido movida o eliminada.</p>
    <p><a href="/">Haz clic aquí para regresar a la página de inicio</a></p>
</body>
</html>

