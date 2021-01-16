const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/:userId', (req, res) => {
    const userId = req.params.userId

    const user = User.findByPk(userId);
    
    // todo send data about user

    res.send(user)
})

module.exports = router
