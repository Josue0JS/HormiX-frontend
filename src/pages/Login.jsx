import { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom'; 
import logo from '../assets/logo.png'; 
import { end_points } from '../services/api'
import { saveLocalStorage } from '../helpers/local-storage';
import { redirectAlert } from '../helpers/alert';


const Login = () => {
  const [getEmail, setEmail]  = useState('');
  const [getPassword, setPassword] = useState('');
  // const [users, setUsers] = useState([]); NO USAR HASTA TENER EL BACKEND FUNCIONAL

  //funciones
  //   function getUser(){
  //     fetch(end_points.users)
  //     .then((response) => response.json()) NO USAR HASTA TENER EL BACKEND FUNCIONAL
  //     .then((data) => setUsers(data))
  //   }

  // useEffect(() => {
  //   getUser();    NO USAR HASTA TENER EL BACKEND FUNCIONAL
  // }, []);

  // function findUser(){
  //   let auth = users.find((item) => getEmail == item.Email && getPassword == item.password); (NO USAR HASTA TENER EL BACKEND FUNCIONAL
  //   return auth 
  // }

  function findUser(){
  const users = JSON.parse(localStorage.getItem("users")) || [];

  let auth = users.find(
    (item) =>
      getEmail === item.Email &&
      getPassword === item.password
  );

  return auth;
}

  function signIn(){
    let user = findUser();
    if(user){
      saveLocalStorage("user", user)
      redirectAlert("Bienvenido al sistema " 
        + user.nombres,
         "Será redireccionado al panel principal en",
          "success", 
          "/dashboard" )
    } else {
      redirectAlert("Error de credenciales",
         "Esta ventana se cerrará en ", 
         "error",
          "/")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Datos de Login capturados:', { getEmail, getPassword });
    
    signIn();
  };

 return (
  <div className="login-wrapper">
    
    <div className="login-card">

      <div className="login-logo">
        <img src={logo} alt="Logo Hormix" />
      </div>

      {/* FORM */}
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

        <button type="submit">Entrar</button>

        <p>
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>

      </form>

    </div>

  </div>
);
};

export default Login;