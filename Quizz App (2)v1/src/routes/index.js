const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const passport = require('passport');



//Configuración del Body Parser
router.use(bodyParser.urlencoded({ extendend: true }));
router.use(bodyParser.json());


//Motor de envío de Imágenes
Grid.mongo = mongoose.mongo;

conn = mongoose.connection;

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: 'mongodb+srv://BVargas:p%213acE27@cluster0.4nutt.mongodb.net/Sistema_Quizz?retryWrites=true&w=majority',
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

//----M O D E L O S-----//
const Usuario = require('../modelos/usuario.js');
const Quizz = require('../modelos/quizz.js');
const Materia = require('../modelos/materia.js');
const Registros = require('../modelos/registros.js');

//---------MIDDLEWARES---------//

const { isAuthenticated } = require('../auth/auth.js');

//--JS Back--//

const Revisor=require("../funciones/revisor.js")
const API=require("../funciones/api.js");
const Funciones=require("../funciones/funciones.js");
const materia = require('../modelos/materia.js');
const { resolve } = require('path');
const { request } = require('http');

//----Variables globales---//
//Creación de una variable global para tener información disponible para las vistas de docentes
global.datosDocenteSesion = {};
//Creación de una variable global para tener la información del alumno
global.datosAlumnoSesion = {};
// ------------||  R U T A S  ||----------------//

router.get('/', async (req, res) => {
  res.render('index');
 var grupo=   await API.alumnos("R71MHRG4");
  console.log(grupo)
});


//login
router.post('/', passport.authenticate('local', {
  successRedirect: '/alumnos',
  failureRedirect: '/',
  failureFlash: false


}));


router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect("/");
});


//---------ADMINISTRADORES


//Dashboard
router.get('/administrador', async (req, res) => {
  const usuarios = await Usuario.find({});

  res.render('administrador/index', { user: usuarios });

});


//Crear
router.get('/administrador/crear', (req, res) => {
  res.render('administrador/crear');

});

router.post('/administrador/crear', (req, res) => {




  Usuario.create(req.body, (error, usuario) => {

  });
  res.redirect('/administrador');
});

//Editar

// vista del formulario con datos actuales del usuario a editar
router.get('/administrador/editar/:id', async (req, res) => {
  const user = await Usuario.findById(req.params.id);

  res.render('administrador/editar', { user });

});



//envío por post para guardar los cambios
router.post('/administrador/editar', (req, res) => {


  const idUsuario = req.body.id;

  Usuario.findByIdAndUpdate(idUsuario, {
    nombre: req.body.nombre,
    rol: req.body.rol,
    apPaterno: req.body.apPaterno,
    apMaterno: req.body.apMaterno,
    correoElectronico: req.body.correoElectronico,
    telefono: req.body.telefono,
    estatus: req.body.estatus
  }, (error, user) => {
    console.log(error, idUsuario);
    res.redirect('/administrador');
  }
  );

});


router.post('/administrador/borrar', (req, res) => {
  const idUsuario = req.body.id;


  Usuario.findByIdAndRemove(idUsuario, function (err) {
    if (err) {
      res.send(err);
    }
    else {
      res.redirect("/administrador");
    }
  })

});

//----------EDITORES

router.get('/editores', async (req, res) => {
  const materia = await Materia.find({});

  res.render('editor/index', { materia: materia });

});



router.post('/materias', async (req, res) => {
  Materia.create({ nombre: req.body.nombre });
  res.redirect("/editores");

});




router.get('/editores/aprobar', (req, res) => {
  res.render('editor/aprobar');

});

router.get('/editores/crear', async (req, res) => {

  res.render('editor/crear', );

});


router.post('/editores/crear',upload.array('imgs'), async (req,res)=>{
  var imagenes=req.files;
 
  /*
  console.log(req.body);

  console.log(req.body.nivel);
  console.log(req.body.grado);
  console.log(req.body.claveMateria);
  console.log(req.body.bloques);
  console.log(req.body.Secuencias);
  console.log(req.body.nombreQuizz);


 */
 	//var contadorImagenes=0;

  var i;
  //variable para construir el cuestionario como un array
  var cuestionario= [
  ];

  //Si al menos e envio un cuestionario diferente a Drag
  if (req.body.tipo1){
//Procesamiento de cada pregunta por la request
  for (i = 0; i < req.body.numeroPreguntas; i++) {
      var tipo="tipo"+(i+1);
      var pregunta="pregunta"+(i+1);
      var respuesta="respuesta"+(i+1);

      //filtro para relacionar preguntas e imágenes
        if (req.body[tipo]=="tipoIT"){

          //Definimos el valor con el que llega el nombre de la imagen
          var imgKey="imagen"+(i+1);
          var nombreImg=req.body[imgKey];
          //
          var imagen=Funciones.buscarImagen(nombreImg,imagenes) 

          //Creamos un array para la estructura de la preguta
          var preguntaImagen=[];
          // En el primer espacio guardamos el nombre de la Imagen
          preguntaImagen[0]=imagen.filename;
          //En el segundo la pregunta
          preguntaImagen[1]=req.body[pregunta];
          //Y reasignamos el valor en la request
          req.body[pregunta]=preguntaImagen;
      }


      //Construcción de documentos de cuestionarios de manera iterativa
      var contenidoCuestionario={
        tipo:req.body[tipo],
        pregunta:  req.body[pregunta],
        respuesta: req.body[respuesta]
      }

     
      cuestionario.push(contenidoCuestionario);
      
      
    

     
  } 
}
  //Lectura de Preguntas Drag
  if(req.body.lienzos)
  {
    for(var j=0;j<req.body.lienzos;j++){
      var claveLienzo="lienzo"+j;
      var dataLienzo=JSON.parse(req.body[claveLienzo]);

      var imagenHTML=dataLienzo.pregunta[0].nombre;
      //Buscamos el archivo al que está vinculada la imagen
      var imagen=Funciones.buscarImagen(imagenHTML,imagenes);
      //Y lo reasignamos con el nombre con el que encontrará la imagen en la BD
      dataLienzo.pregunta[0].nombre=imagen.filename;
      console.log(dataLienzo.pregunta[0].nombre)
      var cuestionarioLienzo=dataLienzo;
      cuestionario.push(cuestionarioLienzo);
    }
  }

  
   //guardado en la BD
   var nuevoQuizz= await Quizz.create( 
      {
      

    nivel:req.body.nivel,
    grado:req.body.grado,
    materia:req.body.claveMateria,
    bloque:req.body.bloques,
    secuencia:req.body.Secuencias,
    nombreQuizz:req.body.nombreQuizz,
    creador:"Pendiente",
    cuestionario: cuestionario
       
       }
    
    );
    //console.log(nuevoQuizz._id);
  var ruta="/alumnos/examen/"+nuevoQuizz.id;
  res.redirect(ruta);
   
  
});




router.get('/editores/editar', (req, res) => {
  res.render('editor/editar');

});


//---- DOCENTES

router.get('/docentes', (req, res) => {
  res.render('docente/index');

});


router.get('/docentes/editar', (req, res) => {
  res.render('docente/editar');

});



router.get('/grupo/:idgrupo/maestro/:idmaestro/materia/:idmateria/secuencia/:idsecuencia/jwt/:token', async (req, res) => {


  var grupo = req.params.idgrupo;
  var materia = await API.findByID("materias", req.params.idmateria);

  var secuencia = await API.findByID("secuencias", req.params.idsecuencia);
  var bloque = await API.findByID("bloques", secuencia.bloque);
  var grado = await API.findByID("grados", materia.grado);
  var nivel = await API.findByID("niveles", grado.nivel);
  //Variable para conocer los ids de los quizzes  de una secuencia
  var quizzesSecuencia;
  //Variable para guardar los alumnos que tienen un progreso dentro de la secuencia
  var alumnos

  var datosSesion = {
    nivel: nivel,
    grado: grado,
    grupo: grupo,
    materia: materia,
    bloque: bloque,
    secuencia: secuencia,
    usuario: req.params.idmaestro,
    quizzesSecuencia: quizzesSecuencia,
    alumnos: alumnos
  }

  datosDocenteSesion = datosSesion;
  console.log("Datos Docente");
  console.log(datosDocenteSesion);
  res.render('docente/index', { "datosVista": datosSesion });
});

router.get('/docentes/crear', async (req, res) => {

  res.render('docente/crear');

});

router.get('/docentes/secuencia', async (req, res) => {

  var alumnosGrupo = await API.alumnos(datosDocenteSesion.grupo);


  //console.log(datosDocenteSesion.secuencia.id);
  var quizzesSecuencia = await Quizz.find({ secuencia: { $eq: datosDocenteSesion.secuencia.id } }, { nombreQuizz: 1 }).exec();
  var totalQuizzes = quizzesSecuencia.length;

  var idQuizzSecuencia = [];
  //for para obtener todos los id de los quizzes de la secuencia
  for (q in quizzesSecuencia) {

    idQuizzSecuencia.push(quizzesSecuencia[q]);
  }

  //Captura de los ids quizz secuencia
  datosDocenteSesion.quizzesSecuencia = idQuizzSecuencia;

  var alumnosProgreso = [];
  //alumno sin progreso alguno en la secuencia
  var alumnos = [];

  var x
  for (var i = 0; i < alumnosGrupo.length; i++) {

    var progreso = 0;

    //Por cada Quizz en la secuencia

    for (x in quizzesSecuencia) {


      var quizzI = quizzesSecuencia[x];

      //Buscamos si ha contestado el alumno por lo menos una vez el quizz x
      var quizzContestado = await Registros.find({ $and: [{ alumno: alumnosGrupo[i].id }, { quizz: quizzI.id }] });
      if (quizzContestado.length >= 1) {
        progreso = progreso + 1;
      }

    }
    //Si hay algún progreso
    if (progreso >= 1) {
      var resultadoAlumno = {
        alumno: alumnosGrupo[i],
        progreso: (progreso + "/" + totalQuizzes)
      }

      alumnosProgreso.push(resultadoAlumno);
    }
    else {
      var resultadoAlumno = {
        alumno: alumnosGrupo[i],
      }
      alumnos.push(resultadoAlumno);
    }

  }
  datosDocenteSesion.alumnos = alumnosProgreso;
  res.render('docente/secuencias', { datosDocenteSesion, alumnosProgreso, alumnos });

});

router.get('/docentes/estadisticas/:idalumno', async (req, res) => {

  var alumnoAnalizado;

  //Extracción del alumno
  for (var i = 0; i < datosDocenteSesion.alumnos.length; i++) {
    if ((req.params.idalumno) == (datosDocenteSesion.alumnos[i].alumno.id)) {
      alumnoAnalizado = datosDocenteSesion.alumnos[i];
      break;
    }
  }


  var datosIntentos = [];


  for (var i = 0; i < datosDocenteSesion.quizzesSecuencia.length; i++) {
    var quizzI = datosDocenteSesion.quizzesSecuencia[i];
    var Intentos = await Registros.find({ $and: [{ alumno: req.params.idalumno }, { quizz: quizzI.id }] });

    //Variable para juntar todos los intentos por Quizz
    var apartado = [];

    for (x in Intentos) {
      var intentoPorQuizz = Intentos[x];
      apartado.push(intentoPorQuizz);
    }

    /*
    var claveQuizz="quizz"+i;
    datosIntentos[claveQuizz]={
      nombre: quizzI.nombreQuizz,
      intentos:apartado
    }
    */

    var datosIntento = {
      nombre: quizzI.nombreQuizz,
      intentos: apartado
    }

    datosIntentos.push(datosIntento);
  }
  //console.log(datosIntentos);
  //datosIntentos2=JSON.parse(datosIntentos);
  console.log(datosIntentos);
  res.render('docente/estadisticas', { datosDocenteSesion, alumnoAnalizado, datosIntentos });

});


//----Alumnos------------------
//MiddleWare aplicado
//router.get('/alumnos',isAuthenticated,async (req,res)=>{
router.get('/alumnos', async (req, res) => {



  const materiasBD = await Materia.find({});

  var x;
  var materias = [];


  for (x in materiasBD) {

    var cuestionarios = await Quizz.find({ claveMateria: materiasBD[x]._id }).exec();
    var datosCuestionario = [];

    for (y in cuestionarios) {
      var datos = {
        id: cuestionarios[y]._id,
        nombre: cuestionarios[y].nombreQuizz
      };
      datosCuestionario.push(datos);
    }


    var materiasObj = {
      materia: materiasBD[x].nombre,
      registros: datosCuestionario
    }

    materias.push(materiasObj);
  }







  const Quizzes = await Quizz.find({});
  res.render('alumnos/index', { quizzes: Quizzes, materias });

});

//----Alumnos------------------
//MiddleWare aplicado
//router.get('/alumnos',isAuthenticated,async (req,res)=>{

router.get('/grupo/:idgrupo/alumno/:idalumno/materia/:idmateria/secuencia/:idsecuencia/jwt/:token', async (req, res) => {

  //data que se envia a la siguiente vista para ser mostrada
  var data = {
    nombreMateria: '',
    grupo: '',
    alumno: '',
    idAlumno: '',
    urlImg: ''
  };

  var materia = req.params.idmateria; // variable de extraccion de id de materia de url
  var sec = req.params.idsecuencia; // cariable de extraccion de id de secuencia de url
  var idgrupo = req.params.idgrupo; // variable de extraccion de id de grupo
  var idAlumno = req.params.idalumno;
  var estado = 'Pendiente de Revisión'; // variable por defecto para el estado de un quizz 
  var subject = await API.findByID("materias", materia);
  var grupo = await API.alumnos(idgrupo);
  var cuestionarios = await Quizz.find({ secuencia: sec }).exec();
  var datosCuestionario = [];
  data.nombreMateria = subject.nombre;
  data.urlImg = subject.portada;

  for (let i = 0; i < grupo.length; i++) {
    if (grupo[i].id === idAlumno) {
      data.alumno = grupo[i].nombre;
    }

  }
  data.idAlumno = idAlumno;
  console.log(data);
  datosAlumnoSesion = idAlumno;
  //asdas

  for (y in cuestionarios) {

    if (cuestionarios[y].estado !== 'por revisar') {

      estado = cuestionarios[y].estado;
      calificacion = cuestionarios[y].calificacion + '/10';

    } else {

      calificacion = 'Calificacion Pendiente';

    }

    var datos = {
      id: cuestionarios[y]._id,
      nombre: cuestionarios[y].nombreQuizz,
      estado: estado
    };

    datosCuestionario.push(datos);

  }




  //API.alumnos();
  const Quizzes = await Quizz.find({});
  res.render('alumnosQuizz/index', { quizzes: Quizzes, data, datosCuestionario });

});

router.get('/alumnos/registro', async (req, res) => {

  //Boomer "5fce761f2e2106439e852306"
  var registros = await Registros.find({ alumno: "5fce761f2e2106439e852306" }, { "quizz": 1, "_id": 1 }).exec();

  //Variable solo con los nombres del Quizz
  nombreQuizz = [];
  quizzNombreBD = await Quizz.find({ _id: registros[0].quizz }).exec();


  var materiasBD = await Materia.find({});


  for (var i = 0; i < registros.length; i++) {
    quizzNombreBD = await Quizz.find({ _id: registros[i].quizz }, { "nombreQuizz": 1, "_id": 0 }).exec();

    nombreQuizz.push(quizzNombreBD[0].nombreQuizz);
  }


  res.render('alumnos/registro', { registros, nombreQuizz, materiasBD });


});

router.get('/alumnos/revision/:id', async (req, res) => {

  //Recuperamos el registro del alumno que vamos a revisar
  var respuestaAlumnoElegida = await Registros.find({ _id: req.params.id }).exec();

  //Recuperamos el quizz que contestó
  var quizz = await Quizz.findById(respuestaAlumnoElegida[0].quizz);

  console.log(respuestaAlumnoElegida[0].respuestas[0].respuestaA);
  console.log(respuestaAlumnoElegida[0].respuestas[0].revision);

  
   res.render('alumnos/examen',{ quizz });

});

router.get('/alumnos/examen/:id/alumno/:idAlumno', async (req, res) => {


  const idAlumno = req.params.idAlumno;
  const quizz = await Quizz.findById(req.params.id);
  res.render('alumnos/Quizz', { quizz, idAlumno });





});

router.get('/alumnos/examen/:id', async (req, res) => {


  const quizz = await Quizz.findById(req.params.id);
  res.render('alumnos/Quizz', { quizz });

  



});


router.get('/alumnos/respuestas', (req, res) => {
  res.render('alumnos/respuestas');

});

router.post('/alumnos/correccion/alumno/:idAlumno', async (req, res) => {
  var idAlumno = req.params.idAlumno;
  //Boomer 5fce761f2e2106439e852306
  // alumno Ignacio BP32G1BF  grupo RX87YY9E
  /* console.log(req.body);
  Revisor.revisar("5fce761f2e2106439e852306",req);
  
    console.log(req.body);
    var examencalificado = await Revisor.revisar("5fce761f2e2106439e852306", req);
  
    //Para Guardar en la BD
  
  console.log(req.body);
  var examencalificado= await Revisor.revisar("BP32G1BF",req);
  
    //var examencalificado= await Revisor.revisar("5fce761f2e2106439e852306",req);
    //var examencalificado= await Revisor.revisar("5fce761f2e2106439e852306",req);
  
    //console.log(examencalificado);
  
    /*  //Para Guardar en la BD
     var examencalificado= await Revisor.revisar("5fce761f2e2106439e852306",req);
    
    console.log(examencalificado);
    */
  var examencalificado = await Revisor.revisar(idAlumno, req);

  //Registros.create(examencalificado);
  //res.render('alumnos/correccion');

  Registros.create(examencalificado);
  res.render('alumnos/correccion');

});


//----------Cuarto de pruebas------------///

//Boomer "5fce761f2e2106439e852306"



router.get("/pruebaAJAXniveles", async (req, res) => {
  var niveles = await API.Find("niveles");
  niveles = niveles.levels;
  res.json(niveles);
});

router.get("/pruebaAJAXgrados", async (req, res) => {
  var grados = await API.Find("grados");
  grados = grados.grades;
  res.json(grados);
});

router.get("/pruebaAJAXmaterias", async (req, res) => {
  var materias = await API.Find("materias");
  materias = materias.subjects;
  res.json(materias);
});

router.get("/pruebaAJAXbloques", async (req, res) => {
  var bloques = await API.Find("bloques");
  bloques = bloques.blocks;
  res.json(bloques);
});

router.get("/pruebaAJAXsecuencias", async (req, res) => {
  var secuencias = await API.Find("secuencias");
  secuencias = secuencias.sequences;
  res.json(secuencias);
});

router.get("/pruebaAJAXgrados/:idnivel", async (req, res) => {
  var grados = await API.busqueda(req.params.idnivel,"nivel","grados"); 
  res.json(grados); 
});

router.get("/pruebaAJAXmaterias/:idgrado", async (req, res) => {
  var materias = await API.busqueda(req.params.idgrado,"grado","materias"); 
  res.json(materias); 
});


router.get("/pruebaAJAXbloques/:idmateria", async (req, res) => {
  var bloques = await API.busqueda(req.params.idmateria,"materia","bloques"); 
  res.json(bloques); 
});

router.get("/pruebaAJAXsecuencias/:idbloque", async (req, res) => {
  var secuencias = await API.busqueda(req.params.idbloque,"bloque","secuencias"); 
  res.json(secuencias);
});


router.get('/cuarto', (req, res) => {

  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      res.render('index', { files: false });
    } else {
      files.map(file => {
        if (
          file.contentType === 'image/jpeg' ||
          file.contentType === 'image/png'
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
      });
      //console.log(files)
      res.render('cuartoPruebas', { files: files });
    }
  });


});

router.get('/cuarto2', (req, res) => {
  res.render('cuartoPruebas2', { color: "#ffff99" });
})

router.get('/plantillaRevision',(req, res)=>{
  res.render('plantillaCreadorQuizz2',{color:"#ffff99"});
})

router.get('/plantillaQuizz', (req, res) => {
  res.render('plantillaQuizzFinal', { color: "#ffff99" });
})
router.get('/rediseno', (req, res) => {
  res.render('rediseno', { color: "#FFE8CD" });
})

router.get("/plantillaQuizzFinal", (req, res) => {
  res.render("plantillaQuizzFinal", { color: "#ffff99" });
});

// @route POST /upload
// @desc  Uploads file to DB
router.post('/upload', upload.single('file'), (req, res) => {
  res.json({ file: req.file.id });

  //res.redirect('/cuarto');
});

// @route GET /files
// @desc  Display all files in JSON
router.get('/files', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }

    // Files exist
    return res.json(files);
  });
});

// @route GET /files/:filename
// @desc  Display single file object
router.get('/files/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // File exists
    return res.json(file);
  });
});



// @route GET /image/:filename
// @desc Display Image
router.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});

// @route DELETE /files/:id
// @desc  Delete file
router.post('/files/:id', (req, res) => {
  gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }

    res.redirect('/');
  });
});






module.exports = router;
