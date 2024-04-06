import { PutObjectCommand } from '@aws-sdk/client-s3'
import { Request, Response } from 'express'
import { s3 } from '../aws'

export const multiplesUploadsController = async (
  request: Request,
  response: Response,
) => {
  try {
    const files = request?.files as Express.Multer.File[]

    if (!files || files.length == 0) {
      return response.status(400).json({
        message: 'No files sent',
      })
    }

    const upload = files.map(async (file: Express.Multer.File) => {
      const fileContent = file.buffer

      const params = {
        Bucket: 'storage-app',
        Key: file.originalname,
        Body: fileContent,
      }

      await s3.send(new PutObjectCommand(params))
    })

    await Promise.all(upload)

    return response.status(201).json({
      message: 'All files upload sucessfully',
    })
  } catch (error) {
    return response.status(500).json({
      message: 'some error ocurred',
      error: error,
    })
  }
}
