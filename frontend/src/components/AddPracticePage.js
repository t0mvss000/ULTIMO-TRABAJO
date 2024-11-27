import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddPracticePage.css";
import casonaImage from "./IMAGENES/Casona-2-scaled.jpg";
import Header from "./Header";

const AddPracticePage = () => {
  const [nombre, setNombre] = useState("");
  const [nombreEstudiante, setNombreEstudiante] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3900/api/practicas",
        {
          name_practice: nombre,
          student_name: nombreEstudiante,
          company: empresa,
          date_start: fechaInicio,
          description: descripcion,
        }
      );

      console.log(response.data);
      handleShowPopup();
    } catch (error) {
      console.error("Error al crear la práctica:", error);
      setError(
        error.response?.data?.mensaje || "Error al crear la práctica"
      );
    }
  };

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate("/practicas");
  };

  return (
    <div className="Cabecera">
      <Header />
      <div
        className="homepage-container"
        style={{ backgroundImage: `url(${casonaImage})` }}
      >
        <div className="add-practice-container">
          <h2>Añadir Práctica</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombreEstudiante">Nombre del Estudiante:</label>
              <input
                type="text"
                id="nombreEstudiante"
                value={nombreEstudiante}
                onChange={(e) => setNombreEstudiante(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="nombre">Rol del Estudiante:</label>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="empresa">Empresa:</label>
              <input
                type="text"
                id="empresa"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="fechaInicio">Fecha de Inicio:</label>
              <input
                type="date"
                id="fechaInicio"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="descripcion">Descripción:</label>
              <textarea
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              />
            </div>
            <button type="submit">Guardar</button>
          </form>

          {showPopup && (
            <div className="popup">
              <div className="popup-content">
                <h2>Práctica Guardada</h2>
                <p>Los cambios en la práctica han sido guardados exitosamente.</p>
                <button onClick={handleClosePopup}>Volver al Inicio</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddPracticePage;