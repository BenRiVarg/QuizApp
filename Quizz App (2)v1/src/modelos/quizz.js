'use strict'

const mongoose=require('mongoose');
const Schema= mongoose.Schema;


const cuestionario=Schema({
    tipo:{type: 'String'},
    pregunta: Array,
    respuesta: Array
});

var modeloQuizz = Schema ({
    nivel:{type: 'String', enum:['Primaria','Secundaria','Preparatoria']},
    grado:{type: 'Number'},
    claveMateria:{type: String},
    nombreQuizz:{type: String},
    estado:{type: 'String', enum:['revisado','por revisar'], default:"por revisar"},
    cuestionario:[cuestionario]
});



module.exports =
 mongoose.model('Quizz',modeloQuizz);
