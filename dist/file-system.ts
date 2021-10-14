import { FileUpload } from "../interfaces/file-upload";
import path from "path";
import fs from "fs";
import uniqid from "uniqid";

export default class FileSystem {
  constructor() {}

  guardarImagenTemporal(file: FileUpload, userId: string) {
    return new Promise<void>((resolve, reject) => {
      //Crear carpetas
      const path = this.crearCarpetaUsuario(userId);
      //Nombre archivo
      const nombreArchivo = this.generarNombreUnico(file.name);
      //Mover el archivo del Temp a nuestra carpeta
      file.mv(`${path}/${nombreArchivo}`, (err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  private generarNombreUnico(nombreOrigin: string) {
    const nombreArr = nombreOrigin.split(".");
    const extension = nombreArr[nombreArr.length - 1];
    const idUnico = uniqid();
    return `${idUnico}.${extension}`;
  }

  private crearCarpetaUsuario(userId: string) {
    const pathUser = path.resolve(__dirname, "../uploads/", userId);
    const pathUserTemp = pathUser + "/temp";
    const existe = fs.existsSync(pathUser);
    if (!existe) {
      fs.mkdirSync(pathUser);
      fs.mkdirSync(pathUserTemp);
    }
    return pathUserTemp;
  }

  imagenesDeTempHaciaPost( userId: string ){
    const pathTemp = path.resolve(__dirname, "../uploads/", userId, 'temp');
    const pathPost = path.resolve(__dirname, "../uploads/", userId, 'posts');
    if(!fs.existsSync(pathTemp)){
      return [];
    }
    if(!fs.existsSync(pathPost)){
      fs.mkdirSync( pathPost );
    }
    const imagenesTemp = this.obtenerImagenEnTemp( userId );
    imagenesTemp.forEach(imagen => {
      fs.renameSync(`${pathTemp}/${imagen}`, `${pathPost}/${imagen}`);
    });
    return imagenesTemp;
  }

  private obtenerImagenEnTemp(userId:string){
    const pathTemp = path.resolve(__dirname, "../uploads/", userId, 'temp');
    return fs.readdirSync( pathTemp ) || [];
  }

  getFotoUrl(userId: string, img: string){
    const pathFoto = path.resolve( __dirname, '../uploads', userId, 'posts', img);
    const existe = fs.existsSync(pathFoto);
    if(!existe){
      
    }
    return pathFoto;
  }
}
