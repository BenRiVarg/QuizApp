$.getJSON("/pruebaAJAXniveles", function (niveles) {
    for (var i = 0; i < niveles.length; i++) {
      var nombres = (niveles[i].nombre);
      var id = (niveles[i].id);
      var select = document.getElementById("nivel").innerHTML +=
        "<option value='"+ id +"'>" + nombres + "</option>";
      
     /*   console.log(nombres); */
    }
     
  });

   $.getJSON("/pruebaAJAXgrados", function (grados) {
   /*    for (var i = 0; i < 6; i++) {
        var nombres = (grados[i].nombre);
        var id = (grados[i].id);
        var select = document.getElementById("grados").innerHTML +=
          "<option value='" + id + "'>" + nombres + "</option>";
       
        console.log(nombres);
      } */

     var visible = document.getElementById("grados").style.display = "none"; 
    });

      $.getJSON("/pruebaAJAXmaterias", function (materias) {
          /* for (var i = 0; i < 6; i++) {
            var nombres = (materias[i].nombre);
            var id = (materias[i].id);
            var select = document.getElementById("materias").innerHTML +=
              "<option value='" + id + "'>" + nombres + "</option>";
            console.log(nombres);
          } */

        var visible = document.getElementById("materias").style.display = "none"; 
        });

         $.getJSON("/pruebaAJAXbloques", function (bloques) {
         /*    for (var i = 0; i < 6; i++) {
              var nombres = (bloques[i].nombre);
              var id = (bloques[i].id);
              var select = document.getElementById("bloques").innerHTML +=
                "<option value='" + id + "'>" + nombres + "</option>";
            
              console.log(nombres); 
            } */

           var visible = document.getElementById("bloques").style.display = "none"; 
          });

          
            $.getJSON("/pruebaAJAXsecuencias", function (secuencias) {
             /*  for (var i = 0; i < 6; i++) {
                var nombres = (secuencias[i].nombre);
                var id = (secuencias[i].id);
                var select = document.getElementById("secuencias").innerHTML +=
                  "<option value='" + id + "'>" + nombres + "</option>";
              
                console.log(nombres);
              } */

              var visible = document.getElementById("secuencias").style.display = "none";
            });

  $('#nivel').on('change', async function () {
        console.log(this.value);
        var grados= await getGrados(this.value);
        console.log("GRADOS OBTENIDOS")
        console.log(grados);
        console.log(grados[0].id);
        console.log(grados[0].nombre);
        for (var i = 0; i < grados.length; i++) {
        document.getElementById("grados").innerHTML +=
          "<option value='" + (grados[i].id) + "'>" + (grados[i].nombre) + "</option>";
        }
      var visible = document.getElementById("grados").style.display = "block"; 
    });

      $('#grados').on('change', async function () {
          console.log(this.value);
          var materias = await getMaterias(this.value);
          console.log("MATERIAS OBTENIDOS")
          console.log(materias);
          console.log(materias[0].id);
          console.log(materias[0].nombre);
          for (var i = 0; i < materias.length; i++) {
          document.getElementById("materias").innerHTML +=
          "<option value='" + (materias[i].id) + "'>" + (materias[i].nombre) + "</option>";
          }
          var visible = document.getElementById("materias").style.display = "block";
        });

        
          $('#materias').on('change', async function () {
            console.log(this.value);
            var bloques = await getBloques(this.value);
            console.log("BLOQUES OBTENIDOS")
            console.log(bloques);
            console.log(bloques[0].id);
            console.log(bloques[0].nombre);
            for (var i = 0; i < bloques.length; i++) {
            document.getElementById("bloques").innerHTML +=
                "<option value='" + (bloques[i].id) + "'>" + (bloques[i].nombre) + "</option>";
            } 
            var visible = document.getElementById("bloques").style.display = "block";
          });

           $('#bloques').on('change', async function () {
              console.log(this.value);
              var secuencias = await getSecuencias(this.value);
              console.log("SECUENCIAS OBTENIDOS")
              console.log(secuencias);
              console.log(secuencias[0].id);
              console.log(secuencias[0].nombre);
              for (var i = 0; i < secuencias.length; i++) {
                 document.getElementById("secuencias").innerHTML +=
                  "<option value='" + (secuencias[i].id) + "'>" + (secuencias[i].nombre) + "</option>";
              }
              var visible = document.getElementById("secuencias").style.display = "block";
            });


  async function getGrados(idNivel){

    var gradosDelNivel= await new Promise((resolve, reject) => {
        $.getJSON("/pruebaAJAXgrados/"+idNivel+"", function (grados) {
          
          resolve(grados)
        });
     });

    console.log("Resultado");
    return gradosDelNivel;
  }
   
  async function getMaterias(idGrado){

    var materiasDelGrado= await new Promise((resolve, reject) => {
      $.getJSON("/pruebaAJAXmaterias/"+idGrado+"", function (materias) {
          
          resolve(materias);
         });
     });

     return materiasDelGrado;
 }

 async function getBloques(idMateria){

      var bloquesPorMateria= await new Promise((resolve, reject) => {
        $.getJSON("/pruebaAJAXbloques/"+idMateria+"", function (bloques) {
            
            resolve(bloques);
          });
      });

      return bloquesPorMateria;
  }
    
  async function getSecuencias(idBloque){

    var secuenciasPorBloque= await new Promise((resolve, reject) => {
      $.getJSON("/pruebaAJAXsecuencias/"+idBloque+"", function (secuencias) {
          
          resolve(secuencias);
        });
    });

    return secuenciasPorBloque;
    }
    
   
    