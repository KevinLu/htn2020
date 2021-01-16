const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({message: "user not found!"});
    }

    req.logIn(user, function (err) {
      if (err) {
        return res.status(401).json({message: "invalid password!"})
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
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(req.params.password, salt)

  User.create({
    username: req.params.username,
    password: hashedPassword
  })
  .then(res.status(200).send())
  .catch(err => res.status(400).json(err));
})

module.exports = router;
