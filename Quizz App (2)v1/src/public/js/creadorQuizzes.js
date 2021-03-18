//--------JS PARA LA INYECCIÓN DE PREGUNTAS EN EL DOM DE EDITORES/CREAR Y EL PROCESAMIENTO PARA SU ENVÍO----------//


//Variable para hacer la inserción de elementos dentro del cuertpo del HTML
var insertor=document.getElementById("insercion");
//Variable global para "enumerar" todas las preguntas,respuestas y tipo  de un cuestionario
var contador=1;
var contadorid = 1 ;


//Función para nombrar los tipos de preguntas, y agregarles un contador para que no se pierdan en la request
function contadorTipo(){
    tipo="tipo"+contador;

     //Creación de un elemento hidden para registrar el tipo de pregunta
     var tipoHTML=document.createElement("INPUT");
     
     tipoHTML.type="hidden";
     tipoHTML.name=tipo;
    return tipoHTML;
}


//Función para crear las preguntas abiertas en el cuerpo del HTML
function preguntaAbierta(){

  contadorid++;
  console.log(contadorid)
var strVar="";
strVar += '<div id=\"preg'+(contadorid)+'\" class=\"tipoT cuestionario cuestionario row justify-content-center mt-5 pt-5\">';
strVar += "                    <div class=\"container text-center\">";
strVar += "                      <h4>Pregunta Abierta<\/h4>";
strVar += "                    <\/div>";
strVar += "                        <div class=\"col-md-7 \">";
strVar += "                          <label for=\"formGroupExampleInput\" class=\"form-label\">Pregunta<\/label>";
strVar += "                          <input type=\"text\" class=\"form-control pregunta\"  placeholder=\"Escriba la pregunta\">";
strVar += "                        <\/div>";
strVar += "                        <div class=\"col-md-7 \">";
strVar += "                          <label for=\"formGroupExampleInput2\" class=\"form-label\">Respuesta<\/label>";
strVar += "                            <input type=\"text\" class=\"form-control respuesta \"  placeholder=\"Escriba la respuesta\">";
strVar += "                            ";
strVar += "                            ";
strVar += "                        <\/div>";
strVar += "                        <div class=\"editar col-md-7\" role=\"group\" aria-label=\"Basic mixed styles example\" align=\"left\" float=\"left\">";
strVar += "                              <br>";
strVar += "                              <button type=\"button\" class=\"btn btn-danger\" onclick=\"eliminar(this)\">Quitar Pregunta<\/button>";
strVar += "                            <\/div>";
strVar += "                  <\/div>";
insertor.insertAdjacentHTML("beforeend",strVar);

  

       
} 

// Color del Body//

function colorido(){
    var colores = document.getElementById("color");
    var fondo = document.getElementsByClassName("examen");
    if(colores.value=="1"){
      fondo.backgroundColor = "#CE002B";
    } else if (colores.value=="2"){
      fondo.backgroundColor = "#C4A61C";
    } else if (colores.value == "3"){
      fondo.backgroundColor = "#A06600";
    }
  }



//pregunta arrastrable//
function readURL(event){
  var getImagePath = URL.createObjectURL(event.target.files[0]);
  $('#divImg').css('background-image', 'url(' + getImagePath + ')');
  $( "#divImg" ).droppable({
      drop: function( event, ui ) {
      $( this )
      .addClass( "ui-state-highlight" );
      
      }
      });
  }

  function crearImagen(){
    var btn = document.createElement("div");
    btn.setAttribute("class","correcto");
    btn.setAttribute("class","draggable");
    hr3.appendChild(btn); 
    console.log("correcto");
    $( ".correcto" ).draggable();
    $( ".correcto" ).css("background-color","white");
    if ($("#size").val()=="chico") {
        $(".correcto").css({"width":"50","heigth":"90"});
    }else if ($("#size").val()=="mediano"){
        $(".correcto").css({"width":"90","heigth":"150"});
    }else if ($("#size").val()=="grande"){
        $(".correcto").css({"width":"150","heigth":"300"});
    }
    
  }

      function crearRecuadroCorrecto(){
        $( ".correcto2" ).draggable();
        $( ".correcto2" ).css("color","red");
        var texto = $("#text1").val();
        $(".correcto2").text(texto);
        console.log("correcto")
        var strVar = "";
        strVar += "<div class=\>"
        strVar += "<h2 class=\"correcto2\">Texto<\/h2>";
        $(".correcto2").draggable();
      }

      function preguntaArrastrar() {
        var strVar="";
      strVar += "<div class=\"container cuestionario tipoArr \" >";
      strVar += " <label for=\"file\">Agrega imagen <\/label>";
      strVar += "   <input type='file' id='getval' name=\"background-image\" onchange=\"readURL(event)\" \/><br\/><br\/>  ";
      strVar += "   <input type=\"text\" name=\"texto\" id=\"text1\" value=\"\" placeholder=\"Texto\">";
      strVar += "     <button class=\"btn btn-info\" type=\"button\" onclick=\"crearRecuadroCorrecto()\" >Recuadro correcto<\/button>";
      strVar += "     <button class=\"btn btn-info\" type=\"button\" onclick=\"crearImagen()\">Añadir Cuadro Arrastrable<\/button>"
      strVar += "    <label for=\"tamaño\">Seleciona el tamaño<\/label>";
      strVar += "     <select name=\"tamaño\" id=\"size\">";
      strVar += "       <option  value=\"chico\" selected >Chico<\/option>";
      strVar += "       <option value=\"mediano\">Mediano<\/option>";
      strVar += "       <option value=\"grande\">Grande<\/option>";
      strVar += "     <\/select>";
      strVar += "     <div> <h3> </h3>    <\/div>";
      strVar += "       <hr id=\"hr2\"  >";
      strVar += "       <div id=\"divImg\" ><\/div>";
      strVar += "       <div class=\"correcto\" ><\/div>";
      strVar += "         <hr id=\"hr3\" >";
      strVar += "         <h3 class=\"correcto2\">Texto</h3> ";
      strVar += " <\/div>";
      strVar += "   <div class=\"editar\" role=\"group\" aria-label=\"Basic mixed styles example\">";
      strVar += "     <button type=\"button\" class=\"btn btn-danger\" onclick=\"eliminar(this)\">Quitar Pregunta<\/button>";
      strVar += "   <\/div>";
      insertor.insertAdjacentHTML("beforeend",strVar);
          
      }


      
      
      

function preguntaRelacional(){
  var strVar="";
  strVar += " <div class=\"tipoR cuestionario cuestionario row justify-content-center mt-5 pt-5 container\">";
  strVar += "                                  ";
  strVar += "                                    <div class=\"col-md-4\">";
  strVar += "                                      <div class=\"\">";
  strVar += "                                          <div class=\"container text-center\">";
  strVar += "                                            <h4 class=\"text-center\">Pregunta Relacional<\/h4><\/div>";
  strVar += "                                          <\/div>";
  strVar += "                                          <br>";
  strVar += "                                    <\/div>";
  strVar += "                                    <div class=\"contenedorItem row justify-content-center mb-3\">";
  strVar += "                                      <div class=\"container row justify-content-center mb-3\">";
  strVar += "                                            <div class=\"col-md-2 \" >";
  strVar += "                                                <div class=\"\">";
  strVar += "                                                    <input type=\"text\" class=\"form-control pregunta \"  placeholder=\"Pregunta\">";
  strVar += "                                                <\/div>";
  strVar += "                                            <\/div>";
  strVar += "                                            <div class=\"col-md-2 \" >";
  strVar += "                                                <div class=\"\">";
  strVar += "                                                    <input type=\"text\" class=\"form-control respuesta \"  placeholder=\"Respuesta\">";
  strVar += "                                                <\/div>";
  strVar += "                                            <\/div>";
  strVar += "                                            <div class=\"col-md-2 \" >";
  strVar += "                                              <div class=\"\">";
  strVar += "                                                <button class=\"btn btn-danger \" type=\"button\" onclick=\"quitarReactivoRelacional(this)\">QuitarReactivo<\/button>";
  strVar += "                                              <\/div>";
  strVar += "                                          <\/div>";
  strVar += "                                      <\/div>";
  strVar += "                                      <br>";
  strVar += "                                      <div class=\"container row justify-content-center mb-3\">";
  strVar += "                                            <div class=\"col-md-2 \" >";
  strVar += "                                                <div class=\"\">";
  strVar += "                                                    <input type=\"text\" class=\"form-control pregunta \"  placeholder=\"Pregunta\">";
  strVar += "                                                <\/div>";
  strVar += "                                            <\/div>";
  strVar += "                                            <div class=\"col-md-2 \" >";
  strVar += "                                                <div class=\"\">";
  strVar += "                                                    <input type=\"text\" class=\"form-control respuesta \"  placeholder=\"Respuesta\">";
  strVar += "                                                <\/div>";
  strVar += "                                            <\/div>";
  strVar += "                                            <div class=\"col-md-2 \" >";
  strVar += "                                              <div class=\"\">";
  strVar += "                                                <button class=\"btn btn-danger \" type=\"button\" onclick=\"quitarReactivoRelacional(this)\">QuitarReactivo<\/button>";
  strVar += "                                              <\/div>";
  strVar += "                                          <\/div>";
  strVar += "                                      <\/div>";
  strVar += "                                      <br>";
  strVar += "                                      <div class=\"container row justify-content-center mb-3\">";
  strVar += "                                            <div class=\"col-md-2 \" >";
  strVar += "                                                <div class=\"\">";
  strVar += "                                                    <input type=\"text\" class=\"form-control pregunta \"  placeholder=\"Pregunta\">";
  strVar += "                                                <\/div>";
  strVar += "                                            <\/div>";
  strVar += "                                            <div class=\"col-md-2 \" >";
  strVar += "                                                <div class=\"\">";
  strVar += "                                                    <input type=\"text\" class=\"form-control respuesta \"  placeholder=\"Respuesta\">";
  strVar += "                                                <\/div>";
  strVar += "                                            <\/div>";
  strVar += "                                            <div class=\"col-md-2 \" >";
  strVar += "                                              <div class=\"\">";
  strVar += "                                                <button class=\"btn btn-danger \" type=\"button\" onclick=\"quitarReactivoRelacional(this)\">QuitarReactivo<\/button>";
  strVar += "                                              <\/div>";
  strVar += "                                          <\/div>";
  strVar += "                                      <\/div>";
  strVar += "                                      <br>";
  strVar += "                                      <div class=\"container row justify-content-center mb-4\">";
  strVar += "                                        <div class=\"col-md-2 ml-0\" >";
  strVar += "                                            <div class=\"\">";
  strVar += "                                              <button class=\"btn btn-info \" type=\"button\" onclick=\"reactivoRelacional(this)\">Añadir Reactivo<\/button>";
  strVar += "                                            <\/div>";
  strVar += "                                        <\/div>";
  strVar += "                                 ";
  strVar += "                                      <\/div>";
  strVar += "                                  <br>";
  strVar += "                                  ";
  strVar += "                ";
  strVar += "                                            <button type=\"button\" class=\"btn btn-danger col-md-2 text-center\" onclick=\"eliminar(this),habilitar()\">Quitar Pregunta<\/button>";
  strVar += "                                  ";
  strVar += "                                          ";
  strVar += "                                    <\/div>         ";
  strVar += "                    <\/div>               ";
  strVar += "";

insertor.insertAdjacentHTML("beforeend",strVar);
}


//función para crear más reactivos en preguntas relacionales
function reactivoRelacional(obj){
  
      //Extración del Div donde se inyectará el nuevo reactivo
      var contenedorCuestionario=obj.parentElement.parentElement.parentElement.previousElementSibling;
      
      var strVar="";
      strVar += "<div class=\"container row justify-content-center mb-3\">";
      strVar += "                                            <div class=\"col-md-2 \" >";
      strVar += "                                                <div class=\"\">";
      strVar += "                                                    <input type=\"text\" class=\"form-control pregunta \"  placeholder=\"Pregunta\">";
      strVar += "                                                <\/div>";
      strVar += "                                            <\/div>";
      strVar += "                                            <div class=\"col-md-2 \" >";
      strVar += "                                                <div class=\"\">";
      strVar += "                                                    <input type=\"text\" class=\"form-control respuesta \"  placeholder=\"Respuesta\">";
      strVar += "                                                <\/div>";
      strVar += "                                            <\/div>";
      strVar += "                                            <div class=\"col-md-2 \" >";
      strVar += "                                              <div class=\"\">";
      strVar += "                                                <button class=\"btn btn-danger \" type=\"button\" onclick=\"quitarReactivoRelacional(this)\">QuitarReactivo<\/button>";
      strVar += "                                              <\/div>";
      strVar += "                                          <\/div>";
      strVar += "                                      <\/div>";
      strVar += "                                      <br>";

      contenedorCuestionario.insertAdjacentHTML("afterend",strVar);

      console.log(contenedorCuestionario);
   
}

function quitarReactivoRelacional(obj){
  //Elemento que se destruirá
  obj.parentElement.parentElement.parentElement.remove();
}

function preguntaOM(){

  var strVar="";
  strVar += " <div class=\"tipoOM cuestionario rounded-sm  \">";
  strVar += "                      <div class=\"row\">";
  strVar += "                         ";
  strVar += "                              <div class=\"col-lg-12 col-md-6 col-sm-6 row justify-content-center mt-5 pt-5\">";
  strVar += "                                    <div  class=\"text-center\">";
  strVar += "                                          <h3>Pregunta de Opción Múltiple<\/h3>";
  strVar += "                                          <div class=\"col-md-6 pregunta mx-auto mt-3\">";
  strVar += "                                            <div class=\"text-center\">";
  strVar += "                                              <p class=\"text-primary\"><b>Instruciones: <\/b> Para hacer una pregunta Verdadero-Falso , solo define la pregunta al alumno y selecciona correcta. SI deseas opción Multiple,define la pregunta del alumno, borra los campos y escribe las respuestas que desees y finalmente selecciona las correctas<\/p>";
  strVar += "                                            <\/div>";
  strVar += "                                            <input type=\"text\" class=\"form-control pregunta \"  placeholder=\"Pregunta para el alumno\">";
  strVar += "                                          <\/div>";
  strVar += "                                    <\/div>";
  strVar += "                                    <div class=\" col-lg-12 col-md-6 col-sm-6 reactivos row justify-content-center mt-5 pt-3\"  align=\"center\">";
  strVar += "                                          <div class=\"mb-3 \" >";
  strVar += "                                            <div class=\"col-md-6 py-2\">";
  strVar += "                                              <input type=\"text\" class=\"form-control opcion mb-2\"  placeholder=\"Verdadero\" value=\"verdadero\">";
  strVar += "                                            <button type=\"button\" class=\"btn btn-info\" onclick=\"seleccionarRespuesta(this)\">Correcta<\/button>";
  strVar += "                                            <button type=\"button\" class=\"btn btn-danger\" onclick=\"eliminar(this)\">Eliminar Opción<\/button>";
  strVar += "                                            <\/div>";
  strVar += "                                          ";
  strVar += "                                          <\/div>";
  strVar += "                                          <div class=\"mb-3 \" >";
  strVar += "                                            <div class=\"col-md-6 py-2\">";
  strVar += "                                              <input type=\"text\" class=\"form-control opcion mb-2\"  placeholder=\"Falso\" value=\"falso\">";
  strVar += "                                            <button type=\"button\" class=\"btn btn-info\" onclick=\"seleccionarRespuesta(this)\">Correcta<\/button>";
  strVar += "                                            <button type=\"button\" class=\"btn btn-danger\" onclick=\"eliminar(this)\">Eliminar Opción<\/button>";
  strVar += "                                            <\/div>";
  strVar += "                                          <\/div>";
  strVar += "                                    <\/div>";
  strVar += "                               ";
  strVar += "                               <\/div>";
  strVar += "                      <\/div>";
  strVar += "                        <div class=\"editar text-center mt-3\" role=\"group\" aria-label=\"Basic mixed styles example\">";
  strVar += "                          <button type=\"button\" class=\"btn btn-success\" onclick=\"reactivoOM(this)\">Agregar Reactivo<\/button>";
  strVar += "                          <button type=\"button\" class=\"btn btn-danger\" onclick=\"eliminar(this)\">Quitar Pregunta<\/button>";
  strVar += "                        <\/div>";
  strVar += "                  <\/div>";

insertor.insertAdjacentHTML("beforeend",strVar);
}

//Función para la creación de una opción en preguntas de opción múltiple
function reactivoOM(obj){

  //búsqueda del div donde se inyectará el nuevo reactivo
  var contenedor=obj.parentElement.previousElementSibling.children[0].querySelectorAll("div div.reactivos")[0];

  console.log(contenedor);

  
  var strVar="";
  strVar += "   <div class=\"mb-3 \" >";
  strVar += "                                            <div class=\"col-md-6 py-2\">";
  strVar += "                                              <input type=\"text\" class=\"form-control opcion mb-2\"  placeholder=\"Opción\">";
  strVar += "                                            <button type=\"button\" class=\"btn btn-info\" onclick=\"seleccionarRespuesta(this)\">Correcta<\/button>";
  strVar += "                                            <button type=\"button\" class=\"btn btn-danger\" onclick=\"eliminar(this)\">Eliminar Opción<\/button>";
  strVar += "                                            <\/div>";
  strVar += "                                          ";
  strVar += "                                          <\/div>";
  

  contenedor.insertAdjacentHTML("beforeend",strVar);
  
}

//Función para seleccionar las respuestas correctas de la opción múltiple
function seleccionarRespuesta(obj){
  // Selección del elemento a cambiar de color
  var contenedor= obj.parentElement.parentElement;
  
  claseContenedor=contenedor.className;
  //Clase con palabra clave para definir el comportamiento de la respuesta
  
  pivote=claseContenedor.search("bg bg-success");

  if (pivote==-1){
    contenedor.className="mb-3 bg bg-success";
  }
  else{
    contenedor.className="mb-3 ";
  }

}

function preguntaIT(){
  var strVar="";
  strVar += "";
  strVar += "                <div class=\"container tipoIT cuestionario mt-4 col-md-7 \">";
  strVar += "                    <div class=\"text-center\">";
  strVar += "                      <p class=\"display-6\">Pregunta Texto-Imagen<\/p>";
  strVar += "                      <p class=\"text-primary\"><b>Instruciones: <\/b> Seleccione la imagen a cargar, y defina pregunta y respuesta<\/p>";
  strVar += "                    <\/div>";
  strVar += "                    <input required type=\"file\" id=\"file-upload\" accept=\"image\/*\" class=\"imagen\">";
  strVar += "                    <input required type=\"hidden\" class=\"imagenrequest\">";
  strVar += "                    <div id=\"file-preview-zone\"  class=\"mx-auto\"><\/div>";
  strVar += "                    <div class=\"mb-3\">";
  strVar += "                      <label for=\"formGroupExampleInput\" class=\"form-label\">Pregunta<\/label>";
  strVar += "                      <input type=\"text\" class=\"form-control pregunta\"  placeholder=\"Escriba la pregunta\">";
  strVar += "                    <\/div>";
  strVar += "                    <div class=\"mb-3\">";
  strVar += "                        <label for=\"formGroupExampleInput2\" class=\"form-label\">Respuesta<\/label>";
  strVar += "                        <input required type=\"text\" class=\"form-control respuesta \"  placeholder=\"Escriba la respuesta\">";
  strVar += "                    <\/div>";
  strVar += "                    <div class=\"editar\" role=\"group\" aria-label=\"Basic mixed styles example\" float=\"left\" align=\"left\">";
  strVar += "                    <br>";
  strVar += "                    <button type=\"button\" class=\"btn btn-danger\" onclick=\"eliminar(this)\" align=\"left\">Quitar Pregunta<\/button>";
  strVar += "                  <\/div>";
  strVar += "                 <\/div>";
  

insertor.insertAdjacentHTML("beforeend",strVar);

}


function preguntaMatematicas(){

  var strVar="";
strVar += "    <div class=\"tipoM cuestionario row justify-content-center mt-5 pt-5\">";
strVar += "            <div class=\"text-center\">";
strVar += "              <h4>Pregunta de Matemáticas<\/h4>";
strVar += "              <p class=\"text-primary\"><b>Instruciones: <\/b>   Si requiere escribir una fracción ingrese guion bajo\"_\" p. ej. 3_4 <\/p>";
strVar += "             ";
strVar += "            <\/div>";
strVar += "                   <div class=\"col-md-7\">";
strVar += "                        <label for=\"formGroupExampleInput\" class=\"form-label\">Expresión<\/label>";
strVar += "                        <input type=\"text\" class=\"form-control pregunta\"  placeholder=\"Escriba la expresión a mostrar al alumno\">";
strVar += "                   <\/div>";
strVar += "                    <div class=\"editar col-md-7\" role=\"group\" aria-label=\"Basic mixed styles example\" float=\"left\" align=\"left\" >";
strVar += "                      <br>";
strVar += "                    <button type=\"button\" class=\"btn btn-danger\" onclick=\"eliminar(this)\"align=\"left\">Quitar Pregunta<\/button>";
strVar += "                    <\/div>";
strVar += "          <\/div>";

insertor.insertAdjacentHTML("beforeend",strVar);
}



function envioPreguntaRelacional(){

  var i=0;
  var cuestionarios=document.getElementsByClassName("tipoR");

  for(i=0;i<cuestionarios.length;i++){

    var tipoHTML=contadorTipo();
    //Definición del tipo de pregunta
    tipoHTML.value="tipoR";
    //inserción
    cuestionarios[i].appendChild(tipoHTML);
    
   var reactivos=cuestionarios[i].querySelectorAll("div.contenedorItem input.pregunta");
   for(j=0;j<reactivos.length;j++){
    var pregunta = cuestionarios[i].querySelectorAll("div.contenedorItem input.pregunta");
    pregunta[j].name="pregunta"+contador;

    var respuesta = cuestionarios[i].querySelectorAll("div.contenedorItem input.respuesta");
    respuesta[j].name="respuesta"+contador;

   }
    contador=contador+1;
  }
 
}



//Función para un envío clasificado de los tipos de preguntas
function envioPreguntaAbierta(){
   
    var i=0;
    //Rastreo del div por su clase, que define el tipo de pregunta
    var cuestionarios=document.getElementsByClassName("tipoT");
    
    //Clasificación de los elementos enviados para no tener conflictos en la request
    for(i=0;i<cuestionarios.length;i++){
    
    //Se agrega el tipo de pregunta por medio de un elemento hidden
    var tipoHTML=contadorTipo();
    //Definición del tipo de pregunta
    tipoHTML.value="tipoT";
    //inserción
    cuestionarios[i].appendChild(tipoHTML);
    
    var pregunta = cuestionarios[i].querySelectorAll("input.pregunta");
    pregunta[0].name="pregunta"+contador;

    var respuesta = cuestionarios[i].querySelectorAll("input.respuesta");
    respuesta[0].name="respuesta"+contador;
 
    contador=contador+1;
    }

    
}

function envioPreguntaOM(){

  var i=0;
    //Rastreo del div por su clase, que define el tipo de pregunta
    var cuestionarios=document.getElementsByClassName("tipoOM");

    for(i=0;i<cuestionarios.length;i++){
    
     
      
      //Selección de la pregunta que aparecerá para el alumno
      var pregunta = cuestionarios[i].querySelectorAll("div.pregunta input.pregunta");
      pregunta[0].name="pregunta"+contador;

      //Recolección de las opciones a mostrar
      var reactivos=cuestionarios[i].querySelectorAll("div.reactivos input.opcion");

      for(j=0;j<reactivos.length;j++){
      reactivos[j].name="pregunta"+contador;
      }

      //Recolección de la(s) respuesta(s)
      var respuesta = cuestionarios[i].querySelectorAll("div.bg-success input.opcion");
      for(k=0;k<respuesta.length;k++){
        //Creacción de elementos hidden para el envío de la(s) respuesta(s)
        var respuestaHTML=document.createElement("INPUT");
        respuestaHTML.type="hidden";
        respuestaHTML.name="respuesta"+contador;
        respuestaHTML.value=respuesta[k].value;

        cuestionarios[i].appendChild(respuestaHTML);

        }
        
         //Se agrega el tipo de pregunta por medio de un elemento hidden
      var tipoHTML=contadorTipo();
      //Definición del tipo de pregunta
      tipoHTML.value="tipoOM";
      //inserción
      cuestionarios[i].appendChild(tipoHTML);

    
      contador=contador+1;
      }
}

function envioPreguntaIT(){
   
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
  var imagen = cuestionarios[i].querySelectorAll("input.imagen");
  imagen[0].name="imagenes";

    //Creación de un espacio en blanco en un array para enviar el id de la imagen
  var imagenHTML = cuestionarios[i].querySelectorAll("input.imagenrequest");
  imagenHTML[0].name="pregunta"+contador;
  imagenHTML[0].value="";

  var pregunta = cuestionarios[i].querySelectorAll("input.pregunta");
  pregunta[0].name="pregunta"+contador;

  

  var respuesta = cuestionarios[i].querySelectorAll("input.respuesta");
  respuesta[0].name="respuesta"+contador;

  contador=contador+1;
  }

  
}


function envioPreguntaMate(){
   
  var i=0;
  //Rastreo del div por su clase, que define el tipo de pregunta
  var cuestionarios=document.getElementsByClassName("tipoM");
  
  
  //Clasificación de los elementos enviados para no tener conflictos en la request
  for(i=0;i<cuestionarios.length;i++){
  
  //Se agrega el tipo de pregunta por medio de un elemento hidden
  var tipoHTML=contadorTipo();
  //Definición del tipo de pregunta
  tipoHTML.value="tipoM";
  //inserción
  cuestionarios[i].appendChild(tipoHTML);
  
 


  var pregunta = cuestionarios[i].querySelectorAll("input.pregunta");
  pregunta[0].name="pregunta"+contador;

  var expresion= pregunta[0].value
    console.log(expresion);


    var resultadoExpresion=0;
   
      for(j=0;j<expresion.length;j++){
        
        var caracter=expresion.slice(j,j+1);
        //Si encuentra un número como caracter
        if(Number.isInteger(parseInt(caracter))){
          //Va recorriendo la expresión en base a la iteración
          var numero1=concatenacion(expresion,j);
          j=numero1.iteracion;
          numero1=numero1.numeroConcatenado

          numero1=buscarFraccion(numero1,expresion,j);
          console.log("resultado buscarFraccion: "+numero1.resultado);
          console.log("iteracion buscarFraccion: "+numero1.iteracion);

          j=numero1.iteracion;
          numero1=numero1.resultado;
           
           var operando=expresion.slice(j,j+1);
           j=j+1;          

           console.log("operando"+operando);

          
          var resultado=operacion(operando,numero1,expresion,j)
          
           j=resultado.iteracion;
           resultadoExpresion+=resultado.resultado;
           
           //console.log("iteracion al final"+resultado.iteracion)
        }
       
        else{//Si encuentra un operador como caracter
          
          j=j+1;
          var resultado= operacion(caracter,resultadoExpresion,expresion,j);
          j=resultado.iteracion;

          resultadoExpresion=resultado.resultado;
        }
        
          
      }
      console.log("resultado: "+resultadoExpresion.toFixed(3));
      respuesta=resultadoExpresion.toFixed(3);

   
 
  //Inserción de la respuesta
  var respuestaHTML=document.createElement("INPUT");
  respuestaHTML.type="hidden";
  respuestaHTML.name="respuesta"+contador;
  respuestaHTML.value=respuesta;
  cuestionarios[i].appendChild(respuestaHTML);

  contador=contador+1;
  }

  
}


//-----Funciones para Matemáticas-----//
function concatenacion(expresion,iteracion){

  var concatenado={
    numeroConcatenado:0,
    iteracion:0
   };

   var caracter=expresion.slice(iteracion,iteracion+1);

   var concatenacion="";
  while(Number.isInteger(parseInt(caracter))){
    concatenacion=concatenacion+caracter;
    iteracion=iteracion+1;
    caracter=expresion.slice(iteracion,iteracion+1);
    
  }
  concatenado.numeroConcatenado=parseInt(concatenacion);
  concatenado.iteracion=iteracion;

 return concatenado;
}

function operacion(operador,numero1,expresion,iteracion){

  var resultadoOperacion={
    resultado:0,
    iteracion:0
  };

  console.log(" i Antes de entrar al concatenador"+iteracion);
      var numero2=concatenacion(expresion,iteracion);

      numero2=buscarFraccion(numero2.numeroConcatenado,expresion,(numero2.iteracion));
 
     resultadoOperacion.iteracion=numero2.iteracion -1;
     
  
  switch(operador){
    case"+":
   

      console.log("resultado de la funcion"+numero1+"+"+numero2.resultado+"="+(numero1+numero2.resultado));
     resultadoOperacion.resultado=numero1+numero2.resultado;
    break;
    case"-":
     console.log("resultado de la funcion"+numero1+"-"+numero2.resultado+"="+(numero1-numero2.resultado));
    resultadoOperacion.resultado=numero1-numero2.resultado;
   break;
   case"*":

    console.log("resultado de la funcion"+numero1+"*"+numero2.resultado+"="+(numero1*numero2.resultado));
   resultadoOperacion.resultado=numero1*numero2.resultado;
  break;
  case"/":
  
  
  console.log("resultado de la funcion"+numero1+"/"+numero2.resultado+"="+(numero1/numero2.resultado));
  resultadoOperacion.resultado=numero1/numero2.resultado;
 break;
  }

  return resultadoOperacion;
}


function buscarFraccion(numero,expresion,iteracion){
  var resultado={
    resultado: numero,
    iteracion: iteracion,
    
  };
  var posiblefraccion=fraccion(numero.toString(),expresion,iteracion);
  //Cambio del caracter leído si es fracción
if(posiblefraccion.esFraccion){
  resultado.resultado=posiblefraccion.resultado;
  resultado.iteracion=posiblefraccion.iteracion;
}

return resultado;
}




function fraccion(numero,expresion,iteracion){
  var resultado={
    resultado: 0,
    iteracion:0,
    esFraccion: false
  };
 
  var operando=expresion.slice(iteracion,iteracion+1);

  console.log("Valor recibido por la Función Fracción : "+operando);
  //Si el próximo espacio en el string es guion bajo convertimos a fracción
  if(operando=="_"){
    resultado.esFraccion=true;
    console.log("Debe Convertirse a fracción")
    var denominador=expresion.slice(iteracion+1,iteracion+2);
    denominador=parseInt(denominador);
    resultado.iteracion=iteracion+2;
    resultado.resultado=(numero/denominador)
  }
  else{ //Devolvemos los mismos datos que nos fueron dados en caso negativo
   resultado.resultado=numero;
   resultado.iteracion=iteracion; 
  }

  

   return resultado
}
//----Terminan funciones para preguntas de Matemáticas

function readFile(input){
  if(input.files && input.files[0]){
      var reader = new FileReader();
      reader.onload = (e)=>{
          var filePreview = document.createElement("img");
          filePreview.setAttribute("width","460");
          filePreview.setAttribute("height","345");
         /*  filePreview.setAttribute("ondragenter","dragEnter(event)");
          filePreview.setAttribute("ondraleave","dragLeave(event)");
          filePreview.setAttribute("ondragover","allowDrop(event)");
          filePreview.setAttribute("ondrop","drop(event)");
          filePreview.setAttribute("ondragstart","drag(event)");*/
          filePreview.id = 'file-preview';
          filePreview.src = e.target.result;
          console.log(e.target.result);
          var previewZone = document.getElementById('file-preview-zone');
          previewZone.appendChild(filePreview);
      }
      reader.readAsDataURL(input.files[0]);
  }
}
  var fileUpload = document.getElementById('file-upload');
  fileUpload.onchange = (e)=>{
      readFile(e.srcElement);
  }

 
function eliminar(obj){
  obj.parentElement.parentElement.remove();
}


// Envío Final de todos los elementos
function envioQuizz(){
     //creación e inserción de un elemento con el número de preguntas del cuestionario
    var numeroPreguntas=document.getElementsByClassName("cuestionario").length;
    var numeroHTML=document.createElement("INPUT");
     numeroHTML.type="hidden";
     numeroHTML.name="numeroPreguntas";
     numeroHTML.value=numeroPreguntas;

     insertor.appendChild(numeroHTML);

     //Envío de tipos de preguntas
    envioPreguntaAbierta();
    envioPreguntaRelacional();
    envioPreguntaOM();
    envioPreguntaIT();
    envioPreguntaMate();
    document.getElementById("formularioQuizz").submit();
    
}