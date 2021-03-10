'use strict'
const https = require('https');
const { stringify } = require('querystring');

  var options={
    headers: {'Content-Type': 'application/json',
                'Authorization': 'EBE v75zcs3rOEGE0bbJWv54qw!kKafTPFyzUizquudsvIWHA¡SUcVfO-IfUaXXNeVpmv9ug!2pOGsJwu_U65pfUiYQVFMw¡WvEiGh-eyEaO725Xpt_-XwNeVpmv9ug!2pOG'}
   
  }

  var sequenciasURL="https://gateway.ebe.jenios.mx/v1.0.0/devs/quizzes/sandbox/sequences";
  
  exports.secuencias= async function(){
  
    https.get(sequenciasURL,options,(res)=>{
        let data = '';
        
        // Un fragmento de datos ha sido recibido.
        res.on('data', (chunk) => {
          data += chunk;
        });
      
        // Toda la respuesta ha sido recibida. Imprimir el resultado.
        res.on('end', () => {
         // console.log(data);
         //console.log(JSON.parse(data));
         var secuenciasAPI=JSON.parse(data)
       //  console.log(secuenciasAPI[0]);
         return secuenciasAPI.sequences;
        });
      
        
      
    }).on("error", (err) => {
        console.log("Error: " + err.message);
      });

     
  
  }

  exports.secuenciasFindBYID= async function(idSecuencia){
  
    https.get(sequenciasURL,options,(res)=>{
        let data = '';
        
        // Un fragmento de datos ha sido recibido.
        res.on('data', (chunk) => {
          data += chunk;
        });
      
        // Toda la respuesta ha sido recibida. Imprimir el resultado.
        res.on('end', () => {
            var registro;
         // console.log(data);
         //console.log(JSON.parse(data));
         var secuenciasAPI=JSON.parse(data)
         //console.log(secuenciasAPI.sequences.length)
        for(var i=0; i<secuenciasAPI.sequences.length;i++){

            if(secuenciasAPI.sequences[i].id==(idSecuencia)){
                registro=secuenciasAPI.sequences[i];
                console.log(registro)
              
            }
           
        }

        return registro
      
        });
      
        
      
    }).on("error", (err) => {
        console.log("Error: " + err.message);
      });

  }

  var depurado="https://gateway.ebe.jenios.mx/v1.0.0/devs/quizzes/sandbox/group";
  
  exports.depurado= async function(){
  
    https.get(depurado,options,(res)=>{
        let data = '';
        
        // Un fragmento de datos ha sido recibido.
        res.on('data', (chunk) => {
          data += chunk;
        });
      
        // Toda la respuesta ha sido recibida. Imprimir el resultado.
        res.on('end', () => {
         // console.log(data);
         //console.log(JSON.parse(data));
         var depuradoJSON=JSON.parse(data)
         console.log(depuradoJSON);
        // return secuenciasAPI.sequences;
        });
      
        
      
    }).on("error", (err) => {
        console.log("Error: " + err.message);
      });

     
  
  }

  exports.alumnos=function(){
 

   const postData = JSON.stringify(
    {"group_id": "RX87YY9E"} 
    );
    
    console.log(postData);

  const optionscalis = {
    method: 'POST',
   // agent: false,  // Create a new agent just for this one request
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'EBE v75zcs3rOEGE0bbJWv54qw!kKafTPFyzUizquudsvIWHA¡SUcVfO-IfUaXXNeVpmv9ug!2pOGsJwu_U65pfUiYQVFMw¡WvEiGh-eyEaO725Xpt_-XwNeVpmv9ug!2pOG'
      
    }
  };

    const req = https.request("https://gateway.ebe.jenios.mx/v1.0.0/devs/quizzes/sandbox/students",optionscalis, (res) => {
     

    console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
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