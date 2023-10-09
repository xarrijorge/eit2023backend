import express from "express"
import bodyParser from "body-parser"

import data from "./src/eitsdata.js"



const app = express()

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) =>  res.send("Hello there") )

app.get('/eits', (req, res) =>{
    const person = Math.floor(Math.random() * 51)
    res.json(data[person])
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log('Server listening on PORT', PORT)
})