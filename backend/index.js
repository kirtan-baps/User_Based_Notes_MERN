const express = require('express');
const mongoose = require('mongoose');
const connectToMongo = require('./db')
require('dotenv').config();
let PORT = process.env.PORT_AUTH_NOTES;

const cors = require('cors');

connectToMongo();
const app = express()
// ---------------------
app.use(express.json())
app.use(cors())
// ---------------------

// Routes

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))



// ---------------------

app.listen(Number(PORT), () => {
    console.log(`App at ${PORT}`);
})