import { type Payload } from './response'

export interface HttpResponseInterface {
  status: number
  message?: string
  data?: Object
}