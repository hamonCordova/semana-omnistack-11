const express = require("express");
const OngsController = require("./controllers/OngsController");
const IncidentsController = require("./controllers/IncidentsController");
const SessionsController = require("./controllers/SessionsController");

const routes = express.Router();

routes.get("/ongs", OngsController.index);

routes.post("/ongs", OngsController.create);

routes.delete("/ongs/deleteAll", OngsController.deleteAll);

routes.post("/incidents", IncidentsController.create);
routes.get("/incidents", IncidentsController.index);
routes.get("/incidents/:ongId", IncidentsController.getByOngId);
routes.delete("/incidents/:incidentId", IncidentsController.delete);

routes.post("/login", SessionsController.login);

module.exports = routes;
