'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const cuestionario = Schema({
    tipo: { type: 'String' },
    pregunta: Array,
    respuesta: Array
});

var modeloQuizz = Schema ({
    nivel:{type: String},
    grado:{type: String},
    materia:{type: String},
    bloque:{type: String},
    secuencia:{type: String},
    nombreQuizz:{type: String},
    estado:{type: 'String', enum:['revisado','por revisar'], default:"por revisar"},
    creador:{type: String},
    cuestionario:[cuestionario]
});



module.exports =
    mongoose.model('Quizz', modeloQuizz);
