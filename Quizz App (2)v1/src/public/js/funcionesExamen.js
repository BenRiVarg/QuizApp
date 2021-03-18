
//Tamaño Imágenes=1000*600
//tipoAr 
function caliz(){
    alert("Sí va a Funcionar")
}

//Variable para asignar un valor de id a cada item de tipo Drag
var contadorDrag=1;
var retornable=document.getElementsByClassName("retornable")[0];
matematicas();
contadorItemsMultiples();
activarDragQuizz();
activarItemsDrop();


//----------Empiezan FUncioens de Mate-----//
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

function moverDiv(){
    var alto=document.getElementById("alto").value;
    var ancho=document.getElementById("ancho").value;
    var img=document.getElementById("imagenP");

    console.log(ancho+"   "+alto);
    console.log(img.width+"   "+img.height);

    //Captura de los elementos reactivo
    var divMovil=document.getElementsByClassName("texto-encima");
    var textoMovil=document.getElementsByClassName("itemPregunta");

    var limiteAncho=img.width-100;

    var limiteAlto=img.height-30;

    if(ancho>limiteAncho){
        ancho=limiteAncho;
    }
    
    if(alto>limiteAlto){
        alto=limiteAlto;
    }

    divMovil[0].style.left=ancho+"px";
    divMovil[0].style.top=alto+"px";

    textoMovil[0].style.left=ancho+"px";
    textoMovil[0].style.top=alto+"px";

   
  

}

/*
function activarDragQuizz(){
    var i=0;
    var arrastrables=document.querySelectorAll(".arrastrable");
    for(i;i<arrastrables.length;i++){
        var elemento=arrastrables[i];
        elemento.setAttribute('id', ("itemDragQuizz"+contadorDrag));
    activarItemDrag(elemento);
    }
}

function activarItemDrag(obj){
    
        
        obj.setAttribute('draggable', 'true');

        addEvent(obj, 'dragstart', function (e) {
            console.log('dragstart');

            e.dataTransfer.effectAllowed = 'copy';

            //TODO fails on desktop safari because drag is immediately aborted
//                this.style.display = "none";

            console.log('setting data: ' + this.id);

            e.dataTransfer.setData('Text', this.id); // required otherwise doesn't work
        });

        contadorDrag=contadorDrag+1;
    
 
}

function drop(event,itemDrop){
    event.preventDefault();
    event.stopPropagation();
  //Conseguir los datos del elemento drag que está encima
  var el = document.getElementById(event.dataTransfer.getData('Text'));

  //console.log(this.children[0].id.search("itemDragQuizz"));
  
  if(itemDrop.children[0].id.search("itemDragQuizz")==-1){
      //Casilla Vacía
      if (el.parentElement.className!="reactivoDrop"){
          el.remove();
  
          }

      else{
          el.textContent="Tu Respuesta";
          el.id=null;
      }
    
       //Copia de todos los elementos que se soltarán
       itemDrop.children[0].innerHTML=el.innerHTML;
       itemDrop.children[0].id=el.id;

          //Activamos funcionalidad Drag del nuevo elemento en la casilla
      activarItemDrag(itemDrop.children[0]);

      //Y copiamos datos del elemento en los procesadores de request
       var respuesta=itemDrop.querySelectorAll("input.respuestaDrag")[0];
       respuesta.value=el.textContent;

  }
  else{ //Casilla Ocupada
 
      //Copiamos los elementos del elemento que ya está en la casilla
      var replica=document.createElement(itemDrop.children[0].tagName);
      replica.textContent=itemDrop.children[0].textContent;
      replica.id=itemDrop.children[0].id;

   
      //Y lo replicamos para poder seguirlo utilizando
      retornable.appendChild(replica);

      //Damos funcionalidad Drag al elemento que acaba de reaparecer
      var elementoRenacido=document.getElementById(replica.id);
      activarItemDrag(elementoRenacido);

      //Asignamos los valores del elemento Drag nuevo 
      itemDrop.children[0].innerHTML=el.innerHTML;
      itemDrop.children[0].id=el.id;

        //LLenamos la casilla para anunciar que no hay respueta
      el.textContent="Tu respuesta";

      //Y destruimos los elementos si estan afuera de un item Respuesta
      if (el.parentElement.className!="reactivoDrop"){
          el.remove();
  
          }
      //Activamos funcionalidad Drag del nuevo elemento en la casilla
      activarItemDrag(itemDrop.children[0]);

    

  }

  
}


function activarItemsDrop(){
    var i=0;
    var reactivosDrop=document.getElementsByClassName("reactivoDrop");

    
    for(i;i<reactivosDrop.length;i++){
    var innerBin=reactivosDrop[i];
    addEvent(innerBin, 'dragenter', function (e) {
        console.log('apperture dragenter');

        e.preventDefault();
        e.stopPropagation(); // stop it here to prevent it bubble up

       // bin.classList.add('in');
    });

    addEvent(innerBin, 'dragover', function (e) {
        console.log('apperture dragover');

        e.preventDefault(); // allows us to drop
        e.stopPropagation(); // stop it here to prevent it bubble up

       // e.dataTransfer.dropEffect = 'copy';
    });

    addEvent(innerBin, 'dragexit', function (e) {
        console.log('apperture dragexit');

        e.stopPropagation(); // stop it here to prevent it bubble up

        //bin.classList.remove('in');
    });

    addEvent(innerBin, 'dragleave', function (e) {
        console.log('apperture dragleave');

        e.stopPropagation(); // stop it here to prevent it bubble up

      //  bin.classList.remove('in');
    });

  
    /*
    addEvent(innerBin, 'drop', function (e) {
        console.log('apperture drop');

        e.stopPropagation(); // stop it here to prevent it bubble up

        //bin.classList.remove////  ('in');
        //Conseguir los datos del elemento drag que está encima
        var el = document.getElementById(e.dataTransfer.getData('Text'));
        
       
        console.log(el.id);
        console.log(this.children[0].id.search("itemDragQuizz"));
        if(this.children[0].id.search("itemDragQuizz")==-1){
            //Casilla Vacía
            if (el.parentElement.className!="reactivoDrop"){
                el.remove();
        
                }

            else{
                el.textContent="Texto a Reemplazar";
                el.id=null;
            }
          
             //Copia de todos los elementos que se soltarán
             this.children[0].innerHTML=el.innerHTML;
             this.children[0].id=el.id;

                //Activamos funcionalidad Drag del nuevo elemento en la casilla
            activarItemDrag(this.children[0]);
        }
        else{ //Casilla Ocupada
       
            //Copiamos los elementos del elemento que ya está en la casilla
            var replica=document.createElement(this.children[0].tagName);
            replica.textContent=this.children[0].textContent;
            replica.id=this.children[0].id;

         
            //Y lo replicamos para poder seguirlo utilizando
            retornable.appendChild(replica);

            //Damos funcionalidad Drag al elemento que acaba de reaparecer
            var elementoRenacido=document.getElementById(replica.id);
            activarItemDrag(elementoRenacido);

            //Asignamos los valores del elemento Drag nuevo 
            this.children[0].innerHTML=el.innerHTML;
            this.children[0].id=el.id;
            //Y destruimos los elementos si estan afuera de un item Respuesta
            if (el.parentElement.className!="reactivoDrop"){
                el.remove();
        
                }
            //Activamos funcionalidad Drag del nuevo elemento en la casilla
            activarItemDrag(this.children[0]);
        }
      
    });

    
    }

    


}
*/
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

function enviarQuizz(){
    envioRespuestasMate();
    document.getElementById("quizz").submit();
}