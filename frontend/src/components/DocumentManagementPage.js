import React, { useState } from "react";
import axios from "axios";
import "./DocumentManagementPage.css";
import Header from "./Header";
import casonaImage from "./IMAGENES/Casona-2-scaled.jpg";
import { FileText, FileSpreadsheet, Mail, Clipboard } from 'lucide-react';

const DocumentManagementPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [error, setError] = useState(null);

  const documentTypes = [
    { 
      icon: <FileText size={40} className="document-icon"/>, 
      name: "Informes de Prácticas", 
      description: "Documentos que resumen tu experiencia y aprendizajes" 
    },
    { 
      icon: <Mail size={40} className="document-icon"/>, 
      name: "Cartas de Recomendación", 
      description: "Cartas de tu empleador o supervisor que avalan tu desempeño" 
    },
    { 
      icon: <Clipboard size={40} className="document-icon"/>, 
      name: "Documentos de Evaluación", 
      description: "Formatos de evaluación completados durante tus prácticas" 
    },
    { 
      icon: <FileSpreadsheet size={40} className="document-icon"/>, 
      name: "Otros Documentos", 
      description: "Cualquier otro documento relevante de tus prácticas" 
    }
  ];

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("documento", selectedFile);
        formData.append("boton_subir", "subir");

        const response = await axios.post(
          "http://localhost:3900/api/subirdoc/subir", 
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", 
            },
          }
        );

        setUploadedFiles([
          ...uploadedFiles,
          response.data.documento.seleccion_archivo,
        ]); 
        setSelectedFile(null);
        setShowPopup(true);
      } catch (error) {
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
    setShowPopup(false);
  };

  return (
    <div className="Cabecera">
      <Header />
      <div
        className="homepage-container"
        style={{ backgroundImage: `url(${casonaImage})` }}
      >
        <div className="document-management-container">
          <h2>Gestión de Documentos de Prácticas</h2>
          
          <div className="document-types-section">
            <h3>Tipos de Documentos Aceptados</h3>
            <div className="document-type-grid">
              {documentTypes.map((type, index) => (
                <div key={index} className="document-type-card">
                  {type.icon}
                  <h4>{type.name}</h4>
                  <p>{type.description}</p>
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className="error-message">{error}</div>
          )}
          
          <div className="upload-section">
            <form onSubmit={handleUpload}>
              <div className="file-upload-container">
                <label htmlFor="file-upload" className="file-upload-label">
                  {selectedFile ? selectedFile.name : "Seleccionar Archivo"}
                </label>
                <input
                  type="file"
                  id="file-upload"
                  className="file-upload-input"
                  onChange={handleFileChange}
                />
                <button type="submit" className="upload-button">
                  Subir Documento
                </button>
              </div>
            </form>
          </div>

          <div className="uploaded-documents-section">
            <h3>Documentos Subidos</h3>
            {uploadedFiles.length === 0 ? (
              <p className="no-documents">Aún no has subido documentos.</p>
            ) : (
              <ul className="uploaded-files-list">
                {uploadedFiles.map((fileName, index) => (
                  <li key={index} className="uploaded-file-item">
                    <FileText size={20} /> {fileName}
                  </li> 
                ))}
              </ul>
            )}
          </div>

          {showPopup && (
            <div className="popup">
              <div className="popup-content">
                <h2>Documento Cargado</h2>
                <p>El documento se ha subido exitosamente.</p>
                <button onClick={handleClosePopup}>Cerrar</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentManagementPage;