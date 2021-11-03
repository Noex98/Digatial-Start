const express = require('express')
const api = express.Router()

// Get all data
api.get('/api/test', (req, res) => {
    res.json({test: 'test'})
})

module.exports = api