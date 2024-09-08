import { Router } from 'express'
import { storage } from '../../infra/multer'
import { fileValidatorMiddleware } from '../middleware/validate-files'
import { adaptRoute } from '../../adapters/express-adapter'
import { makeListFileController } from '../../infra/factories/controllers/list-file-by-id'
import { makeUploadFileController } from '../../infra/factories/controllers/upload-file'
import { makeUploadFilesController } from '../../infra/factories/controllers/upload-files'
import { makeListFilesController } from '../../infra/factories/controllers/list-all-files'
import { makeDeleteFileController } from '../../infra/factories/controllers/delete-file'

export const upload = Router()

upload.post(
  '/files/upload',
  storage.single('file'),
  fileValidatorMiddleware.validateFile.bind(fileValidatorMiddleware),
  adaptRoute(makeUploadFileController()),
)

upload.post(
  '/files/multi-upload',
  storage.array('files'),
  fileValidatorMiddleware.validateFile.bind(fileValidatorMiddleware),
  adaptRoute(makeUploadFilesController()),
)

upload.delete('/files/:id', adaptRoute(makeDeleteFileController()))

upload.get('/files', adaptRoute(makeListFilesController()))

upload.get('/files/:id', adaptRoute(makeListFileController()))
