import React from 'react'; // Importa la función React desde la librería 'react'
import { Link } from 'react-router-dom'; // Importa el componente Link para la navegación
import './HomePage.css'; // Importa el archivo CSS para los estilos de la página de inicio
import casonaImage from './IMAGENES/Casona-2-scaled.jpg'; // Importa la imagen de fondo
import Header from './Header'; // Importa el componente Header

const HomePage = () => {
  return (
    <div className='Cabecera'> {/* Contenedor principal */}
      <Header /> {/* Renderiza el componente Header */}
      <div className="homepage-container" style={{ backgroundImage: `url(${casonaImage})` }}> {/* Contenedor con la imagen de fondo */}
        
        <div className="content-wrapper"> {/* Contenedor para el contenido principal */}
          <h2>Inicio</h2> 
          <div className="dashboard-links"> {/* Contenedor para los enlaces del dashboard */}
            <Link to="/practicas" className="dashboard-link"> {/* Enlace a la página de prácticas */}
              Lista de Prácticas
            </Link>
            <Link to="/documentos" className="dashboard-link"> {/* Enlace a la página de documentos */}
              Documentos
            </Link>
            <Link to="/perfil" className="dashboard-link"> {/* Enlace a la página de perfil */}
              Perfil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; // Exporta el componente HomePage para que pueda ser usado en otras partes de la aplicación
