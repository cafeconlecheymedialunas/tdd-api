import { type HttpResponseInterface } from './HttpResponseInterface'
import { HttpStatusMessages, HttpStatuses, type Payload } from './response'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class HttpCustomResponse {
  static ok (data: Object): HttpResponseInterface {
    const response = {
      status: HttpStatuses.OK,
      message: HttpStatusMessages.OK,
      data
    }
    return response
  }

  static notFound (): HttpResponseInterface {
    const response = {
      status: HttpStatuses.NOT_FOUNT,
      message: HttpStatusMessages.NOT_FOUNT
    }
    return response
  }

  static unauthorized (): HttpResponseInterface {
    const response = {
      status: HttpStatuses.UNAUTHORIZED,
      message: HttpStatusMessages.UNAUTHORIZED

    }
    return response
  }

  static forbidden (): HttpResponseInterface {
    const response = {
      status: HttpStatuses.FORBIDDEN,
      message: HttpStatusMessages.FORBIDDEN
    }
    return response
  }

  static internalServerError (): HttpResponseInterface {
    const response = {
      status: HttpStatuses.INTERNAL_SERVER_ERROR,
      message: HttpStatusMessages.INTERNAL_SERVER_ERROR

    }
    return response
  }
}