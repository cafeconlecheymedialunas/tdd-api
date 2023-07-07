import { Response } from 'express'
import { HttpStatusMessages, HttpStatuses } from './response'

export class HttpCustomResponse {
  static ok(res: Response, data: unknown, message = ''): Response {
    return res.status(HttpStatuses.OK).json({
      status: HttpStatuses.OK,
      message: message !== '' ? message : HttpStatusMessages.OK,
      data
    })
  }

  static notFound(res: Response, message = ''): Response {
    return res.status(HttpStatuses.NOT_FOUNT).json({
      status: HttpStatuses.NOT_FOUNT,
      message: message !== '' ? message : HttpStatusMessages.NOT_FOUNT,
    })
  }

  static unauthorized(res: Response, message = ''): Response {
    return res.status(HttpStatuses.UNAUTHORIZED).json({
      status: HttpStatuses.UNAUTHORIZED,
      message: message !== '' ? message : HttpStatusMessages.UNAUTHORIZED,
    })
  }

  static forbidden(res: Response, message = ''): Response {
    return res.status(HttpStatuses.FORBIDDEN).json({
      status: HttpStatuses.FORBIDDEN,
      message: message !== '' ? message : HttpStatusMessages.FORBIDDEN,
    })
  }
  static internalServerError(res: Response, message = ''): Response {
    return res.status(HttpStatuses.INTERNAL_SERVER_ERROR).json({
      status: HttpStatuses.INTERNAL_SERVER_ERROR,
      message: message !== '' ? message : HttpStatusMessages.INTERNAL_SERVER_ERROR,
    })
  }
}