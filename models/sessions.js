'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSessionsSchema = Schema({
    user_id: { type: String, require:true, unique:true},
    jwt: String
});

module.exports = mongoose.model('sessions', UserSessionsSchema);