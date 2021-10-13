"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const mongoose_1 = require("mongoose");
const usuarioSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es necesario"],
    },
    avatar: {
        type: String,
        defualt: "av-1.png",
    },
    email: {
        type: String,
        unique: true,
        required: [true, "El correo es necesario"],
    },
    password: {
        type: String,
        require: [true, "La contraseña es necesaria"]
    }
});
exports.Usuario = (0, mongoose_1.model)('Usuario', usuarioSchema);
