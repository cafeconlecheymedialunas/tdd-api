import express from 'express'
import "dotenv/config"
import cors from 'cors'

const app = express();
app.set('port',  process.env.PORT || 3000)

app.use(cors())
app.use(express.json())



app.listen(app.get("port"), () => {
  console.log("Server on Port: "+ app.get('port'));
})