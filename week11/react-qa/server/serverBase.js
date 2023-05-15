'use strict';

const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send('Ciao2');
});

app.listen(3001, ()=>{console.log('Server ready');})