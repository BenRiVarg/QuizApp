// Set the date we're counting down to
var countDownDate = new Date("Jan 5, 2022 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function () {
  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with id="demo"
  document.getElementById("demo").innerHTML =
    days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

  // If the count down is over, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);


//Funciones para la barra de carga de los quizzes
var progreso = 0;
var cambioProgreso=0;
var preguntaInicial=document.getElementsByClassName("active")[0];
  var preguntaFinal=document.getElementsByClassName("pregunta-Final")[0];
  
function getTotal(valor){
  var totalPreguntas=Number.parseInt(valor);
  cambioProgreso=100/totalPreguntas
  progreso=cambioProgreso;
  cambioProgreso=Math.round(cambioProgreso)+1;
  $("#bar").css("width", cambioProgreso + "%");
  //console.log(cambioProgreso);

}

 function barra() {
   var carrusel=document.getElementsByClassName("active")[0];//.children[0];
   console.log(carrusel);
   console.log(carrusel==preguntaFinal);

   if(carrusel==preguntaFinal){
     progreso=cambioProgreso;
    $("#bar").css("width", cambioProgreso + "%");
   }
   else{

   
   progreso += cambioProgreso;
   if(progreso>100){
     progreso=100;
   }
   $("#bar").css("width", progreso + "%");
  }
  console.log(progreso);
}
 
 var progreso = 0;
 function barraM() {
   progreso -= cambioProgreso;
   if(progreso<0){
    progreso=0;
  }
   $("#bar").css("width", progreso + "%");
 }