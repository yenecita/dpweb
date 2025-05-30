
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Login</title>
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      height: 100vh;
      background: url('https://img.freepik.com/foto-gratis/angulo-vista-rascacielos_1359-1105.jpg') no-repeat center center fixed;
      background-size: cover;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .login-box {
      background: rgba(255, 255, 255, 0.9);
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      padding: 40px 30px;
      width: 300px;
      text-align: center;
    }

    .login-box img {
      width: 60px;
      margin-bottom: 20px;
      border-radius: 50%;
    }

    .login-box input[type="email"],
    .login-box input[type="password"] {
      width: 100%;
      padding: 10px;
      margin: 8px 0;
      border: none;
      border-radius: 8px;
      background: #f0f0f0;
    }

    .login-box input[type="checkbox"] {
      margin-right: 5px;
    }

    .login-box button {
      background: #003366;
      color: white;
      padding: 10px;
      width: 100%;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
    }

    .login-box button:hover {
      background: #005599;
    }

    .remember {
      text-align: left;
      font-size: 0.9em;
      margin: 10px 0;
    }
  </style>
</head>
<body>
  <div class="login-box">
    <img src="https://img.freepik.com/fotos-premium/hermosa-mujer-morena-pelo-largo-modelo-mujer-peinado-belleza-tiro-estudio-blanco-aislado_431835-4167.jpg?semt=ais_hybrid&w=740" alt="foto de perfil" height="80" width="80"/>
    <form>
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />
      <div class="remember">
        <label><input type="checkbox" /> Recordarme</label>
      </div>
      <button type="submit">Entrar</button>
    </form>
    <div> 
    </div>
  </div>
</body>
</html>


