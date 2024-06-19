import { Request, Response, NextFunction } from 'express'

export class FileValidatorMiddleware {
  public validateFile(req: Request, res: Response, next: NextFunction) {
    const file = req.file as Express.Multer.File

    if (!file) {
      return res
        .status(HttpStatusCode.BadRequest)
        .json({ error: 'No file provided' })
    }

    const allowedMimes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/pdf',
    ]
    if (!allowedMimes.includes(file.mimetype)) {
      return res
        .status(HttpStatusCode.BadRequest)
        .json({ error: 'File type not allowed' })
    }

    next()
  }
}

export const fileValidatorMiddleware = new FileValidatorMiddleware()
