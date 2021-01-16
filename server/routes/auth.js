const express = require('express')
const router = express.Router()

/*
* todo i think we use passport.js or something for auth strategy.
*  then we can also implement fb oauth easily.
* */

router.post('/login', (req, res) => {
    var username = req.params.username
    var password = req.params.password

    res.send(username)
})

router.post('/signup', (req, res) => {
    var username = req.params.username
    var password = req.params.password

    res.send(username)
})

module.exports = router
