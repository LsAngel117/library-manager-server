// Servidor de Express
const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        //Conectar a la base de datos
        dbConnection();

        // Http server
        this.server = http.createServer(this.app);

    }

    middlewares() {
        // Desplegar el directorio público
        this.app.use(express.static(path.resolve(__dirname, '../public')));

        // CORS
        this.app.use(cors());
        // Parseo del body
        this.app.use(express.json());

        //API Endpoints
        this.app.use('/api/login', require('../router/auth'));
        this.app.use('/api/books', require('../router/libros'));
        this.app.use('/api/students', require('../router/estudiantes'));
        this.app.use('/api/professors', require('../router/profesores'));
        this.app.use('/api/assignments', require('../router/asignaciones'));
    }

    execute() {

        // Inicializar Middlewares
        this.middlewares();

        // Inicializar Server
        this.server.listen(this.port, () => {
            console.log('Server corriendo en puerto:', this.port);
        });
    }

}


module.exports = Server;