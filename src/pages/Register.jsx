import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { saveLocalStorage } from "../helpers/local-storage";
import { redirectAlert } from "../helpers/alert";

const Register = () => {

  const [form, setForm] = useState({
    nombres: "",
    Email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = () => {

    if (form.password !== form.confirmPassword) {
      redirectAlert(
        "Las contraseñas no coinciden",
        "Intenta nuevamente en",
        "error",
        "/register"
      );
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userExist = users.find(user => user.Email === form.Email);

    if (userExist) {
      redirectAlert(
        "El usuario ya existe",
        "Redirigiendo en",
        "error",
        "/register"
      );
      return;
    }

    const newUser = {
      id: Date.now(),
      nombres: form.nombres,
      Email: form.Email,
      password: form.password,
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    saveLocalStorage("user", newUser);

    redirectAlert(
      "Usuario registrado correctamente",
      "Entrando al sistema en",
      "success",
      "/"
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser();
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">

        <div className="register-left">
          <img src={logo} alt="Logo Hormix" />
        </div>

        <div className="register-right">
          <form onSubmit={handleSubmit}>
            <h1>Regístrate</h1>

            <div className="register-group">
              <label>Nombre completo:</label>
              <input
                type="text"
                name="nombres"
                value={form.nombres}
                onChange={handleChange}
                placeholder="Nombre Completo"
                required
              />
            </div>

            <div className="register-group">
              <label>Email:</label>
              <input
                type="email"
                name="Email"
                value={form.Email}
                onChange={handleChange}
                placeholder="Correo@gmail.com"
                required
              />
            </div>

            <div className="register-group">
              <label>Contraseña:</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="********"
                required
              />
            </div>

            <div className="register-group">
              <label>Confirmar contraseña:</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="********"
                required
              />
            </div>

            <button className="register-btn" type="submit">
              Registrarse
            </button>

            <p>
              ¿Ya tienes cuenta? <Link to="/">Inicia sesión</Link>
            </p>

          </form>
        </div>

      </div>
    </div>
  );
};

export default Register;