import express from "express"
const app = express()
import bodyParser from "body-parser"

import eitRouter from "./src/controllers/eit.js"


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) =>  res.send("Hello there") )
app.get('/eits', eitRouter)


const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log('Server listening on PORT', PORT)
})