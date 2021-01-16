const express = require('express')
const router = express.Router()
const dropbase = require('../services/dropbase')

router.get('/:threadId', (req, res) => {
    const threadId = req.params.threadId
    // respond with posts and data in the thread
    res.json(threadId)
})

router.post('/create/:name', (req, res) => {
    const name = req.params.name
    // TODO: create a thread in the database

    res.send(name);
})

router.post('/upload', (req, res) => {
    // TODO: get token and fileUrl (how?)
    const token = null;
    const fileUrl = null;
    const jobId = dropbase.runPipelineToken(token, fileUrl); // This calls the api to upload fileUrl to pipeline token
    res.json(jobId) // return the jobId
})

module.exports = router
