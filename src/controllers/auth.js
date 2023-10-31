// auth.js

/**
 * Required External Modules
 */
import "dotenv/config"
import express from "express";
const authRouter = express.Router();
import passport from "passport";


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
    res.redirect(logoutURL);
});
/**
 * Module Exports
 */

export default authRouter