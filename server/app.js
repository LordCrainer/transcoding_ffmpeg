//Aquí dessarrollamos la aplicación en Express
//Rutas y dependencias
const express = require("express");
const app = express();
const morgan = require("morgan"); //Gestor de logging
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server); //require('socket.io')(server);
const videoRoutes = require("./api/1.routes/videos.router")(io); //Aquí importamos router de videos.js
const mailService = require("./api/3.service/mail.service");
//mailService("carlosgarcia.cagm@gmail.com", "camogan3000@hotmail.com", "CONVERSION FINALIZADA", "TODO EN ORDEN")
io.sockets.on("connection", function(socket) {
  //send data to client
  socket.on("message", msg => {
    console.log(msg);
    socket.emit("conversionVideo", "SERVER DATA");
  });
});

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false })); //Que soporte solo para pequeños bodies con data de URLs
app.use(bodyParser.json()); //Esta línea extraerá facilmente la data en JSON
//Programar la app para que filtre peticiones que empiecen con /videos. Estas peticiones son manejadas con videoRoutes como handler
app.use("/videos", videoRoutes); //Rutas que manejaran CRUD

app.use((req, res, next) => {
  const error = new Error("No encontrado");
  //error.status(404);
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = { app, server };
