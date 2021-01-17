const express = require('express')
const router = express.Router();
const Contribution = require('../models/Contribution')
const axios = require("axios");

router.get('/:contribution_id', async (req, res) => {
    const contributionId = req.params.contribution_id;
    const contribution = await Contribution.findByPk(contributionId);

    if (contribution) {
        res.send(contribution);
    } else {
        res.send('bad request');
    }
})

router.post('/contribution/upload', async (req, res) => {
    const formData = req.body.formUrl;

    axios.post

    if (contribution) {
        res.send(contribution);
    } else {
        res.send('bad request');
    }
})

module.exports = router;
