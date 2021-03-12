'use strict'
const https = require('https');
const { stringify } = require('querystring');

var options = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'EBE v75zcs3rOEGE0bbJWv54qw!kKafTPFyzUizquudsvIWHA¡SUcVfO-IfUaXXNeVpmv9ug!2pOGsJwu_U65pfUiYQVFMw¡WvEiGh-eyEaO725Xpt_-XwNeVpmv9ug!2pOG'
  }

}

var URLbase = "https://gateway.ebe.jenios.mx/v1.0.0/devs/quizzes/sandbox";


exports.Find = function (recurso) {
  var urlRecurso
  switch (recurso) {
    case "grados":
      urlRecurso = URLbase + "/grades";
      break;
    case "materias":
      urlRecurso = URLbase + "/subjects";
      break;
    case "niveles":
      urlRecurso = URLbase + "/levels";
      break;
    case "bloques":
      urlRecurso = URLbase + "/blocks";
      break;
    case "secuencias":
      urlRecurso = URLbase + "/sequences";
      break;
  }

  https.get(urlRecurso, options, (res) => {
    let data = '';

    // Un fragmento de datos ha sido recibido.
    res.on('data', (chunk) => {
      data += chunk;
    });

    // Toda la respuesta ha sido recibida. Imprimir el resultado.
    res.on('end', () => {
      // console.log(data);
      console.log(JSON.parse(data));
      var registros = JSON.parse(data)
      //  console.log(secuenciasAPI[0]);
      return registros;
    });



  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });


}

exports.findByID = async function (recurso, recursoID) {
  var urlRecurso
  var modificador;
  var resultado;
  switch (recurso) {
    case "grados":
      modificador = "grades";
      urlRecurso = URLbase + "/grades";
      break;
    case "materias":
      modificador = "subjects";
      urlRecurso = URLbase + "/subjects";
      break;
    case "niveles":
      modificador = "levels"
      urlRecurso = URLbase + "/levels";
      break;
    case "bloques":
      modificador = "blocks";
      urlRecurso = URLbase + "/blocks";
      break;
    case "secuencias":
      modificador = "sequences";
      urlRecurso = URLbase + "/sequences";
      break;
  }
  resultado = await new Promise((resolve, reject) => {
    https.get(urlRecurso, options, (res) => {

      let data = '';

      // Un fragmento de datos ha sido recibido.
      res.on('data', (chunk) => {

        data += chunk;
      });

      // Toda la respuesta ha sido recibida. Imprimir el resultado.
      res.on('end', () => {
        var registro;
        var registros = JSON.parse(data);
        for (var i = 0; i < registros[modificador].length; i++) {
          //console.log(registros[modificador][i].id);

          if (registros[modificador][i].id === recursoID) {
            registro = registros[modificador][i];
            // console.log(registro)
            //  resolve(registro);
            break;
          }

        }
        resolve(registro);
        // return registro

      });



    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });

  });
  //resultado="wtf"
  return resultado;
}


exports.alumnos = function () {


  const postData = JSON.stringify(
    { "group_id": "RX87YY9E" }
  );

  console.log(postData);

  const optionsPOST = {
    method: 'POST',
    // agent: false,  // Create a new agent just for this one request
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'EBE v75zcs3rOEGE0bbJWv54qw!kKafTPFyzUizquudsvIWHA¡SUcVfO-IfUaXXNeVpmv9ug!2pOGsJwu_U65pfUiYQVFMw¡WvEiGh-eyEaO725Xpt_-XwNeVpmv9ug!2pOG'

    }
  };

  const req = https.request("https://gateway.ebe.jenios.mx/v1.0.0/devs/quizzes/sandbox/students", optionsPOST, (res) => {


    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      //console.log(`BODY: ${chunk}`);
      console.log(JSON.parse(chunk));
    });
    res.on('end', () => {
      console.log('No more data in response.');
    });
  });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });




  req.write(postData);

  req.end();

}