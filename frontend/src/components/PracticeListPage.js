import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./PracticeListPage.css";
import Header from "./Header";
import casonaImage from "./IMAGENES/Casona-2-scaled.jpg";

const PracticeListPage = () => {
  const [practices, setPractices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3900/api/practicas"); 
        if (!response.ok) {
          const errorData = await response.json();
          const errorMessage =
            errorData.mensaje || "Error al obtener las prácticas";
          throw new Error(errorMessage);
        }
        const data = await response.json();
        setPractices(data.practicas);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };

    fetchData(); 
  }, []); 

  return (
    <div className="Cabecera">
      <Header />
      <div
        className="homepage-container"
        style={{ backgroundImage: `url(${casonaImage})` }}
      >
        <div className="practice-list-container">
          <h2>Lista de Prácticas</h2>
          {error && (
            <div className="error-message">{error}</div>
          )} 
          <table>
            <thead>
              <tr>
                <th>Nombre del Estudiante</th>
                <th>Rol del Estudiante</th>
                <th>Empresa</th>
                <th>Fecha de Inicio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {practices.map((practice) => (
                <tr key={practice._id}>
                  <td>{practice.student_name}</td>
                  <td>{practice.name_practice}</td>
                  <td>{practice.company}</td>
                  <td>{new Date(practice.date_start).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/practicas/${practice._id}`}>
                      Ver Detalles
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Link to="/añadir-practica" className="add-button">
            Añadir Nueva Práctica
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PracticeListPage;