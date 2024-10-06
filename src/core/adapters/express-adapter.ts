import { Request, Response } from 'express'
import { Controller, HttpResponse } from '../application/domain/controller'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    try {
      const data: HttpResponse = await controller.handle(req)
      if (data.statusCode >= 200 && data.statusCode <= 299) {
        res.status(data.statusCode).json(data.body)
      } else {
        res.status(data.statusCode).json({
          error: data.msg,
        })
      }
    } catch (error) {
      return res.status(error.statusCode).json({
        msg: 'An unexpected error occurred.',
        error,
      })
    }
  }
}
