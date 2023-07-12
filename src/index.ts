import cors from 'cors'
import express from "express"
import router from './infraestructure/routes'
import bodyParser from 'body-parser'
import config from './config'
import { Request, Response, NextFunction } from 'express'
import { ClientError, resError } from './infraestructure/utils'
const app = express()
app.set('port', config.PORT)
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(router)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: ClientError, req: Request, res: Response, next: NextFunction): void => {
  const { status, message } = err
  console.log(err)
  resError(res, status, message)
})

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ClientError) {

    const { status, message } = err
    console.log(status, message, 'Middleware')
    resError(res, status, message)

  }
  next(err)

})
app.listen(app.get('port'), () => {
  console.log(`Server Started on port:${app.get('port')}`)
})
export { app }