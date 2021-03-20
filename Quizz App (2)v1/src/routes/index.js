const express= require('express');
const router=express.Router();
const bodyParser= require('body-parser');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const passport=require('passport');

//const touchMovil=require('mobile-drag-drop');
const {isAuthenticated}=require('../auth/auth.js');

//Configuración del Body Parser
router.use(bodyParser.urlencoded({extendend:true}));
router.use(bodyParser.json());


//Motor de envío de Imágenes
Grid.mongo = mongoose.mongo;

 conn=mongoose.connection;

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
const Usuario=require('../modelos/usuario.js');
const Quizz=require('../modelos/quizz.js');
const Materia=require('../modelos/materia.js');
const Registros=require('../modelos/registros.js');

//--JS Back--//

const Revisor=require("../funciones/revisor.js")
const API=require("../funciones/api.js");
const materia = require('../modelos/materia.js');
const { resolve } = require('path');

// ------------||  R U T A S  ||----------------//

router.get('/',(req,res)=>{
    var registros=API.Find("materias");
    res.render('index');

 });


 //login
 router.post('/',passport.authenticate('local',{
   successRedirect: '/alumnos',
   failureRedirect: '/',
   failureFlash: false

   
 }));
 
   
 router.get('/logout',(req,res)=>{
  req.logOut();
  res.redirect("/");
});


//---------ADMINISTRADORES
 

//Dashboard
router.get('/administrador',async (req,res)=>{
   const usuarios=await Usuario.find({});
 
   res.render('administrador/index',{user: usuarios});
 
});


//Crear
router.get('/administrador/crear',(req,res)=>{
   res.render('administrador/crear');
 
});

router.post('/administrador/crear',(req,res)=>{
  
  
  

   Usuario.create(req.body,(error,usuario)=>{

   });
   res.redirect('/administrador');
});

//Editar

// vista del formulario con datos actuales del usuario a editar
router.get('/administrador/editar/:id',async(req,res)=>{
   const user=await Usuario.findById(req.params.id);

   res.render('administrador/editar',{user});
 
});



//envío por post para guardar los cambios
router.post('/administrador/editar',(req,res)=>{
  
       
         const idUsuario=req.body.id;

         Usuario.findByIdAndUpdate(idUsuario,{
             nombre:req.body.nombre,
             rol: req.body.rol,
             apPaterno: req.body.apPaterno,
             apMaterno: req.body.apMaterno,
             correoElectronico: req.body.correoElectronico,
             telefono: req.body.telefono,
             estatus:req.body.estatus
          },(error,user)=>{
             console.log(error,idUsuario);
             res.redirect('/administrador');
          } 
            );
     
});


router.post('/administrador/borrar',(req,res)=>{
   const idUsuario=req.body.id;
 

   Usuario.findByIdAndRemove(idUsuario, function(err){
      if(err){
         res.send(err);
      }
      else{
         res.redirect("/administrador");
      }
   })

});

//----------EDITORES

router.get('/editores',async (req,res)=>{
  const materia=await Materia.find({});

  res.render('editor/index',{materia: materia});

});



router.post('/materias',async(req,res)=>{
  Materia.create({nombre: req.body.nombre});
    res.redirect("/editores");
 
});




router.get('/editores/aprobar',(req,res)=>{
   res.render('editor/aprobar');

});

router.get('/editores/crear',async (req,res)=>{
  const materia=await Materia.find({});

  res.render('editor/crear',{materia: materia});

});




router.post('/editores/crear',upload.array('imagenes'),(req,res)=>{
  req.files
  console.log(req.body);
  
 	/* var contadorImagenes=0;

  var i;
  //variable para construir el cuestionario como un array
  var cuestionario= [
  ];

  
//Procesamiento de cada pregunta por la request
  for (i = 0; i < req.body.numeroPreguntas; i++) {
      var tipo="tipo"+(i+1);
      var pregunta="pregunta"+(i+1);
      var respuesta="respuesta"+(i+1);

      //filtro para relacionar preguntas e imágenes
        if (req.body[tipo]=="tipoIT"){

          //apertura de un espacio en el array de preguntas
          var preguntaImagen=req.body[pregunta];
          //asignación de un archivo en ese primer espacio
          preguntaImagen[0]=req.files[contadorImagenes].filename;
          //Movimiento del contador para asignar correctamente imagenes.
          contadorImagenes=contadorImagenes+1;
   

      }


      //Construcción de documentos de cuestionarios de manera iterativa
      var contenidoCuestionario={
        tipo:req.body[tipo],
        pregunta:  req.body[pregunta],
        respuesta: req.body[respuesta]
      }

     
  

    

     cuestionario.push(contenidoCuestionario);
  } 
  
   //guardado en la BD
   Quizz.create( 
      {
        nivel:req.body.nivel,
       grado:req.body.grado,
       claveMateria: req.body.claveMateria,
       nombreQuizz: req.body.nombreQuizz,
       cuestionario:cuestionario
       
       }
    
    ); */
      
  res.redirect("/editores/crear");
});


router.get('/editores/editar',(req,res)=>{
   res.render('editor/editar');

});


//---- DOCENTES

router.get('/docentes',(req,res)=>{
   res.render('docente/index');

});



router.get('/docentes/crear',(req,res)=>{
   res.render('docente/crear');

});

router.get('/docentes/editar',(req,res)=>{
   res.render('docente/editar');

});

router.get('/docentes/resultados',(req,res)=>{
   res.render('docente/estadisticas');

});

router.get('/grupo/:idgrupo/maestro/:idmaestro/materia/:idmateria/secuencia/:idsecuencia/jwt/:token',async (req,res)=>{
  res.send(req.params.idgrupo+" "+req.params.idmaestro+req.params.idsecuencia+req.params.idmateria+req.params.token  );
  
  var materia=req.params.idmateria;
  //console.log(materia);

  var subject= await API.findByID("materias",materia);
  console.log(subject);
  //var autentication= await API.autenticacion("ABCDEFGH");
  
    res.end();
});

//----Alumnos------------------
//MiddleWare aplicado
//router.get('/alumnos',isAuthenticated,async (req,res)=>{
  router.get('/alumnos',async (req,res)=>{



  const materiasBD=await Materia.find({});
  
  var x;
  var materias=[];


  for(x in materiasBD){

    var cuestionarios= await Quizz.find({claveMateria: materiasBD[x]._id}).exec();
    var datosCuestionario=[];

    for(y in cuestionarios){
        var datos= {
            id: cuestionarios[y]._id,
            nombre: cuestionarios[y].nombreQuizz
        };
        datosCuestionario.push(datos);
    }
    
   
    var materiasObj={
      materia: materiasBD[x].nombre,
      registros: datosCuestionario
    }

    materias.push(materiasObj);
  }



 


  
   const Quizzes=await Quizz.find({ });
   res.render('alumnos/index',{quizzes: Quizzes,materias});

});



router.get('/alumnos/registro',async(req,res)=>{

  //Boomer "5fce761f2e2106439e852306"
  var registros=await Registros.find({alumno: "5fce761f2e2106439e852306"},{"quizz":1,"_id":1}).exec();

  //Variable solo con los nombres del Quizz
  nombreQuizz=[];
  quizzNombreBD=await Quizz.find({_id:registros[0].quizz}).exec();
  

  var materiasBD=await Materia.find({});


  for(var i=0;i<registros.length;i++){
    quizzNombreBD=await Quizz.find({_id:registros[i].quizz},{"nombreQuizz":1,"_id":0}).exec();

    nombreQuizz.push(quizzNombreBD[0].nombreQuizz);
  }
  
  
res.render('alumnos/registro',{registros,nombreQuizz,materiasBD});
  
 
});

router.get('/alumnos/revision/:id',async(req,res)=>{

  //Recuperamos el registro del alumno que vamos a revisar
  var respuestaAlumnoElegida=await Registros.find({_id: req.params.id}).exec();

  //Recuperamos el quizz que contestó
  var quizz=await Quizz.findById(respuestaAlumnoElegida[0].quizz);

  console.log(respuestaAlumnoElegida [0].respuestas[0].respuestaA);
  console.log(respuestaAlumnoElegida [0].respuestas[0].revision);
  
   res.render('alumnos/revisionRespuestas',{quizz, respuestaAlumnoElegida });
 
});

router.get('/alumnos/examen/:id',async(req,res)=>{

   
   const quizz=await Quizz.findById(req.params.id);
   
   /*
   var materia=quizz.claveMateria;
   var color=await Materia.findById(materia)
   color=color.color;
  */
   res.render('alumnos/examen',{ quizz });

   

});



router.get('/alumnos/respuestas',(req,res)=>{
   res.render('alumnos/respuestas');

});

router.post('/alumnos/correccion',async (req,res)=>{
//Boomer 5fce761f2e2106439e852306

/* console.log(req.body);
Revisor.revisar("5fce761f2e2106439e852306",req);


*/

console.log(req.body);
var examencalificado= await Revisor.revisar("5fce761f2e2106439e852306",req);

//Para Guardar en la BD


//var examencalificado= await Revisor.revisar("5fce761f2e2106439e852306",req);
//var examencalificado= await Revisor.revisar("5fce761f2e2106439e852306",req);
 
//console.log(examencalificado);

 /*  //Para Guardar en la BD
  var examencalificado= await Revisor.revisar("5fce761f2e2106439e852306",req);
 
 console.log(examencalificado);
 */ 


 //Registros.create(examencalificado);
   res.render('alumnos/correccion');

});


 //----------Cuarto de pruebas------------///

 //Boomer "5fce761f2e2106439e852306"

 router.get('/pruebaAJAX',async (req, res)=>{
  var niveles=await API.Find("niveles");
  niveles=niveles.levels
  res.json(niveles)
})

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
       res.render('cuartoPruebas',{ files: files });
     }
   });
  

 });

 router.get('/cuarto2',(req, res)=>{
  res.render('cuartoPruebas2',{color:"#ffff99"});
})

router.get('/plantillaRevision',(req, res)=>{
  res.render('plantillaRevision',{color:"#ffff99"});
})

router.get('/plantillaQuizz',(req, res)=>{
  res.render('plantillaQuizz',{color:"#ffff99"});
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






 module.exports=router;
