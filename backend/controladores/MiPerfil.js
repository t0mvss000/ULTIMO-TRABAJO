const MiPerfil = require("../modelos/MiPerfil_m");

const MiPerfilController = {
  // Obtener información del perfil del usuario
  getMiPerfil: async (req, res) => {
    try {
      // Intenta buscar un perfil existente
      let perfil = await MiPerfil.findOne();

      // Si no existe, crea uno nuevo con valores por defecto
      if (!perfil) {
        perfil = new MiPerfil({
          name: "Nombre por defecto",
          gmail: "correo@ejemplo.com",
          image: null,
        });
        await perfil.save();
      }

      return res.status(200).json({
        status: "éxito",
        perfil,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: "error",
        mensaje: "Error al obtener el perfil",
      });
    }
  },

  // Actualizar la información del perfil del usuario
  updateMiPerfil: async (req, res) => {
    try {
      // Busca el perfil existente (asumimos que ya existe uno)
      let perfil = await MiPerfil.findOne();

      // Si no existe (aunque asumimos que sí), crea uno nuevo
      if (!perfil) {
        perfil = new MiPerfil();
      }

      // Actualiza los campos del perfil con los datos del formulario
      perfil.name = req.body.name;
      perfil.gmail = req.body.gmail;
      perfil.image = req.body.image;

      await perfil.save();

      return res.status(200).json({
        status: "éxito",
        mensaje: "Perfil actualizado",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: "error",
        mensaje: "Error al actualizar el perfil",
      });
    }
  },

  // Cambiar la contraseña del usuario (si la implementas)
  cambiarContrasena: async (req, res) => {
    
  },
};

module.exports = MiPerfilController;