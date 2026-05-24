import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { end_points } from "../services/api";
import logo from "../assets/logo.png";
import { saveLocalStorage } from "../helpers/local-storage";
import { redirectAlert } from "../helpers/alert";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [documento, setDocumento] = useState("");
  const [edad, setEdad] = useState("");
  const [users, setUsers] = useState([]);

  function getUsers() {
    fetch(end_points.users)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }

  function findUser() {
  console.log(users);

  return users.find(
    (item) =>
      getEmail === item.email &&
      getPassword === item.password
  );
}

  function findUser() {
    let auth = users.find(
      (item) => email == item.email || documento == item.documento,
    );
    return auth;
  }

  function saveUser(e) {
  e.preventDefault();

  if (password !== confirmPassword) {
    return redirectAlert(
      "Error",
      "Las contraseñas no coinciden",
      "error"
    );
  }

  if (findUser()) {
    return redirectAlert(
      "Error",
      "El correo y/o documento ya existe",
      "error"
    );
  }

  let user = {
    nombre: nombre,
    apellido: apellido,
    email: email,
    password: password,
    tipodoc: tipoDocumento,
    documento: documento,
    edad: parseInt(edad),
  };

  fetch(end_points.users, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(user),
  })
    .then((response) => response.json())

    .then((data) => {
      console.log(data);

      getUsers();

      redirectAlert(
        "Usuario registrado",
        "Será redireccionado al login",
        "success",
        "/login"
      );
    })

    .catch((error) => {
      console.log(error);

      redirectAlert(
        "Error",
        "No se pudo registrar",
        "error"
      );
    });
}

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <div className="register-left">
          <img src={logo} alt="Logo Hormix" />
        </div>

        <div className="register-right">
          <form onSubmit={saveUser}>
            <h1>Regístrate</h1>

            <div className="register-group">
              <label>Nombre:</label>
              <input
                onChange={(e) => setNombre(e.target.value)}
                type="text"
                name="nombres"
                value={nombre}
                placeholder="Nombre Completo"
                required
              />
            </div>

              <div className="register-group">
                <label>Apellido:</label>
                <input
                  onChange={(e) => setApellido(e.target.value)}
                  type="text"
                  name="apellido"
                  value={apellido}
                  placeholder="Apellido"
                  required
                />
              </div>

            <div className="register-group">
              <label>Email:</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="Email"
                value={email}
                placeholder="Correo@gmail.com"
                required
              />
            </div>

            <div className="register-group">
              <label>Contraseña:</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                value={password}
                placeholder="********"
                required
              />
            </div>

            <div className="register-group">
              <label>Confirmar contraseña:</label>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="********"
                required
              />
            </div>

            <div className="register-group">
              <label>Tipo de documento:</label>
              <select
                onChange={(e) => setTipoDocumento(e.target.value)}
                name="tipoDocumento"
                value={tipoDocumento}
              >
                <option value="">Por favor selecciona</option>
                <option value="Cedula">Cédula</option>
                <option value="Extranjeria">Extranjería</option>
                <option value="Pasaporte">Pasaporte</option>
              </select>
            </div>

            <div className="register-group">
              <label>Documento:</label>
              <input
                onChange={(e) => setDocumento(e.target.value)}
                type="text"
                name="documento"
                value={documento}
                placeholder="Documento"
                required
              />
            </div>

            <div className="register-group">
              <label>Edad:</label>
              <input
                onChange={(e) => setEdad(e.target.value)}
                type="text"
                name="edad"
                value={edad}
                placeholder="Edad"
                required
              />
            </div>

            <button className="register-btn" type="submit">
              Registrarse
            </button>

            <p>
              ¿Ya tienes cuenta?
              <Link to="/login">Inicia sesión</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
