import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { end_points } from "../services/api";
import { saveLocalStorage } from "../helpers/local-storage";
import { redirectAlert } from "../helpers/alert";

const Login = () => {
  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  //funciones

  function getUser() {
    fetch(end_points.users)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }

  useEffect(() => {
    getUser();
  }, []);

  function findUser() {
  console.log(users);

  return users.find(
    (item) =>
      getEmail === item.email &&
      getPassword === item.password
  );
}

  function findUser() {

  console.log("USUARIOS DEL BACK:", users);

  let auth = users.find(
    (item) =>
      item.email === getEmail &&
      item.password === getPassword
  );

  console.log("USUARIO ENCONTRADO:", auth);

  return auth;
}

  function getUser() {
    fetch(end_points.users)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la petición");
        }

        return response.json();
      })
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }

  function signIn() {
    let user = findUser();
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
        "/",
      );
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Datos de Login capturados:", { getEmail, getPassword });

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

          <button onClick={signIn} type="submit">
            Entrar
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
