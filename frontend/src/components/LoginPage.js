import React, { useState } from 'react'; // Importa las funciones React y useState desde la librería 'react'
import { useNavigate } from 'react-router-dom'; // Importa la función useNavigate para la navegación
import './LoginPage.css'; // Importa el archivo CSS para los estilos de la página de login
import casonaImage from './IMAGENES/Casona-2-scaled.jpg'; // Importa la imagen de fondo

const LoginPage = () => {
  const [username, setUsername] = useState(''); // Almacena el nombre de usuario ingresado
  const [password, setPassword] = useState(''); // Almacena la contraseña ingresada
  const [error, setError] = useState(null); // Almacena un mensaje de error si la autenticación falla
  const navigate = useNavigate(); // Inicializa la función useNavigate para la navegación

  const handleSubmit = async (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar la página)

    // Simulación de la autenticación (sin API)
    if (username === 'Tomas' && password === '123') { 
      // Redirige a la página de inicio después de un inicio de sesión exitoso
      navigate('/Inicio'); 
    } else {
      setError('Usuario o contraseña incorrectos.'); // Muestra un mensaje de error si las credenciales son incorrectas
    }
  };

  return (
    <div className="homepage-container" style={{ backgroundImage: `url(${casonaImage})` }}> {/* Contenedor principal con la imagen de fondo */}
      <div className="login-container"> {/* Contenedor del formulario de login */}
        <h2>Iniciar Sesión</h2>
        {error && <div className="error-message">{error}</div>} {/* Mostrar mensaje de error si existe */}
        <form onSubmit={handleSubmit}> {/* Formulario con la función handleSubmit para manejar el envío */}
          <div className="form-group">
            <label htmlFor="username">Usuario:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Actualiza el estado 'username' cuando cambia el valor del input
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Actualiza el estado 'password' cuando cambia el valor del input
              required
            />
          </div>
          <button type="submit">Ingresar</button> {/* Botón para enviar el formulario */}
        </form>
      </div>
    </div>
  );
};

export default LoginPage; // Exporta el componente LoginPage para que pueda ser usado en otras partes de la aplicación