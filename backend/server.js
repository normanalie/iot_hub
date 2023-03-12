require('dotenv').config({ path: '../.env' });
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const dbconnect = require('./db_con');
const mqttclient = require('./mqtt');
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// ROUTES
const mqttRouter = require('./routes/mqtt');
app.use('/api/mqtt', mqttRouter);

// START
dbconnect()
    .then(() => {
        app.listen(3000, () => {
            console.log('[BACKEND] Listenning on http://localhost:3000/');
        });
    })
    .catch((err) => {
        console.log('[BACKEND] DB connection error');
    });
