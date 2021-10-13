import { Router, Response } from "express";
import { verificaToken } from "../middlewares/autenticacion";
import { Post } from "../models/post.model";

const postRoutes = Router();

//obtener post paginados
postRoutes.get("/", async (req: any, res: Response) => {
  let pagina = Number(req.query.pagina) || 1;
  let skip = pagina - 1;
  skip = skip * 10;
  const posts = await Post.find()
    .sort({ _id: -1 })
    .limit(10)
    .populate("usuario", "-password")
    .skip( skip )
    .exec();
  res.json({
    ok: true,
    pagina,
    posts,
  });
});

//Crear Post
postRoutes.post("/", [verificaToken], (req: any, res: Response) => {
  const body = req.body;
  body.usuario = req.usuario._id;
  Post.create(body)
    .then(async (postDB) => {
      await postDB.populate("usuario", "-password");
      res.json({
        ok: true,
        postDB,
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

export default postRoutes;
