const ProyectoMdl = require("../models/proyecto");

const codigoExistente = async(codigo) => {
    const existeCodigo = await ProyectoMdl.findOne({codigo});
    if(existeCodigo) {
        throw new Error(`El código ya esta registrado ${codigo}`)
    }
}
const nombreProyectoExistente = async(nombre_proyecto) => {
    const existeNombreProyecto = await ProyectoMdl.findOne({nombre_proyecto});
    if(existeNombreProyecto) {
        throw new Error(`El nombre del proyecto ya esta registrado ${nombre_proyecto}`)
    }
}

const existeProyectoPorId = async(id) => {
    const existeProyecto = await ProyectoMdl.findById(id);
    if(!existeProyecto) {
        throw new Error(`El id no existe ${id}`)
    }
}

module.exports = {
    codigoExistente,
    nombreProyectoExistente,
existeProyectoPorId
}