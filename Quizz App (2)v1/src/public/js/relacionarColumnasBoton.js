      
        window.addEventListener("load", function(e){

            var preguntaSelecta="0,0";
            var tablaSelecta=document.querySelectorAll(".tablaEjercicio")[0];
            var filasReactivos = tablaSelecta.querySelectorAll("tr");
           //var filasReactivos = document.querySelectorAll(".tablaEjercicio tr");
            var respuestas = [];
            var botones = [];
          
            var tempPregunta;
            var tempBoton;
            var tempRespuesta;
            Array.prototype.forEach.call(filasReactivos, function(fila){
                tempPregunta = fila.querySelector("td");
                tempRespuesta = fila.querySelector("td.celdaRespuesta");
                botonPregunta=fila.querySelector("td.botonPregunta");
                tempBoton = fila.querySelector("td.botonRespuesta");//Es la celda, no el botón en sí
                fila.respuesta = tempRespuesta;
                respuestas.push(tempRespuesta);
                botones.push(tempBoton);
                
               // tempRespuesta.parentNode.removeChild(tempRespuesta);

                /*
                 Al apretar un botón, se revisa si la respuesta es correcta
                 Se marca correcta o incorrecta
                 Se procede a la siguiente pregunta
                 */

                botonPregunta.addEventListener("click", alApretarPregunta, false);
                tempBoton.addEventListener("click", alApretarOpcion, false);

            });

            shuffle(respuestas);
     
            Array.prototype.forEach.call(filasReactivos, function(fila, index){
                fila.appendChild(respuestas[index]);
            });

            function obtenerPreguntaSelecta(){
                return preguntaSelecta;
            }


            //Función de los botones Pregunta 
            function alApretarPregunta(e){
                
                e.stopPropagation();
                e.preventDefault();
                //Revisamos si no está nada más selecto
                antiguoElemento=document.getElementById(preguntaSelecta);
                nuevoElemento=e.currentTarget.nextElementSibling;
                if(antiguoElemento===nuevoElemento){
                    //Mismo elemento que el click
               

                        if(e.currentTarget.nextElementSibling.className=="selecta")
                    {   //Deselecciona
                        e.currentTarget.nextElementSibling.className="";
                        e.currentTarget.nextElementSibling.style.backgroundColor="white";
                    }
                    else{
                        //Selecciona
                        preguntaSelecta=e.currentTarget.nextElementSibling.id;
                        e.currentTarget.nextElementSibling.className+="selecta";
                        e.currentTarget.nextElementSibling.style.backgroundColor="lightgreen";
                    }

                }
                else{
                    //diferente elemento que el click
                    antiguoElemento.style.backgroundColor="white";
                    preguntaSelecta=nuevoElemento.id;
                    nuevoElemento.className+="selecta";
                    nuevoElemento.style.backgroundColor="lightgreen";
                }
            
             
                
                console.log(preguntaSelecta);
            }
            //Función de los Botones Respuesta

            function alApretarOpcion(e){

                e.stopPropagation();
                e.preventDefault();

                //Extracción del elemento respuesta
                 var preguntaSelecta=document.getElementById(obtenerPreguntaSelecta());
                
                 //Obtención de los numeros del elemento que se relaciona
                var numeroPreguntaRelacion=preguntaSelecta.previousElementSibling.textContent;

                var respuestaSeleccionada=e.currentTarget.nextElementSibling;
                
                
                if(antiguo=document.getElementById("antigua"+preguntaSelecta.id)){
                    console.log("hay un duplicado");
                    var nuevo=e.currentTarget.nextElementSibling;

                    antiguo.id=" ";
                    antiguo.previousElementSibling.querySelector("button").innerHTML="";
                    var antiguaRequest=antiguo.children[0].children[0];
                    //antiguo.style.backgroundColor="red";
                    //---Eliminación de las respuestas para la Request--//
                    antiguaRequest.value="";

                    var nuevaRequest=nuevo.children[0].children[0];
                    nuevo.previousElementSibling.querySelector("button").innerHTML=numeroPreguntaRelacion;
                    nuevo.id="antigua"+preguntaSelecta.id;
                    //nuevo.style.backgroundColor="cyan";

                    //---Asignación para los valores de envio por la request---//
                    nuevaRequest.value=preguntaSelecta.textContent;
                }
                else{
                    console.log("solo hay una");
                    var respuestaRequest=respuestaSeleccionada.children[0].children[0];
                    respuestaSeleccionada.id="antigua"+preguntaSelecta.id;
                    
                    //Impresión del número en el botón(para Relación)
                    respuestaSeleccionada.previousElementSibling.querySelector("button").innerHTML=numeroPreguntaRelacion;

                      //---------ASIGNACIÓN de los valores para la REQUEST------------//
                      respuestaRequest.value=preguntaSelecta.textContent;

                      //---------ASIGNACIÓN de los valores para la REQUEST------------//
                    
                }
                
                
            }


            /* Función para revolver respuestas */
            function shuffle(array) {
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
            function reemplazarTexto(cadenaCruda, objetoReemplazos){
                return cadenaCruda.replace(/%\w+%/g, function(reemplazo) {
                    //console.log("reemplazo: ", reemplazo);
                    return objetoReemplazos[reemplazo] || reemplazo;
                });
            }
            //console.log("prueba reemplazo: ", reemplazarTexto('My Name is %NAME% and my age is %AGE%, the following %TOKEN% is invalid. y gano el 10% de lo que tú',  {"%NAME%": "Mike","%AGE%": "26","%EVENT%": "20"}));
        }, false);