import { Permission } from "../entities/Permission.entity"
export interface Payload {
  id: number
  permissions: Permission[]
}
export interface HttpResponseInterface {
  status: number
  message?: string
  data?: unknown[]
}
export enum HttpStatuses {
  OK = 200,
  NOT_FOUNT = 404,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403

}
export enum HttpStatusMessages {
  OK = 'Success',
  NOT_FOUNT = 'Not Found',
  UNAUTHORIZED = 'Unauthorized',
  FORBIDDEN = 'Forbidden'
}