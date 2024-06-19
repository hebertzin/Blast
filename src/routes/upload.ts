import { Router } from 'express'
import { storage } from '../utils/multer'
import { uploadFileControllerHandler } from '../controllers/add-file'
import { uploadFilesControllerHandler } from '../controllers/add-multiples-files'
import { deleteFileControllerHandler } from '../controllers/delete-file'
import { listFilesControllerHandler } from '../controllers/list-all-files'
import { listFileByIdControllerHandler } from '../controllers/list-file-by-id'
export const upload = Router()

upload.post(
  '/upload',
  storage.single('file'),
  uploadFileControllerHandler.handle,
)

upload.post(
  '/multi-upload',
  storage.array('files'),
  uploadFilesControllerHandler.handle,
)

upload.delete('/upload/:key', deleteFileControllerHandler.handle)

upload.get('/uploads/all', listFilesControllerHandler.handle)

upload.get('/upload/:key', listFileByIdControllerHandler.handle)
