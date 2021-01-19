const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const bodyParser = require("body-parser");
//Criamos uma classe para trabalhar com apenas uma instancia do server
class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  //Onde será configurado nossas rotas
  routes() {
    this.server.use(routes);
  }

  //Se ocorrerá algum tipo de middleware na aplicação
  middlewares() {
    this.server.use(cors());
    // this.server.use(express.json());
    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use(bodyParser.json());

    // this.server.use((req, res, next) => {
    //     res.header('Access-Control-Allow-Origin', '*');
    //     res.header('Access-Control-Allow-Header', 'Origin, X-Request-With, Content-Type, Accept, Authorization');

    //     if(req.method === 'OPTIONS')
    //     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // })
  }
}

module.exports = new App().server;
