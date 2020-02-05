//INCLUIMOS LOS MODULOS NECESARIOS PARA UN SERVIDOR
const http = require('http');                   //ESTE PAQUETE HTTP NOS  PROVEE FUNCIONALIDADES PARA INICIAR EL SERVIDOR
const {app, server} = require('./app');
const port = process.env.PORT || 3000;           //??? TIENE QUE SER 3000 ?? QUE PUERTO ES MÁS PROFESIONAL?

//const server = http.createServer(app);   

server.listen(port, ()=>{
    console.log('SERVER ON PORT:  ', '\x1b[36m', `http://localhost:${port}`, '\x1b[0m');
});