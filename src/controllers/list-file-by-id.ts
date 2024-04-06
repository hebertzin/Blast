import { HeadObjectCommand } from '@aws-sdk/client-s3'
import { Request, Response } from 'express'
import { s3 } from '../aws'

export const listFileByIdController = async (
  request: Request,
  response: Response,
) => {
  try {
    const { key } = request.params

    const params = {
      Bucket: 'storage-app',
      Key: key as string,
    }

    const data = await s3.send(new HeadObjectCommand(params))

    const fileDetails = {
      key: key,
      size: data.ContentLength,
      lastModified: data.LastModified,
      contentType: data.ContentType,
    }

    return response.status(200).json({
      file: fileDetails,
    })
  } catch (error) {
    return response.status(500).json({
      message: 'Some error ocurred',
      error: 'error',
    })
  }
}
