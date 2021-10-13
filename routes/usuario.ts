import { Router, Request, Response } from "express";
import { Usuario } from "../models/usuario.model";

const userRoutes = Router();

userRoutes.get('/prueba', (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: 'Todo funciona bien'
    });
});

userRoutes.post('/create', (req: Request, res:Response) => {
    const user = {
        nombre: req.body.nombre,
        email: req.body.email, 
        password: req.body.password
    };
    Usuario.create( user).then( userDB => {
        res.json({
            ok: true,
            user: userDB
        });
    }).catch( err => {
        res.json({
            ok: false,
            error: err
        });
    });
});

export default userRoutes;