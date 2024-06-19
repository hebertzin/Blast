import { ListObjectsV2Command } from '@aws-sdk/client-s3'
import { Request, Response } from 'express'
import { s3 } from '../aws'

export const listAllFilesController = async (
  _request: Request,
  response: Response,
) => {
  try {
    const params = {
      Bucket: 'storage-app',
    }

    const data = await s3.send(new ListObjectsV2Command(params))

    const files = data.Contents

    return response.status(HttpStatusCode.Ok).json({
      files: files,
    })
  } catch (error) {
    return response
      .status(HttpStatusCode.InternalServerError)
      .json({ message: 'Some error has been ocurred' })
  }
}
