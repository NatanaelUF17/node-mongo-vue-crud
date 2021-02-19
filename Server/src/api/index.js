const express = require('express');
const router = express.Router();

const travelers = require('./travelers');

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the travelers API 🌍🗺'
    });
});

router.use('/travelers', travelers);

module.exports = router