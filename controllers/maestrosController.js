'use strict'

const {validationResult} = require('express-validator');

var Maestros = require('../models/maestros');

var controller = {
    maestros: function(req, res){

        Maestros.find({}).exec((err, maestros) =>{
            if(err) return res.status(500).json({status: 500, mensaje: err});
            if(!maestros) return res.status(200).json({status: 200, mensaje: "No hay maestros por listar."});

            return res.status(200).json({
                status: 200,
                data: maestros
            });
        });
    },

    maestro: function(req, res){

        let n_lista = req.params.n_lista;
        
        Maestros.findOne({n_ident: n_lista}).exec((err, maestro) =>{
            if(err) return res.status(500).json({status: 500, mensaje: err});
            if(!maestro) return res.status(200).json({status: 200, mensaje: "No se encontró el maestro."});

            return res.status(200).json({
                status: 200,
                data: maestro
            });
        });
    },

    crear_maestro: function(req, res){

        //Validamos los datos que se envían al endpoint
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() });
        }

        let user_info = req.body;

        Maestros.findOne({n_ident: user_info.n_ident}).exec((err, maestro) =>{
            if(err) return res.status(500).json({status: 500, mensaje: err});
            if(maestro) return res.status(200).json({status: 200, mensaje: "El número de identificación ya existe."});
        
            let maestros_model = new Maestros();

            maestros_model.n_ident = user_info.n_ident;
            maestros_model.nombre = user_info.nombre;
            maestros_model.asignatura = user_info.asignatura;
            maestros_model.tipo_contrato = user_info.tipo_contrato;

            maestros_model.save((err, maestroStored) => {
                if(err) return res.status(500).json({status: 500, mensaje: err});
                if(!maestroStored) return res.status(200).json({status: 200, mensaje: "No se logró almacenar maestro."});
            });
            
            return res.status(200).json({
                status: 200,
                message: "Usuario almacenado."
            });
        });
    },

    update_maestro: function(req, res) {

        //Validamos los datos que se envían al endpoint
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() });
        }

        let n_lista = req.params.n_lista;
        let user_info = req.body;

        let maestro_info_update = {
            asignatura: user_info.asignatura,
            tipo_contrato: user_info.tipo_contrato
        };

        Maestros.findOneAndUpdate({n_ident: n_lista}, maestro_info_update, {new:true}, (err, maestroUpdate) => {
            if(err) return res.status(500).send({message: 'Error al actualizar.'});
            if(!maestroUpdate) return res.status(404).json({message: 'No existe el maestro'});

            return res.status(200).json({
                asignatura: maestroUpdate.asignatura,
                tipo_contrato: maestroUpdate.tipo_contrato
            })
        })
    },

    delete_maestro: function(req, res) {

        let n_lista = req.params.n_lista;

        Maestros.findOneAndRemove({n_ident: n_lista}, (err, maestroDelete) => {
            if(err) return res.status(500).send({message: 'Error al eliminar.'});
            if(!maestroDelete) return res.status(404).json({message: 'No existe el maestro'});

            return res.status(200).json({
                message: "Usuario eliminado."
            })
        })
    }
    
};

module.exports = controller;