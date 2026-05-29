import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { end_points } from "../services/api";
import { saveLocalStorage } from "../helpers/local-storage";
import { redirectAlert } from "../helpers/alert";

const Login = () => {
  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ─── FIX: en lugar de cargar todos los usuarios al montar el componente
  // y comparar en el front (inseguro + problema de estado stale),
  // hacemos fetch directo con email al momento de hacer login.
  // Si tu back no tiene endpoint de login aún, buscamos por email y
  // verificamos la contraseña del objeto recibido.
  async function signIn() {
    setLoading(true);
    try {
      const response = await fetch(end_points.users);
      const users = await response.json();

      console.log("USUARIOS:", users);
      console.log("EMAIL INGRESADO:", getEmail.trim());
      console.log("PASSWORD INGRESADO:", getPassword);

      const user = users.find(
        (item) =>
          item.email === getEmail.trim() && item.password === getPassword,
      );

      console.log("USUARIO ENCONTRADO:", user);

      if (user) {
        saveLocalStorage("user", user);
        redirectAlert(
          "Bienvenido al sistema " + user.nombre,
          "Será redireccionado al panel principal en",
          "success",
          "/dashboard",
        );
      } else {
        redirectAlert(
          "Error de credenciales",
          "Esta ventana se cerrará en ",
          "error",
          "/login",
        );
      }
    } catch (error) {
      console.error("Error en login:", error);
      redirectAlert(
        "Error de conexión",
        "No se pudo conectar con el servidor",
        "error",
        "/login",
      );
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn();
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-logo">
          <img src={logo} alt="Logo Hormix" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Inicia Sesión</h1>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={getEmail}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo@gmail.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={getPassword}
              placeholder="*********"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Verificando..." : "Entrar"}
          </button>

          <p>
            ¿No tienes cuenta?
            <Link to="/register">Regístrate aquí</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
