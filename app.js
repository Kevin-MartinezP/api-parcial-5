const { check, validationResult } = require("express-validator");
const cors = require("cors");

const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require("mongoose");
    const proyecto = express.Router();
    require("dotenv").config();
    const {codigoExistente, nombreProyectoExistente, existeProyectoPorId} = require("./helpers/validacion-db");
//Importando modelo y controladores
    const models = require("./models/proyecto");
    const ProyectoCtrl = require("./controllers/proyecto")

//Inicia el server
mongoose.connect(process.env.DBCONNECTION, function (err, res) {
  if (err) {
    console.log("ERROR: connecting to Database. " + err);
  }
});

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static("public"));
app.use(cors());

const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
    return res.status(400).json(errors)
    }
    next();
}

//API routes
proyecto.route('/proyecto')
  .get(ProyectoCtrl.buscarTodosProyectos);
//API POST
  proyecto.post("/proyecto",[
    check("codigo", "El código no puede estar vacío").not().isEmpty(),
    check("codigo").custom(codigoExistente),
    check("nombre_proyecto", "El nombre del proyecto no puede estar vacío").not().isEmpty(),
    check("nombre_proyecto").custom(nombreProyectoExistente),
    check("monto", "El monto no puede estar vacío").not().isEmpty(),
    check("fecha", "La fecha no puede estar vacía").not().isEmpty(),
    validarCampos
  ], ProyectoCtrl.agregarProyecto);

proyecto.route('/proyecto/:id')
  .get(ProyectoCtrl.buscarPorId);
  proyecto.put("/proyecto/:id", [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeProyectoPorId),
    check("codigo", "El código no puede estar vacío").not().isEmpty(),
    check("codigo").custom(codigoExistente),
    check("nombre_proyecto", "El nombre del proyecto no puede estar vacío").not().isEmpty(),
    check("nombre_proyecto").custom(nombreProyectoExistente),
    check("monto", "El monto no puede estar vacío").not().isEmpty(),
    check("fecha", "La fecha no puede estar vacía").not().isEmpty(),
    validarCampos
  ], ProyectoCtrl.actualizarProyecto)
  .delete("/proyecto/:id", ProyectoCtrl.borrarProyecto);

app.use("/api", proyecto)


app.listen(8080, function () {
  console.log("Node server running on http://localhost:8080");
});