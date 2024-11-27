import React from 'react'; // Importa la función React desde la librería 'react'
import { Link } from 'react-router-dom'; // Importa el componente Link para la navegación
import './Header.css'; // Importa el archivo CSS para el header

const Header = () => {
  return (
    <header> {/* Define la sección del encabezado */}
      <div className="nav-bar-general"> {/* Contenedor para el título principal */}
        <h1>PRACTICAS UNAB</h1> {/* Título principal del encabezado */}
      </div>
      <nav> {/* Define la sección de navegación */}
        <ul> {/* Lista desordenada para los enlaces de navegación */}
          <li> 
            <Link to="/Inicio">Inicio</Link> {/* Enlace a la página de inicio */}
          </li>
          <li>
            <Link to="/practicas">Lista de Prácticas</Link> {/* Enlace a la página de lista de prácticas */}
          </li>
          <li>
            <Link to="/añadir-practica">Añadir Práctica</Link> {/* Enlace a la página para añadir prácticas */}
          </li>
          <li>
            <Link to="/evaluacion">Evaluación</Link> {/* Enlace a la página de evaluación */}
          </li>
          <li>
            <Link to="/perfil">Mi Perfil</Link> {/* Enlace a la página de perfil */}
          </li>
          <li>
            <Link to="/documentos">Documentos</Link> {/* Enlace a la página de documentos */}
          </li>
          <li>
            <Link to="/login">Cerrar Sesión</Link> {/* Enlace a la página de cierre de sesión */}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header; // Exporta el componente Header para que pueda ser usado en otras partes de la aplicación