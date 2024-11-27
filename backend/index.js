// Es como realizar un import, aquí añadimos o incorporamos el archivo
// de la conexión creada a la base de datos.
// También importamos el modulo del servidor express y el cors para llamadas
// http de origenes cruzados o diferentes.
const { conexion } = require("./basedatos/conexion");
const express = require("express");
const cors = require("cors");

// Inicializar app
console.log("App de node arrancada");

// Conexion a la base de datos
conexion();

// Crear servidor Node
const app = express();
const puerto = 3900;

app.use(cors());

// Convertir body a objeto js
app.use(express.json()); // recibir datos con content-type app/json
app.use(express.urlencoded({extended:true}));

// RUTAS
const rutas_articulo = require("./rutas/articulo");
const rutas_usuario = require("./rutas/usuario_routes")
const rutas_practicas = require("./rutas/añadir_practica_routes");
const rutas_MiPerfil = require("./rutas/MiPerfil_ruta")
const rutas_Evaluacion = require("./rutas/Evaluacion_ruta")
const rutas_SubirDoc = require("./rutas/SubirDoc")
app.use("/api", rutas_usuario);
// Cargo las rutas
app.use("/api", rutas_articulo);
app.use("/api/practicas", rutas_practicas);
app.use("/api/miperfil", rutas_MiPerfil);
app.use("/api/evaluacion", rutas_Evaluacion);
app.use("/api/subirdoc", rutas_SubirDoc);


// *** Configuración para servir archivos estáticos y redirigir al index.html ***
const path = require('path'); 
app.use(express.static(path.join(__dirname, '../frontend/build'))); // Sirve los archivos desde la carpeta 'build'

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});


// Rutas prueba con datos en duro
app.get("/probando", (req, res) => {

 console.log("Se ha ejecutado el endpoint probando");

return res.status(200).json([{
 curso: "Desarrollo Web y Móvil",
 autor: "Alvaro Sanchez",
 url: "alvarosanchez73.com/react-node-express"
 },
 {
 curso: "Portafolio de Proyectos",
 autor: "Alvaro Sanchez",
 url: "alvarosanchez73.com/portafolio"
 },
 ]);

});

/*app.get("/motor", (req, res) => {

    return res.render("motor", {
        id: 1,
        nombre: "Alvaro Sanchez",
        web: "alvarosanchez.com"
    })

});
*/
app.get("/", (req, res) => {

return res.status(200).send(
 "<h1>Empezando a crear un api rest con node</h1>"
 );

});

// Crea servidor y escucha peticiones http
app.listen(puerto, () => {
 console.log("Servidor corriendo en el puerto " + puerto);
});

