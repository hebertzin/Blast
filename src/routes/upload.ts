import { Router } from 'express'
import { storage } from '../utils/multer'
import { uploadFilesControllerHandler } from '../controllers/multi-upload-controller'
import { deleteFileControllerHandler } from '../controllers/delete-file-controller'
import { listFilesControllerHandler } from '../controllers/list-all-files-controller'
import { listFileByIdControllerHandler } from '../controllers/list-file-by-id-controller'
import { fileValidatorMiddleware } from '../middleware/validate-files'
import { Request, Response } from 'express'
import { uploadFileControllerHandler } from '../controllers/upload-file-controller'

export const upload = Router()

upload.post(
  '/files/upload',
  storage.single('file'),
  fileValidatorMiddleware.validateFile.bind(fileValidatorMiddleware),
  async (req: Request, res: Response) => {
    await uploadFileControllerHandler.handle(req, res)
  },
)

upload.post(
  '/files/multi-upload',
  storage.array('files'),
  fileValidatorMiddleware.validateFile.bind(fileValidatorMiddleware),
  async (req: Request, res: Response) => {
    await uploadFilesControllerHandler.handle(req, res)
  },
)

upload.delete('/files/:id', async (req: Request, res: Response) => {
  return await deleteFileControllerHandler.handle(req, res)
})

upload.get('/files', async (req: Request, res: Response) => {
  return listFilesControllerHandler.handle(req, res)
})

upload.get('/files/:id', async (req: Request, res: Response) => {
  return await listFileByIdControllerHandler.handle(req, res)
})
