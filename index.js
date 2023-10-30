import 'dotenv/config'
import express from "express"
import expressSession from "express-session"
import passport from "passport"
import Auth0Strategy from "passport-auth0"


const app = express()

import cors from 'cors';
import bodyParser from 'body-parser';
import accessControl from './src/utils/accessControl.js';

import eitRouter from "./src/controllers/eit.js"
import authRouter from "./src/controllers/auth.js"
import { auth } from 'express-openid-connect'


const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log('Server listening on PORT', PORT)
})

/**
 * Session Configuration (New!)
 */

const session = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: false
};

if (app.get("env") === "production") {
    // Serve secure cookies, requires HTTPS
    session.cookie.secure = true;
}

/**
 * Passport Configuration (New!)
 */
const strategy = new Auth0Strategy(
    {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL: process.env.AUTH0_CALLBACK_URL
    },
    function (accessToken, refreshToken, extraParams, profile, done) {
        /**
         * Access tokens are used to authorize users to an API
         * (resource server)
         * accessToken is the token to call the Auth0 API
         * or a secured third-party API
         * extraParams.id_token has the JSON Web Token
         * profile has all the information from the user
         */
        return done(null, profile);
    }
);



/**
 *  App Configuration
 */

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(accessControl);

app.use(expressSession(session));

passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
});

app.use('/', authRouter)
// Auth routes
app.get('/login', authRouter)
app.get('/logout', authRouter)

// Data routes
app.get('/', (req, res) => res.send("Hello there, Peris Muthoni Muriuki!"))
app.get('/eits', eitRouter)
app.get('/skills', eitRouter)
app.get('/roles', eitRouter)
app.get('/tskills', eitRouter)

// app.get('/skills', skillRouter)
// app.post('/skills', skillRouter)
// app.post('/login', authRouter)
