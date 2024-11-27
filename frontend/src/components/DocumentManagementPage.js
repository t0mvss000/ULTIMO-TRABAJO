import React, { useState } from "react";
import axios from "axios";
import "./DocumentManagementPage.css";
import Header from "./Header";
import casonaImage from "./IMAGENES/Casona-2-scaled.jpg";

const DocumentManagementPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault(); // Evita que la página se recargue
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("documento", selectedFile);
        formData.append("boton_subir", "subir"); // Agrega el campo boton_subir

        const response = await axios.post(
          "http://localhost:3900/api/subirdoc/subir", 
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", 
            },
          }
        );

        // Actualiza la lista de archivos subidos si la solicitud fue exitosa
        setUploadedFiles([
          ...uploadedFiles,
          response.data.documento.seleccion_archivo,
        ]); 
        setSelectedFile(null);
        setShowPopup(true);
      } catch (error) {
        // Maneja el error y actualiza el estado de error
        console.error("Error al subir el documento:", error);
        setError(
          error.response?.data?.mensaje || "Error al subir el documento"
        ); 
      }
    } else {
      alert("Por favor, selecciona un archivo para subir.");
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Oculta el popup de confirmación
  };

  return (
    <div className="Cabecera">
      <Header />{" "}
      {/* Renderiza el componente Header */}
      <div
        className="homepage-container"
        style={{ backgroundImage: `url(${casonaImage})` }}
      >
        {/* Contenedor principal con la imagen de fondo */}
        <div className="document-management-container">
          {/* Contenedor de la sección de gestión de documentos */}
          <h2>Gestión de Documentos</h2>
          {error && (
            <div className="error-message">{error}</div>
          )}
          {/* Muestra el mensaje de error si existe */}
          <div className="upload-section">
            {}
            <form onSubmit={handleUpload}> {/* Agrega un formulario */}
              <input type="submit" name="boton_subir" value="Subir" className="upload-button" />
              <label htmlFor="file-upload" className="file-upload-label">
                Seleccionar Archivo
              </label>
              <input
                type="file"
                id="file-upload"
                className="file-upload-input"
                onChange={handleFileChange}
              />
            </form>
          </div>

          <h3>Documentos Subidos</h3>
          {}
          {uploadedFiles.length === 0 ? (
            <p className="no-documents">No hay documentos subidos.</p>
          ) : (
            <ul className="uploaded-files-list">
              {uploadedFiles.map((fileName, index) => (
                <li key={index}>{fileName}</li> 
              ))}
            </ul>
          )}

          {/* Renderiza el popup condicionalmente si showPopup es true */}
          {showPopup && (
            <div className="popup">
              <div className="popup-content">
                <p>Documento cargado exitosamente.</p>

                <button onClick={handleClosePopup}>Cerrar</button>{" "}
                {/* Botón para cerrar el popup */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentManagementPage;