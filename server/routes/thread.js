const express = require('express')
const router = express.Router()

router.get('/:threadId', (req, res) => {
    const threadId = req.params.threadId
    // respond with posts and data in the thread
    res.send(threadId)
})

router.post('/create/:name', (req, res) => {
    const name = req.params.name
    // create a thread in the database
    res.send(name)
})

module.exports = router
