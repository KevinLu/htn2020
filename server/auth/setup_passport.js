const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

function middleware() {
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect('/');
    }
}

passport.serializeUser(function(user, done){
    done(null, user.username);
});

passport.deserializeUser(function(username, done){
    console.log("deserialize");
    User.findOne({
        where: {
            username: username
        }
    })
    .then(user => done(null, user))
    .catch(() => done(null));
});

passport.use(new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        session: true
    },
    (username, password, done) => {
        console.log("login attempt");
        User.findOne({
            where: {
                username: username
            }
        }).then(user => {
            if (!user) {
                return done(null, false);
            }

            bcrypt.compare(password, user.password, (err, isValid) => {
                if (err) {
                    return done(err);
                }

                if (!isValid) {
                    return done(null, false);
                }

                return done(null, user);
            })
        }).catch(err => done(err));
    }
));

passport.authMiddleware = middleware;
