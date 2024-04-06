import { Router } from "express";
import { storage } from "../multer";
import { uploadController } from "../controllers";

export const upload = Router();

upload.post("/upload", storage.single("file"), uploadController);
