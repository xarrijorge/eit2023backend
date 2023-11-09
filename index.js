import 'dotenv/config'
import express from "express"


const app = express()

import cors from 'cors';
import bodyParser from 'body-parser';
import accessControl from './src/utils/accessControl.js';

import eitRouter from "./src/controllers/eit.js"


const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log('Server listening on PORT', PORT)
})



/**
 *  App Configuration
 */

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(accessControl);

// Data routes
app.get('/', (req, res) => res.send("Hello there, Peris Muthoni Muriuki!"))
app.get('/eits', eitRouter)
app.get('/skills', eitRouter)
app.get('/roles', eitRouter)
app.get('/tskills', eitRouter)
app.post('/skills', eitRouter)
app.put('/users/:id', eitRouter)
