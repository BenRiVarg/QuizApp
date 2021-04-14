//Archivo para editar los quizzes

function editarIT(){
   
    var i=0;
    //Rastreo del div por su clase, que define el tipo de pregunta
    var cuestionarios=document.getElementsByClassName("tipoIT");
    
    
    //Clasificación de los elementos enviados para no tener conflictos en la request
    for(i=0;i<cuestionarios.length;i++){
    
    //Se agrega el tipo de pregunta por medio de un elemento hidden
    var tipoHTML=contadorTipo();
    //Definición del tipo de pregunta
    tipoHTML.value="tipoIT";
    //inserción
    cuestionarios[i].appendChild(tipoHTML);
    
    //Captura de la imagen
    var imagen = cuestionarios[i].querySelectorAll("input.imgs");

    var pivoteImagen=imagen[0].files[0];
    var imagenHTML = cuestionarios[i].querySelectorAll("input.imagenrequest");
    imagenHTML[0].name="imagen"+contador;
    if(!pivoteImagen){
        //No se ha seleccionado una nueva imagenes
        imagenHTML[0].value="existente";
    }
    else{
        var valorImagen=imagen[0].files[0].name;
         //Creación de un espacio en blanco en un array para enviar el id de la imagen
    imagenHTML[0].value=valorImagen;

    console.log(imagenHTML[0]);
    }
    
     
  
    
    var pregunta = cuestionarios[i].querySelectorAll("input.pregunta");
    pregunta[0].name="pregunta"+contador;
  
    
  
    var respuesta = cuestionarios[i].querySelectorAll("input.respuesta");
    respuesta[0].name="respuesta"+contador;
  
    contador=contador+1;
    }
  
    
    
  }

function envioQuizzEditado(){
    var formulario=document.getElementById("formularioQuizz");
 
     //creación e inserción de un elemento con el número de preguntas del cuestionario
    var numeroPreguntas=document.getElementsByClassName("cuestionario").length;
    var numeroHTML=document.createElement("INPUT");
     numeroHTML.type = "hidden";
     numeroHTML.name="numeroPreguntas";
     numeroHTML.value = numeroPreguntas;
     
     editarIT();
     insertor.appendChild(numeroHTML);
     formulario.submit();
}