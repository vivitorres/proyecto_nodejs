'use strict'

const jwt = require('jsonwebtoken');
const sessions = require('../models/sessions');

let Sessions = require('../models/sessions');

const middlewares = {
    userProtectUrl: function(req, res, next){

        const token = req.headers['access-token'];

        if(token){

            jwt.verify(token, '6G6sLf9zZs551pu2pKi9mPO5XUXVO2wFKdbiTRnjkrB7TrD08z', (err, decoded) => {
                if(err){
                    return res.status(403).json({message: "Token invalido."});
                }else{
                    req.decoded = decoded;

                    Sessions.findOne({user_id: req.decoded.user_id, jwt: token}).exec((err, session) => {
                        if(err) return res.status(500).send({message: "Error al devolver los datos."});
                        if(!session) return res.status(404).send({message: "Los datos de autenticación no son validos."});
                    });

                    next();
                }
            });

        }else{
            res.status(403).send({
                message: "Token no valido."
            });
        }
    }
};

module.exports = middlewares;