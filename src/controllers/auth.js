// auth.js

/**
 * Required External Modules
 */
import "dotenv/config"
import express from "express";
const authRouter = express.Router();
import passport from "passport";
import querystring from "querystring";
// import callbackify from "node:utils";
import { callbackify } from "util";


/**
 * Routes Definitions
 */

// login route

authRouter.get(
    "/login",
    passport.authenticate("auth0", {
        scope: "openid email profile"
    }),
    (req, res) => {
        res.redirect("/");
    }
);


// Login Callback route
authRouter.get("/callback", (req, res, next) => {
    passport.authenticate("auth0", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect("/login");
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            const returnTo = req.session.returnTo;
            delete req.session.returnTo;
            res.redirect(returnTo || "/");
        });
    })(req, res, next);
});

// Logout Route
authRouter.get("/logout", (req, res) => {
    req.logOut();

    let returnTo = req.protocol + "://" + req.hostname;
    const port = req.socket.localPort;

    if (port !== undefined && port !== 80 && port !== 443) {
        returnTo =
            process.env.NODE_ENV === "production"
                ? `${returnTo}/`
                : `${returnTo}:${port}/`;
    }

    const logoutURL = new URL(
        `https://${process.env.AUTH0_DOMAIN}/v2/logout`
    );

    const searchString = querystring.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        returnTo: returnTo
    });
    logoutURL.search = searchString;

    res.redirect(logoutURL);
});
/**
 * Module Exports
 */

export default authRouter