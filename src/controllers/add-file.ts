import { PutObjectCommand } from '@aws-sdk/client-s3'
import { Request, Response } from 'express'
import { s3 } from '../aws'

export const uploadController = async (
  request: Request,
  response: Response,
) => {
  try {
    const file = request.file

    const fileName = file?.originalname as string

    const bucketName = 'storage-app'

    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: file?.buffer,
    }

    const command = new PutObjectCommand(params)

    const data = await s3.send(command)

    return response.status(201).json({
      message: 'Upload sucessfully',
      data,
    })
  } catch (error) {
    return response.status(500).json({
      message: 'some error ocurred',
      error: error,
    })
  }
}
