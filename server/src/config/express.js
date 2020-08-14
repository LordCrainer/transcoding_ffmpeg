//Aquí dessarrollamos la aplicación en Express
//Rutas y dependencias
const express = require('express');
const app = express();
const morgan = require('morgan');               //Gestor de logging
const bodyParser = require('body-parser');
const cors = require("cors");

const videoRoutes = require('../api/routes/videos');             //Aquí importamos router de videos.js

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions))
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));      //Que soporte solo para pequeños bodies con data de URLs
app.use(bodyParser.json());                            //Esta línea extraerá facilmente la data en JSON


/*app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');       //como es restful api ajustara el response con este header  || *: permite cualquier origen url
    res.header('Access-Control-Allow-Origin','Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Method','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

});*/
//___________________________________________________________

 //Programar la app para que filtre peticiones que empiecen con /videos. Estas peticiones son manejadas con videoRoutes como handler
app.use('/videos',videoRoutes);            //Rutas que manejaran CRUD


app.use((req,res,next) => {
     const error = new Error('No encontrado');
    //error.status(404);  
    error.status = 404;
    next(error);
    })
app.use((error,req,res,next) => { 
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

 module.exports = app;