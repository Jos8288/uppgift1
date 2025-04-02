const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const SurfspotModel = require('../models/SurfspotModel.js');

// GET surfspots - Hämtar alla surfspots från databasen
router.get('/', function(req, res, next) {

    // Hämtar alla surfspots med Mongoose
    SurfspotModel.find().then(function(surfspots) {
        
        // Om det inte uppstår fel; skicka surfspots i jSON-format
        res.json(surfspots);
    }).catch(next);

});

module.exports = router;