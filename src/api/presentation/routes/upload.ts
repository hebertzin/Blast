import { Router } from 'express'
import { storage } from '../../../core/infra/multer'
import { fileValidatorMiddleware } from '../middleware/validate-files'
import { adaptRoute } from '../../../core/adapters/express-adapter'
import { makeListFileController } from '../../../core/infra/factories/controllers/list-file-by-id'
import { makeUploadFileController } from '../../../core/infra/factories/controllers/upload-file'
import { makeUploadFilesController } from '../../../core/infra/factories/controllers/upload-files'
import { makeDeleteFileController } from '../../../core/infra/factories/controllers/delete-file'
import { makeListFilesController } from '../../../core/infra/factories/controllers/list-all-files'

export const uploadManagementRoutes = Router()

uploadManagementRoutes.post(
  '/files/upload',
  storage.single('file'),
  fileValidatorMiddleware.validateFile(),
  adaptRoute(makeUploadFileController()),
)

uploadManagementRoutes.post(
  '/files/multi-upload',
  storage.array('files'),
  fileValidatorMiddleware.validateFile(),
  adaptRoute(makeUploadFilesController()),
)

uploadManagementRoutes.delete(
  '/files/:id',
  adaptRoute(makeDeleteFileController()),
)

uploadManagementRoutes.get('/files', adaptRoute(makeListFilesController()))

uploadManagementRoutes.get('/files/:id', adaptRoute(makeListFileController()))
