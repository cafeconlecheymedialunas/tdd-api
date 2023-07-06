import { Permission } from "../entities/Permission.entity"

export interface Payload {
  id: number
  permissions: Permission[]
}

export enum HttpStatuses {
  OK = 200,
  NOT_FOUNT = 404,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500
}

export enum HttpStatusMessages {
  OK = 'Success',
  NOT_FOUNT = 'Not Found',
  UNAUTHORIZED = 'Unauthorized',
  FORBIDDEN = 'Forbidden',
  INTERNAL_SERVER_ERROR = 'Internal Server Error'
}