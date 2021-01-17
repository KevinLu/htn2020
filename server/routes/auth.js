const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const authMiddleware = (req, res, next) => {
  console.log(req.isAuthenticated());
  // If user is not logged in
  if (!req.isAuthenticated()) {
    // NOTE: THIS RETURNS WITH STATUS CODE 200
    return res.status(400).json({message: "not logged in."});
  }
  // User is logged in, call next middleware
  console.log("passed auth, onto the next one")
  next();
};

/* GET /api/auth/ retrieve user info */
router.get('/', authMiddleware, (req, res) => {
  return res.status(200).json({user: req.user});
});

router.post('/login', function (req, res, next) {
  passport.authenticate('local',
    {
      failureRedirect: 'http://localhost:3000/login/',
      successRedirect: 'http://localhost:3000/',
    },
    function (err, user) {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).json({message: "user not found!"});
      }

      req.login(user, function (err) {
        if (err) {
          next(err);
          return;
        }

        return res.status(200).json(user);
      });
    })(req, res, next);
});

router.post('/logout', (req, res) => {
  req.logout();
});

const saltRounds = 10

router.post('/register', (req, res) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  User.create({
    username: req.body.username,
    password: hashedPassword
  })
    .then((response) => {
      console.log(response);
      return res.status(200).json({username: req.body.username});
    })
    .catch(err => {
      if (err.name === "SequelizeUniqueConstraintError") {
        return (res.status(400).json({message: "username already exists!"}));
      }
      return (res.status(400).json(err));
    });
});

passport.authMiddleware = authMiddleware
module.exports = router;
