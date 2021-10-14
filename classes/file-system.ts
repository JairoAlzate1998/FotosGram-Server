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
}