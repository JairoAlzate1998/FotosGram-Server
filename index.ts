import Server from "./classes/server";
import userRoutes from "./routes/usuario";
import mongoose from 'mongoose';

const server = new Server();

//Rutas
server.app.use('/user', userRoutes);

//ConectarMongoDB
mongoose.connect('mongodb://localhost:27017/fotosgram', (err) => {
    if(err) throw err;
    console.log('Bases de datos online');
    
});

//Levantar Express
server.start( () => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
} );
