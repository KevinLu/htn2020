const express = require('express')
const router = require('router')
const Contribution = require('../models/Contribution')

router.get('/:contribution_id', async (req, res) => {
    const contributionId = req.params.contribution_id;
    const contribution = await Contribution.findByPk(contributionId);

    if (contribution) {
        res.send(contribution);
    } else {
        res.send('bad request');
    }
})

module.exports = router;
