const express = require('express');
const api = require('./api/index');
const cors = require('cors');

const app = express();

require('dotenv').config();

app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));

app.get('/', (req, res) => {
    res.json({
        message: '😊❤😍🖤'
    });
});

app.use('/api/v1/', api);

module.exports = app;