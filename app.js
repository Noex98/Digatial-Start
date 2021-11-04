// 3rd Party imports
const express = require ('express');
const path = require('path')

// Imports
const api = require('./routes/api')

//Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Parsers & dev tools
app.use(express.urlencoded({ extended: true }));    // Parse url-encoded
app.use(express.json({ extended: true }));          // Parse JSON

// Endpoints
app.use(api)

// Static files
app.use(express.static(path.join(__dirname, 'frontend')));

// Always send index
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/frontend/index.html')
})

app.listen(PORT, () => console.info('App kører på port: ' + PORT ))