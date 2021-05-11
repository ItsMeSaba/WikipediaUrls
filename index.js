const express = require('express');
const app = express();
const fetchUrls = require('./fetchUrls')
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, useUnifiedTopology: true
}, () => console.log('MongoDB Connected'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.post('/routeOne', (req, res) => {
    const { url, depth } = req.body;

    // fetchUrls('https://en.wikipedia.org/wiki/Buzhan,_Nishapur', 1)
    fetchUrls(url, depth)

    res.send();
})



app.listen(port, () => console.log('Server Started'))