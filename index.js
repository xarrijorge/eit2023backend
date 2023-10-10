import 'dotenv/config'
import express from "express"
const app = express()
import bodyParser from "body-parser"

import eitRouter from "./src/controllers/eit.js"
import { configDotenv } from "dotenv"


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) =>  res.send("Hello there, Peris Muthoni Muriuki!") )
app.get('/eits', eitRouter)

// app.get('/skills', skillRouter)
// app.post('/skills', skillRouter)
// app.post('/login', authRouter)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log('Server listening on PORT', PORT)
})