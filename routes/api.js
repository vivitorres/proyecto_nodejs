'use strict'
const express = require("express");
const api = express.Router();
const {body} = require('express-validator');

var WelcomeController = require('../controllers/welcome');
var AlumnosController = require('../controllers/alumnosController');
var MaestrosController = require('../controllers/maestrosController');
let AuthController = require('../controllers/auth');

let userProtectUrl = require('../middlewares/authUser').userProtectUrl;


api.get("/", WelcomeController.welcome);

//Enrutador Alumnos

api.get("/alumnos", AlumnosController.alumnos);
api.get("/alumno/:n_lista", AlumnosController.alumno);
api.post("/alumno", userProtectUrl, [
    body('n_cuenta').not().isEmpty(),
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty()
], AlumnosController.crear_alumno);

api.put("/alumno/:n_lista", [
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty()
], AlumnosController.update_alumno);


api.delete("/alumno/:n_lista", AlumnosController.delete_alumno);

//Enrutador Maestros

api.get("/maestros", MaestrosController.maestros);
api.get("/maestro/:n_lista", MaestrosController.maestro);
api.post("/maestro", userProtectUrl, [
    body('n_ident').not().isEmpty(),
    body('nombre').not().isEmpty(),
    body('asignatura').not().isEmpty(),
    body('tipo_contrato').not().isEmpty()
], MaestrosController.crear_maestro);

api.put("/maestro/:n_lista", userProtectUrl, [
    body('asignatura').not().isEmpty(),
    body('tipo_contrato').not().isEmpty()
], MaestrosController.update_maestro);


api.delete("/maestro/:n_lista", userProtectUrl, MaestrosController.delete_maestro);


//Enrutador Sesiones

api.post("/login", [
    body('mail').not().isEmpty(),
    body('password').not().isEmpty()
], AuthController.login);


api.post("/logout", userProtectUrl, AuthController.logout);



module.exports = api;