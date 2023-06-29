import { type Payload } from './response'

export interface HttpResponseInterface {
  message?: string
  status: number
  data?: Object
}