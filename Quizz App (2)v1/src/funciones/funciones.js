'use strict'

exports.buscarImagen=function(imagenBuscada,arrayImagenes){
   
    var i;
    for( i in arrayImagenes){
        if(imagenBuscada==arrayImagenes[i].originalname){
            return arrayImagenes[i];
        }
      }
    
}