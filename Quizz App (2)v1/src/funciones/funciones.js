'use strict'
const Imagenes = require('../modelos/imagenes.js');
const Chunks = require('../modelos/chunks.js');
//Función para revolver los elmentos de un array.
exports.shuffle= function(array) {
    var currentIndex = array.length
            , temporaryValue
            , randomIndex
            ;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
   
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//----------------FUNCIONES PARA IMAGENES---------------//
//Función para buscar imagenes en base a su nombre original en el array de imagenes.
//Se aplica para la creación de examenes
exports.buscarImagen=function(imagenBuscada,arrayImagenes){
   
    var i;
    for( i in arrayImagenes){
        if(imagenBuscada==arrayImagenes[i].originalname){
            return arrayImagenes[i];
        }
      }
    
}
