const express = require('express')
const router = express.Router()

router.get('/:userId', (req, res) => {
    const userId = req.params.userId

    // todo send data about user

    res.send(userId)
})

module.exports = router
