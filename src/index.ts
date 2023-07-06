import cors from 'cors'
import express from "express"
import router from './infraestructure/routes'
import bodyParser from 'body-parser'
import config from './config'

const app = express();

app.set('port', config.PORT)
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(router)

app.listen(app.get('port'), () => {
  console.log(`Server Started on port:${app.get('port')}`)
})
export { app }