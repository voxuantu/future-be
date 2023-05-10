// const cloudinary = require("cloudinary").v2;
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryResponse } from "../types/cloudinary";
const toStream = require("buffer-to-stream");

export class CloudinaryService {
  static async upload(
    file: Express.Multer.File,
    folderName: string
  ): Promise<CloudinaryResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          folder: folderName,
        },
        (error, result) => {
          if (error) return reject(error);
          if (result) resolve(result);
        }
      );

      toStream(file.buffer).pipe(upload);
    });
  }
}
