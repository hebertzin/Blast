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

    return response.status(200).json({
      messages: 'All files',
      files: files,
    })
  } catch (error) {
    return response.status(500).json({
      message: 'Some error ocurred',
      error: error,
    })
  }
}
