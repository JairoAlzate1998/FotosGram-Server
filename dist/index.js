"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const mongoose_1 = __importDefault(require("mongoose"));
const server = new server_1.default();
//Rutas
server.app.use('/user', usuario_1.default);
//ConectarMongoDB
mongoose_1.default.connect('mongodb://localhost:27017/fotosgram', (err) => {
    if (err)
        throw err;
    console.log('Bases de datos online');
});
//Levantar Express
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});
