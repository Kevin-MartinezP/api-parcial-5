const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const proyectoSchema = new Schema({
  codigo: {type: String, require: [true, "El codigo del proyecto es requerido"]},
  nombre_proyecto: {type: String, require: [true, "El nombre del proyecto es obligatorio"]},
  monto: {type: Number, require: [true, "El monto es requerido"]},
  fecha: {type: String, require: [true, "La fecha del proyecto es requerida"]},
  pais_ejecuta: {type: String, enum: ["Guatemala", "Costa Rica"]}
});

module.exports = mongoose.model("Proyecto", proyectoSchema);