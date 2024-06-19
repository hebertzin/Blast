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

    return response.status(HttpStatusCode.Ok)
  } catch (error) {
    return response
      .status(HttpStatusCode.InternalServerError)
      .json({ message: 'Some error has been ocurred' })
  }
}
