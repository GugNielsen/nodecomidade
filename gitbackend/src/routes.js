const express = require("express");
const crypto = require('crypto')
const conection = require('./database/conection');

const comercioController = require('./controller/ComerciosController')

const incidentesController = require('./controller/IncidentesController')

const secaoController = require('./controller/SelectionControllers')
const routes = express.Router();

routes.post('/comercio',comercioController.creat);

routes.get('/comercio',comercioController.list);

/// incidentes 
routes.post('/incidentes',incidentesController.creat);

routes.get('/incidentes',incidentesController.index);

routes.delete('/incidentes/delete/:id',incidentesController.delete)

/// secao
routes.post('/login',secaoController.login);

module.exports = routes