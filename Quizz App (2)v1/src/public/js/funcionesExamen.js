//Configuración para detener el Quizz
var myCarousel = document.querySelector('#carouselExampleControlsNoTouching');
    var carousel = new bootstrap.Carousel(myCarousel, {
  interval: 2000,
  wrap: false,
  pause: true
    });

var formulario=document.getElementById("quizz");



//Variable para enviar los datos que un alumno contesta en un lienzo Drag por la request
var arrayLR=[];
//Variable para recuperar las respuestas del alumno
var respuestasAlumnoD = [];




matematicas();
contadorItemsMultiples();
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
             strVar += "                    <input type=\"number\" autocomplete=\"off\"  class=\"alumnoResponde\" pt-2\">";
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
           strVar += "                  <input type=\"number\" autocomplete=\"off\" class=\"numerador\" name=\"\" id=\"\" class=\" pt-2\" min=\"0\">";
           strVar += "                <\/div >";
           strVar += "                <div class=\"pt-1\">";
           strVar += "                  <input type=\"number\" autocomplete=\"off\"  class=\"denominador\" name=\"\" id=\"\" class=\" pt-2\" min=\"0\">";
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
            strVar += " <input type=\"hidden\" autocomplete=\"off\" name=\"respuesta"+identificadoresMate[i].id+"\" value=\""+respuestaAlumno+"\">";
            strVar += " <input type=\"hidden\" autocomplete=\"off\" name=\"respuesta"+identificadoresMate[i].id+"\" value=\""+numeradorAlumno[0].value+"\">";
            strVar += " <input type=\"hidden\" autocomplete=\"off\" name=\"respuesta"+identificadoresMate[i].id+"\" value=\""+denominadorAlumno[0].value+"\">";
            preguntaMate.insertAdjacentHTML("beforeend",strVar);
        }
    }
}

/*--------------Funciones Pregunta Drag--------------*/
//Variable para reconocer el contenedor de palabras del que se están sacando los arrastrables
var contenedorPalabras


function activarDragQuizz(){
  var i=0;
  var arrastrables=document.querySelectorAll(".elementoDrag");
  for(i;i<arrastrables.length;i++){
      var elemento=arrastrables[i];
      /*elemento.setAttribute('id', ("itemDragQuizz"+contadorDrag));*/
    activarItemDrag(elemento);


  }

}
function activarItemDrag(obj){
    
        
  obj.setAttribute('draggable', 'true');

  addEvent(obj, 'dragstart', function (e) {
      console.log('dragstart');
      contenedorPalabras=this.parentElement
      e.dataTransfer.effectAllowed = 'copy';

      //TODO fails on desktop safari because drag is immediately aborted
//                this.style.display = "none";

      console.log('setting data: ' + this.id);

      e.dataTransfer.setData('Text', this.id); // required otherwise doesn't work
  });

  //contadorDrag=contadorDrag+1;


}

function activarItemsDrop(){
  var i=0;
  var reactivosDrop=document.getElementsByClassName("reactivoDrop");

  
  for(i;i<reactivosDrop.length;i++){
  var reactivo=reactivosDrop[i];
  
  //
  
  addEvent(reactivo, 'ondrop', function (e) {
    //console.log('Drop');
    e.preventDefault();
    e.stopPropagation(); // stop it here to prevent it bubble up

});

  addEvent(reactivo, 'dragenter', function (e) {
     // console.log('apperture dragenter');

      e.preventDefault();
      e.stopPropagation(); // stop it here to prevent it bubble up

  });

  addEvent(reactivo, 'dragover', function (e) {
     // console.log('apperture dragover');

      e.preventDefault(); // allows us to drop
      e.stopPropagation(); // stop it here to prevent it bubble up

     // e.dataTransfer.dropEffect = 'copy';
  });

  addEvent(reactivo, 'dragexit', function (e) {
    //  console.log('apperture dragexit');

      e.stopPropagation(); // stop it here to prevent it bubble up

      //bin.classList.remove('in');
  });

  addEvent(reactivo, 'dragleave', function (e) {
    //  console.log('apperture dragleave');

      e.stopPropagation(); // stop it here to prevent it bubble up

    //  bin.classList.remove('in');
  });


  
  }
}
//Función para dar soporte a los elemntos que enviarán a la request lo que contestó el alumno por lienzo
function backLienzo(){
  var lienzos=document.getElementsByClassName("replica");
  
  for(var l=0;l<lienzos.length;l++){

    arrayLR.push(respuestasAlumnoD);
  }

}
//Función para procesar como tratar los elementos que concatenacion
//e es el evento
//ItemDrop es el elemento en el que va a caer un arrastrable
function drop(e,itemDrop){
  /*
  console.log("Función Drop");
  console.log("Oyente");
  console.log(itemDrop);
  */

 console.log("Not Trolls");
 console.log(contenedorPalabras);
  //Captura del lienzo en el que se estan haciendo los eventos
  //var lienzo =itemDrop.parentElement.parentElement.id;
  var lienzo=itemDrop.parentElement.id;

  e.preventDefault();
  e.stopPropagation(); 
  //la variable el es el arrastrable que se mueve
  var el = document.getElementById(e.dataTransfer.getData('Text'));
  /*
  console.log("Elemento que cae")
  console.log(el);
  console.log(el.parentElement.className);
  */
  
      //Los arrastarbles van de la casilla original a una casilla Drop 
      if (el.parentElement.className!="reactivoDrop"){
      
        //El arrastrable se mueve de su casilla original a una casilla limpia
        if(itemDrop.children[0].id.length==0){
           //Copia de todos los elementos que se soltarán
          itemDrop.children[0].innerHTML=el.innerHTML;
          itemDrop.children[0].id=el.id;

          validarRespuesta(lienzo,el,itemDrop);
          el.remove();
        }
        else{ //El arrastrable, va a una casilla ocupada
          //console.log("Del contenedor original a casilla ocupada")
          validarRespuesta(lienzo,el,itemDrop);
          sobreEscrituraArrastrable(el,itemDrop);
        }
        }
        else{  //El arrastrable se mueve a otra casilla Drop Limpia
          if(itemDrop.children[0].id.length==0){
            validarRespuesta(lienzo,el,itemDrop);
            trasladoArrastrable(el,itemDrop);
           
          }
          else{
            //Sobreescritura: un Elemento arrastrable cae sobre una casilla ocupada
            //console.log("Sobreescritura")
            validarRespuesta(lienzo,el,itemDrop);
            sobreEscrituraArrastrable(el,itemDrop);
          
          }
         
          
        }
       
        /*
        var strVar="";
        strVar += "  <div class=\"reactivoDrop\" id=\"valor\"  ondrop=\"drop(event,this)\">";
        strVar += "                                <div class=\"contenidoDrop\">Texto<\/div>";
        */
      activarItemDrag(itemDrop.children[0]);
      
      

      
}

function trasladoArrastrable(el,itemDrop){
  //Copia de todos los elementos que se soltarán
  itemDrop.children[0].innerHTML=el.innerHTML;
  itemDrop.children[0].id=el.id;

  //Capatura del antiguo  reactivo
  antiguoContenedor=el.parentElement;
  //console.log(antiguoContenedor);
  //Destrucción del antiguo Elemento
  el.remove();
  
  if(antiguoContenedor.className!="contenedorPalabras"){
  //Inserción de un elemento Limpio
  var strVar="";
  strVar += "<div class=\"contenidoDrop\"><\/div>";
  antiguoContenedor.insertAdjacentHTML("afterbegin",strVar);
  }
}

function sobreEscrituraArrastrable(el,itemDrop){
  //Sobreescritura: un Elemento arrastrable cae sobre una casilla ocupada
  console.log("Sobreescritura")
  var arrastrableSobrescrito=itemDrop.children[0];
  /*
  console.log(arrastrableSobrescrito.id);
  console.log(arrastrableSobrescrito.textContent);
  */
  //Reconstrucción del elemento para volver al cuadro original
  var strVar="";
  strVar += " <div id=\""+arrastrableSobrescrito.id+"\" class=\"text-light fw-bold text-center respuesta-reactivo elementoDrag\">"+arrastrableSobrescrito.textContent+"<\/div>";
  contenedorPalabras.insertAdjacentHTML("afterbegin",strVar);
  activarDragQuizz();
  /*
  var elementoRenacido=document.getElementById(arrastrableSobrescrito.id);
  console.log("Renacido")
  console.log(elementoRenacido);
  */
  //activarItemDrag(elementoRenacido);

  trasladoArrastrable(el,itemDrop);
}

function validarRespuesta(lienzo,el,itemDrop){

  console.log("validarRespuesta");
  console.log("___________________");
  
  var respuesta = {
    id_respuesta: el.id,
    contenido: el.textContent,
    id_pregunta: itemDrop.id
  }

 // console.log(respuesta);
  console.log("Debug")
  console.log("_______________");
  console.log(arrayLR)
  console.log(lienzo);
  if (!BuscarRespuesta(lienzo,respuesta.id_pregunta, respuesta)) {
    console.log("Escribiendo");
    arrayLR[lienzo].push(respuesta);
  }
  console.log(arrayLR[0]);
  //BuscarRespuesta(lienzo,respuesta.id_pregunta, respuesta)

  
  function BuscarRespuesta(lienzo,id_buscado, respuesta) {
    var arrayLienzo=arrayLR[lienzo];
    console.log(arrayLienzo);
    
  var resultado = false
  for (x in arrayLienzo) {
    if (id_buscado == arrayLienzo[x].id_pregunta) {
      console.log("Sobreescribiendo")
      respuestasAlumnoD[x] = respuesta
      resultado = true
      break;
    }
    
  }
  return resultado;
  
}
  
}
/*--------------Terminan funciones Pregunta Drag--------------*/
/*
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
    */
    /*
    arrastrable();
    function arrastrable() {
        $(".elementoDrag").draggable({
          revert: "invalid",
          cursor: "move",
        });
      }
      */

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
}