const mongoose = require("mongoose");
const Proyecto = mongoose.model("Proyecto");


exports.buscarTodosProyectos = function (req, res) {
  Proyecto.find(function (err, proyecto) {
    if (err) res.send(500, err.message);

    console.log("GET /api");
    res.status(200).jsonp(proyecto);
  });
};

exports.buscarPorId = function(req, res) {
    Proyecto.findById(req.params.id, function(err, proyecto) {
    if(err) return res.send(500, err.message);

    console.log('GET /api/' + req.params.id);
        res.status(200).jsonp(proyecto);
    });
};

//POST 
exports.agregarProyecto = function (req, res) {
    console.log("POST");
    console.log(req.body);
  
    const proyecto = new Proyecto({
        codigo: req.body.codigo,
        nombre_proyecto: req.body.nombre_proyecto,
        monto: req.body.monto,
        fecha: req.body.fecha,
        pais_ejecuta: req.body.pais_ejecuta
    });
  
    proyecto.save(function (err, proyecto) {
      if (err) return res.status(500).send(err.message);
      res.status(200).jsonp(proyecto);
    });
  };

  //PUT
  exports.actualizarProyecto = function (req, res) {
    Proyecto.findById(req.params.id, function (err, proyecto) {
      proyecto.codigo = req.body.codigo;
      proyecto.nombre_proyecto = req.body.nombre_proyecto;
      proyecto.monto = req.body.monto;
      proyecto.fecha = req.body.fecha;
      pais_ejecuta = req.body.pais_ejecuta;

      proyecto.save(function (err) {
        if (err) return res.status(500).send(err.message);
        res.status(200).jsonp(proyecto);
      });
    });
  };

  exports.borrarProyecto = function (req, res) {
    Proyecto.findById(req.params.id, function (err, proyecto) {
      proyecto.remove(function (err) {
        if (err) return res.status(500).send(err.message);
        res.status(200).send();
      });
    });
  };