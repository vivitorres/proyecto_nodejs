'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MaestrosSchema = Schema({
    n_ident: { type: Number, require:true, unique:true},
    nombre: { type: String, require: true},
    asignatura: { type: String, require: true},
    tipo_contrato: { type: String, require: true}
});

module.exports = mongoose.model('maestros', MaestrosSchema);