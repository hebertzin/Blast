import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { Request, Response } from 'express'
import { s3 } from '../aws'

export const deleteUploadController = async (
  request: Request,
  response: Response,
) => {
  try {
    const { key } = request.params

    const params = {
      Bucket: 'storage-app',
      Key: key,
    }

    await s3.send(new DeleteObjectCommand(params))

    return response.status(201).json({
      message: 'Delete sucessfully',
    })
  } catch (error) {
    return response.status(500).json({
      message: 'some error ocurred',
      error: error,
    })
  }
}
