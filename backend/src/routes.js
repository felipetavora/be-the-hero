const express = require('express');
const SessionController = require('./controllers/SessionController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const OngController = require('./controllers/OngController');
const routes = express.Router();


//criando uma session(login) com o id da ong
routes.post('/sessions', SessionController.create);
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);
//listando apenas incidentes de uma ong específica
routes.get('/profile', ProfileController.index);
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;