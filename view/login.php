<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-bottom: 20px;
  border-radius: 50%;
  border: 2px solid #ccc;
}

.login-box input[type="text"],
.login-box input[type="password"] {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #f9f9f9;
  font-size: 14px;
}

.login-box input[type="text"]:focus,
.login-box input[type="password"]:focus {
  outline: none;
  border-color: #005599;
  background-color: #fff;
}

.login-box input[type="checkbox"] {
  margin-right: 6px;
  accent-color: #003366;
}

.login-box button {
  background: #003366;
  color: white;
  padding: 12px;
  width: 100%;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 15px;
  transition: background 0.3s ease;
}

.login-box button:hover {
  background: #005599;
}

.remember {
  text-align: left;
  font-size: 0.9em;
  margin: 12px 0 20px;
}

  </style>
  <script>
    const base_url = '<?= BASE_URL; ?>';
  </script>
</head>

<body>
  <form id="frm_login">
    <div class="login-box">
      <img src="https://img.freepik.com/fotos-premium/hermosa-mujer-morena-pelo-largo-modelo-mujer-peinado-belleza-tiro-estudio-blanco-aislado_431835-4167.jpg?semt=ais_hybrid&w=740" alt="foto de perfil" height="80" width="80" />

      <input type="text" placeholder="usuario" id="username" name="username" required />
      <input type="password" placeholder="password" id="password" name="password" required />

      <div class="remember">
        <label><input type="checkbox" /> Recordarme</label>
      </div>
      <button type="button" onclick="iniciar_sesion();">Entrar</button>
    </div>
  </form>
 
 
  <script src="<?php echo BASE_URL; ?>view/function/user.js"></script>

  
</body>

</html>