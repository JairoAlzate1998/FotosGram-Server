import Server from "./classes/server";
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import fileUpload from 'express-fileupload';
import userRoutes from "./routes/usuario";
import postRoutes from "./routes/post";

const server = new Server();

//Body Parser
server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use(bodyParser.json());

//fileUpload
server.app.use( fileUpload() );

//Rutas
server.app.use('/user', userRoutes);
server.app.use('/posts', postRoutes);

//ConectarMongoDB
mongoose.connect('mongodb://localhost:27017/fotosgram', (err) => {
    if(err) throw err;
    console.log('Bases de datos online');
    
});

//Levantar Express
server.start( () => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
} );
