import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import "./EvaluationFormPage.css";
import Header from "./Header";
import casonaImage from "./IMAGENES/Casona-2-scaled.jpg";

const EvaluationFormPage = () => {
  // State variables matching the backend model exactly
  const [name_evaluador, setNameEvaluador] = useState(""); 
  const [rol, setRol] = useState("docente"); 
  const [name_alumno, setNameAlumno] = useState(""); 
  const [date_start, setDateStart] = useState(""); 
  const [calification, setCalification] = useState("excelente"); 
  const [comentarios, setComentarios] = useState(""); 
  const [showPopup, setShowPopup] = useState(false); 
  const [name_empresa, setNameEmpresa] = useState(""); 

  const navigate = useNavigate(); 
  const [error, setError] = useState(null); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:3900/api/evaluacion", {
        name_evaluador,
        rol,
        name_alumno,
        date_start,
        calification,
        comentarios,
        name_empresa
      });

      handleShowPopup();
    } catch (error) {
      console.error("Error al crear la evaluación:", error);
      setError(error.message);
    }
  };

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate("/Inicio");
  };

  return (
    <div className="Cabecera">
      <Header />
      <div
        className="homepage-container"
        style={{ backgroundImage: `url(${casonaImage})` }}
      >
        <div className="evaluation-form-container">
          <h2>Evaluación de Desempeño del Alumno</h2>
          {error && (
            <div className="error-message">{error}</div>
          )} 
          <form onSubmit={handleSubmit}>
            {/* Nombre de la Empresa */}
            <div className="form-group">
              <label htmlFor="name-empresa">Nombre de la Empresa:</label>
              <input
                type="text"
                id="name-empresa"
                value={name_empresa}
                onChange={(e) => setNameEmpresa(e.target.value)}
                required
              />
            </div>

            {/* Nombre del Evaluador */}
            <div className="form-group">
              <label htmlFor="name-evaluador">Nombre del Evaluador:</label>
              <input
                type="text"
                id="name-evaluador"
                value={name_evaluador}
                onChange={(e) => setNameEvaluador(e.target.value)}
                required
              />
            </div>
            
            {/* Rol del Evaluador */}
            <div className="form-group">
              <label htmlFor="rol">Rol del Evaluador:</label>
              <select
                id="rol"
                value={rol}
                onChange={(e) => setRol(e.target.value)}
                required
              >
                <option value="docente">Docente</option>
                <option value="empleador">Empleador</option>
              </select>
            </div>

            {/* Nombre del Alumno */}
            <div className="form-group">
              <label htmlFor="name-alumno">Nombre del Alumno:</label>
              <input
                type="text"
                id="name-alumno"
                value={name_alumno}
                onChange={(e) => setNameAlumno(e.target.value)}
                required
              />
            </div>

            {/* Fecha de Inicio */}
            <div className="form-group">
              <label htmlFor="date-start">Fecha de Evaluación:</label>
              <input
                type="date"
                id="date-start"
                value={date_start}
                onChange={(e) => setDateStart(e.target.value)}
                required
              />
            </div>

            {/* Calificación */}
            <div className="form-group">
              <label htmlFor="calification">Calificación de Desempeño:</label>
              <select
                id="calification"
                value={calification}
                onChange={(e) => setCalification(e.target.value)}
                required
              >
                <option value="excelente">Excelente</option>
                <option value="bueno">Bueno</option>
                <option value="regular">Regular</option>
                <option value="deficiente">Deficiente</option>
              </select>
            </div>

            {/* Comentarios */}
            <div className="form-group">
              <label htmlFor="comentarios">Comentarios Adicionales:</label>
              <textarea
                id="comentarios"
                value={comentarios}
                onChange={(e) => setComentarios(e.target.value)}
              />
            </div>

            <button type="submit">Enviar Evaluación</button>
          </form>

          {showPopup && (
            <div className="popup">
              <div className="popup-content">
                <h2>Evaluación Enviada</h2>
                <p>Tu evaluación ha sido enviada con éxito.</p>
                <button onClick={handleClosePopup}>Cerrar</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EvaluationFormPage;