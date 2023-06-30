import express, { Router } from 'express'
import 'dotenv/config'
import cors from 'cors'
import { UserRegisterController } from './infraestructure/UserRegisterController'
import bodyParser from 'body-parser'
const app = express()
const DEFAULT_PORT = 3000
const PORT = process.env.PORT ?? DEFAULT_PORT
app.set('port', PORT)
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
const router = Router()

router.post('/register', function (req, res) {
  const userController = new UserRegisterController(res)
  userController.register(req.body)
})


app.use(router)

app.listen(app.get('port'), () => {
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  console.log('Server Started on port: ' + app.get('port'))
})
export { app }