import { Router } from 'express'
import { storage } from '../utils/multer'
import { uploadFileControllerHandler } from '../controllers/add-file'
import { uploadFilesControllerHandler } from '../controllers/add-multiples-files'
import { deleteFileControllerHandler } from '../controllers/delete-file'
import { listFilesControllerHandler } from '../controllers/list-all-files'
import { listFileByIdControllerHandler } from '../controllers/list-file-by-id'
import { fileValidatorMiddleware } from '../middleware/validate-files'
import { Request, Response } from 'express'
export const upload = Router()

upload.post(
  '/files/upload',
  storage.single('file'),
  fileValidatorMiddleware.validateFile.bind(fileValidatorMiddleware),
  async (req: Request, res: Response) => {
    uploadFileControllerHandler.handle(req, res)
  },
)

upload.post(
  '/files/multi-upload',
  storage.array('files'),
  fileValidatorMiddleware.validateFile.bind(fileValidatorMiddleware),
  async (req: Request, res: Response) => {
    uploadFilesControllerHandler.handle(req, res)
  },
)

upload.delete('/files/:id', async (req: Request, res: Response) => {
  return deleteFileControllerHandler.handle(req, res)
})

upload.get('/files', async (req: Request, res: Response) => {
  return listFilesControllerHandler.handle(req, res)
})

upload.get('/files/:id', (req: Request, res: Response) => {
  listFileByIdControllerHandler.handle(req, res)
})
