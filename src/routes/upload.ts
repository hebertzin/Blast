import { Router } from 'express'
import { storage } from '../multer'
import { uploadController } from '../controllers/add-file'
import { multiplesUploadsController } from '../controllers/add-multiples-files'
import { deleteUploadController } from '../controllers/delete-file'
import { listAllFilesController } from '../controllers/list-all-files'
import { listFileByIdController } from '../controllers/list-file-by-id'

export const upload = Router()

upload.post('/upload', storage.single('file'), uploadController)

upload.post('/multi-upload', storage.array('files'), multiplesUploadsController)

upload.delete('/upload/:key', deleteUploadController)

upload.get('/uploads/all', listAllFilesController)

upload.get('/upload/:key', listFileByIdController)
