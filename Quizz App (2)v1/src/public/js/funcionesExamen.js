
//Tamaño Imágenes=1000*600


var formulario=document.getElementById("quizz");
//Nos aseguramos de no estar guardando otros valores
formulario.reset()

var impedimento=1
console.log(impedimento);
//Variable para recuperar las respuestas del alumno
var respuestasAlumnoD=[];
var retornable=document.getElementsByClassName("retornable")[0];
matematicas();
contadorItemsMultiples();

//----------Empiezan Funciones de Mate-----//
function matematicas(){
 var preguntasMate=document.getElementsByClassName("mate");
 var identificadoresMate=document.querySelectorAll("input.tipoMate");
 var strVar="";


     
 //Busqueda de los espacios para poner preguntas de matemáticas
 for(i=0;i<preguntasMate.length;i++){
       var pregunta=preguntasMate[i].textContent;
       //variable para rellenar los inputs y conocer si el resultado debe ser en fracciones o enteros
       
     
         //Eliminación de todos los espacios en blanco
       pregunta=pregunta.replace(/\s+/g, ''); 
       //limipiamos la variable
       strVar="";
       //Proceso sin fracciones
       if(pregunta.search("_")==-1){
           //Conversión de la expresión a HTML
           for(j=0;j<pregunta.length;j++){
                 var caracter=pregunta.slice(j,j+1);
                   if (Number.isInteger(parseInt(caracter))){
                       strVar += "  <div class=\"col-1 py-3\"  >";
                       strVar += "            <h1 class=\"text-center text-dark\">"+caracter+"<\/h1>";
                       strVar += "          <\/div>";
                   }
                   else{
                       strVar += "<div class=\"col-1 align-middle py-3\"  >";
                       strVar += "            <h1 class=\"text-center text-dark \">"+caracter+"<\/h1> ";
                       strVar += "          <\/div>";
                   }
             }

             //Añadir elementos para enviar respuesta
             strVar += "    <div class=\"col-1 py-3\"  >";
             strVar += "                <h1 class=\"text-center text-dark \">=<\/h1> ";
             strVar += "              <\/div>";
             strVar += "              <div class=\"col-1 pt-4\"  >";
             strVar += "                  <div class=\"pt-1 \">";
             strVar += "                    <input type=\"number\"   class=\"alumnoResponde\" pt-2\">";
             strVar += "                  <\/div >";
             strVar += "                  ";
             strVar += "              <\/div>";
             strVar += "            <\/div>  ";
             preguntasMate[i].parentElement.insertAdjacentHTML("beforeend",strVar);
             
            identificadoresMate[i].value="entero"
             //preguntasMate[i].querySelectorAll("input.tipoMate")[0].value="entera"
            // preguntasMate[i].remove();
       }//if
       else{//Proceso con Fracciones
        console.log(pregunta);
        for(j=0;j<pregunta.length;j++){
                var caracter=pregunta.slice(j,j+1);
                console.log("Iteración: "+j);
                console.log("Caracter I: "+caracter)
                if (Number.isInteger(parseInt(caracter))){
                    var posibleFraccion=fraccion(caracter,pregunta,j);
                    if(posibleFraccion.esFraccion){
                        
                        strVar += "   <div class=\"col-1\"  >";
                        strVar += "              <h1 class=\"text-center text-dark\">"+posibleFraccion.numerador+"<\/h1>";
                        strVar += "               <h1 class=\"border-top border-dark text-center text-center text-dark\">"+posibleFraccion.denominador+"<\/h1>";
                        strVar += "            <\/div>";
     
                       
                        j=posibleFraccion.iteracion;
                    }
                    else{
                        //Impresión de Numero Entero
                        strVar += "  <div class=\"col-1 py-4\"  >";
                        strVar += "            <h1 class=\"text-center text-dark\">"+caracter+"<\/h1>";
                        strVar += "          <\/div>";
                       
                    }
                   
                
                }
                   //Operandos
                   else{
                    if (!Number.isInteger(parseInt(caracter))){
                    strVar += " <div class=\"col-1 \"  >";
                    strVar += "              <h1 class=\"text-center text-dark pt-4\">"+caracter+"<\/h1> ";
                    strVar += "            <\/div>";
                    }
                  }

                  
         }
           //Añadir elementos para enviar respuesta
           strVar += "  <div class=\"col-1 \"  >";
           strVar += "              <h1 class=\"text-center text-dark pt-4\">=<\/h1> ";
           strVar += "            <\/div>";
           strVar += "            <div class=\"col-3\"  >";
           strVar += "                <div class=\"pt-3 \">";
           strVar += "                  <input type=\"number\" class=\"numerador\" name=\"\" id=\"\" class=\" pt-2\" min=\"0\">";
           strVar += "                <\/div >";
           strVar += "                <div class=\"pt-1\">";
           strVar += "                  <input type=\"number\"  class=\"denominador\" name=\"\" id=\"\" class=\" pt-2\" min=\"0\">";
           strVar += "                <\/div>";
           strVar += "            <\/div>";

         preguntasMate[i].parentElement.insertAdjacentHTML("beforeend",strVar);
                 identificadoresMate[i].value="fraccion";
       
       }
   }//for preguntas
   
   //Removemos todos los <P> para que no sea confuso
   
  var destructor=preguntasMate.length;
   for(var i=0;i<destructor;i++){
    preguntasMate[0].remove();
   }
  
}

  
  function fraccion(numero,expresion,iteracion){
    var resultado={
      numerador: 0,
      denominador:0,
      iteracion:0,
      esFraccion: false
    };
   
    var operando=expresion.slice(iteracion+1,iteracion+2);
  
    console.log("Valor recibido por la Función Fracción : "+operando);
    //Si el próximo espacio en el string es guion bajo convertimos a fracción
    if(operando=="_"){
      resultado.esFraccion=true;
      console.log("Debe Convertirse a fracción")
      var denominador=expresion.slice(iteracion+2,iteracion+3);
      resultado.denominador=denominador;
      resultado.iteracion=iteracion+2;
      resultado.numerador=numero;
    }
    else{ //Devolvemos los mismos datos que nos fueron dados en caso negativo
     resultado.numerador=numero;
     resultado.iteracion=iteracion; 
    }
  
    
  
     return resultado
  }


//-----------Terminan Funciones de Mate




function contadorItemsMultiples(){
        
    //Buscamos todos aquellos elementos que tengan más de una respuesta
    var cuestionariosMultiples=document.getElementsByClassName("contadorItems");

    for(var i=0;i<cuestionariosMultiples.length;i++){
        //Separamos el elemento a procesar
        var claveI=cuestionariosMultiples[i].value;
    
        var selectorI="items"+claveI;

        //Conseguimos el elemento que contiene los items
        var itemsCuestionario=document.getElementById(selectorI);

        //Contamos cuantos items tiene ese cuestionario
        var contadorItems=itemsCuestionario.querySelectorAll(".reactivo").length;

        //Y lo reasignamos para que pueda ser leído por la request en el cuestionario N
        cuestionariosMultiples[i].value=contadorItems;
    }
}

//Función para renombrar o crear  los inputs de los alumnos para que sean leídos por la request
function envioRespuestasMate(){
    var identificadoresMate=document.querySelectorAll("input.tipoMate");


    
    for(var i=0;i<identificadoresMate.length;i++){
        //Localización de la pregunta  donde vamos a inyectar las respuestas del alumno
        var preguntaMate=identificadoresMate[i].parentElement;
      //  console.log(preguntaMate.value);

        if(identificadoresMate[i].value=="entero"){
            var respuestaAlumno
           
             var respuestaAlumnoHTML=preguntaMate.querySelectorAll("input.alumnoResponde");
            respuestaAlumnoHTML[0].name="respuesta"+identificadoresMate[i].id;
            respuestaAlumnoHTML[0].value=parseInt(respuestaAlumnoHTML[0].value).toFixed(3);
            console.log(respuestaAlumnoHTML[0].value);
            //respuestaAlumnoHTML[0].value=(respuestaAlumnoHTML[0].value).toFixed(3);
        }
        else{
            
           
            var numeradorAlumno=preguntaMate.querySelectorAll("input.numerador");
            var denominadorAlumno=preguntaMate.querySelectorAll("input.denominador");

            var respuestaAlumno=(numeradorAlumno[0].value/denominadorAlumno[0].value).toFixed(3);
            

            var strVar="";
            strVar += " <input type=\"hidden\" name=\"respuesta"+identificadoresMate[i].id+"\" value=\""+respuestaAlumno+"\">";
            strVar += " <input type=\"hidden\" name=\"respuesta"+identificadoresMate[i].id+"\" value=\""+numeradorAlumno[0].value+"\">";
            strVar += " <input type=\"hidden\" name=\"respuesta"+identificadoresMate[i].id+"\" value=\""+denominadorAlumno[0].value+"\">";
            preguntaMate.insertAdjacentHTML("beforeend",strVar);
        }
    }
}

//Función para detectar ids y contenido de lo que cae en un reactivo
function activarReactivo(){
    $(".reactivo").droppable({
      drop: function (event, ui) {
    
        console.log("Detectando ID");
        elemento=ui.draggable;
        elemento=elemento[0];
        event.stopPropagation();
        
    
        var respuesta={
          id_respuesta: elemento.id,
          contenido:elemento.textContent,
          id_pregunta:this.id
        }
    
       if(!BuscarRespuesta(respuesta.id_pregunta,respuesta)){
           respuestasAlumnoD.push(respuesta);
       }
        console.log(respuestasAlumnoD);
       
    
      }
    });
    }

    function BuscarRespuesta(id_buscado,respuesta){
        var resultado=false
        for(x in respuestasAlumnoD){
            if(id_buscado==respuestasAlumnoD[x].id_pregunta){
                console.log("Sobreescribiendo")
                respuestasAlumnoD[x]=respuesta
                resultado= true
            }
        }
        return resultado;
    }

    function arrastrable() {
        $(".elementoDrag").draggable({
          revert: "invalid",
          cursor: "move",
        });
      }

function tomarTiempo(){
   var tiempo=document.getElementById("cronometro").textContent;
   var strVar="";
    strVar += "<input type=\"hidden\" name=\"tiempo\" value=\""+tiempo+"\">";
   formulario.insertAdjacentHTML("beforeend",strVar);
}

function enviarQuizz(){
    envioRespuestasMate();
    tomarTiempo();
    formulario.submit();
    impedimento++;
}