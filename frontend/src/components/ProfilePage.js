import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProfilePage.css";
import Header from "./Header";
import casonaImage from "./IMAGENES/Casona-2-scaled.jpg";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("http://localhost:3900/api/miperfil");

        setName(response.data.perfil.name);
        setEmail(response.data.perfil.gmail);
        setProfileImagePreview(response.data.perfil.image);
      } catch (error) {
        console.error(error);
        setError(error.response?.data?.mensaje || "Error al obtener el perfil");
      }
    };

    fetchProfileData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("gmail", email);
      if (profileImage) {
        formData.append("image", profileImage);
      }

      await axios.put("http://localhost:3900/api/miperfil", formData, {
        headers: {
          
        },
      });

      if (profileImage) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfileImagePreview(reader.result);
        };
        reader.readAsDataURL(profileImage);
      }

      setIsEditing(false);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.mensaje || "Error al actualizar el perfil");
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setName(name);
    setEmail(email);
    setProfileImage(null);
    setProfileImagePreview(profileImagePreview);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
        <div className="profile-container">
          {/* Contenedor del perfil */}
          <h2>Mi Perfil</h2>
          {error && <div className="error-message">{error}</div>}
          {/* Muestra el mensaje de error si existe */}
          <div className="profile-info">
            {/* Contenedor de la información del perfil */}
            <div className="profile-image">
              {/* Contenedor de la imagen de perfil */}
              {profileImagePreview ? ( // Renderiza la imagen de perfil si existe una previsualización
                <img src={profileImagePreview} alt="Previsualización" />
              ) : (
                // Si no hay previsualización, muestra una imagen por defecto
                <img
                  src="ruta/a/imagen/por/defecto.jpg"
                  alt="Imagen de Perfil"
                />
              )}

              {isEditing && (
                <label
                  htmlFor="profile-image-upload"
                  className="upload-button"
                >
                  {/* Etiqueta para el botón de cambio de imagen */}
                  Cambiar Imagen
                </label>
              )}

              {isEditing && (
                <input
                  type="file"
                  id="profile-image-upload"
                  accept="image/*"
                  onChange={handleImageChange} // Llama a la función handleImageChange cuando se selecciona una imagen
                  style={{ display: "none" }} // Oculta el input de tipo "file"
                />
              )}
            </div>

            {isEditing ? (
              // Renderiza el formulario de edición si isEditing es true
              <div className="edit-mode">
                <div className="form-group">
                  <label htmlFor="name">Nombre:</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} // Actualiza el estado 'name' al cambiar el input
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Actualiza el estado 'email' al cambiar el input
                  />
                </div>

                <button onClick={handleSaveClick}>Guardar</button>{" "}
                {/* Botón para guardar los cambios */}
                <button onClick={handleCancelClick}>Cancelar</button>{" "}
                {/* Botón para cancelar la edición */}
              </div>
            ) : (
              // Renderiza la vista del perfil si isEditing es false
              <div className="view-mode">
                <p>
                  <strong>Nombre:</strong> {name}
                </p>{" "}
                {/* Muestra el nombre */}
                <p>
                  <strong>Email:</strong> {email}
                </p>{" "}
                {/* Muestra el email */}
                <button onClick={handleEditClick}>Editar Perfil</button>{" "}
                {/* Botón para editar el perfil */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;