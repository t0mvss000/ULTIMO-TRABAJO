import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import casonaImage from "./IMAGENES/Casona-2-scaled.jpg";
import "./PracticeDetailsPage.css";

const PracticeDetailPage = () => {
  const [practice, setPractice] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPracticeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3900/api/practicas/${id}`);
        setPractice(response.data.practica);
      } catch (error) {
        console.error("Error al obtener los detalles de la práctica:", error);
        setError("No se pudieron cargar los detalles de la práctica");
      }
    };

    fetchPracticeDetails();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta práctica?")) {
      try {
        await axios.delete(`http://localhost:3900/api/practicas/${id}`);
        navigate("/practicas");
      } catch (error) {
        console.error("Error al eliminar la práctica:", error);
        setError("No se pudo eliminar la práctica");
      }
    }
  };

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <Link to="/practicas">Volver a la lista de prácticas</Link>
      </div>
    );
  }

  if (!practice) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="Cabecera">
      <Header />
      <div
        className="homepage-container"
        style={{ backgroundImage: `url(${casonaImage})` }}
      >
        <div className="practice-detail-container">
          <h2>Detalles de la Práctica</h2>
          <div className="practice-details">
            <div className="detail-row">
              <strong>Nombre del Estudiante:</strong>
              <span>{practice.student_name}</span>
            </div>
            <div className="detail-row">
              <strong>Rol del Estudiante:</strong>
              <span>{practice.name_practice}</span>
            </div>
            <div className="detail-row">
              <strong>Empresa:</strong>
              <span>{practice.company}</span>
            </div>
            <div className="detail-row">
              <strong>Fecha de Inicio:</strong>
              <span>{new Date(practice.date_start).toLocaleDateString()}</span>
            </div>
            <div className="detail-row description">
              <strong>Descripción:</strong>
              <p>{practice.description}</p>
            </div>
          </div>
          <div className="practice-actions">
            <Link to={`/editar-practica/${id}`} className="edit-button">
              Editar Práctica
            </Link>
            <button onClick={handleDelete} className="delete-button">
              Eliminar Práctica
            </button>
            <Link to="/practicas" className="back-button">
              Volver a la Lista
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeDetailPage;