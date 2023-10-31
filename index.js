import 'dotenv/config'
import express from "express"


const app = express()

import { auth } from "express-openid-connect"

import cors from 'cors';
import bodyParser from 'body-parser';
import accessControl from './src/utils/accessControl.js';

import eitRouter from "./src/controllers/eit.js"
import authRouter from "./src/controllers/auth.js"



const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log('Server listening on PORT', PORT)
})

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SESSION_SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_DOMAIN
};

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(accessControl);
app.use(auth(config))
// Auth routes
app.get('/logout', authRouter)

// Data routes
// app.get('/', (req, res) => res.send("Hello there, Peris Muthoni Muriuki!"))
app.get('/', (req, res) => res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'))
app.get('/login', authRouter)
app.get('/eits', eitRouter)
app.get('/skills', eitRouter)
app.get('/roles', eitRouter)
app.get('/tskills', eitRouter)

// app.get('/skills', skillRouter)
// app.post('/skills', skillRouter)
// app.post('/login', authRouter)
