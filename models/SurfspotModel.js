const mongoose = require('mongoose');

const SurfspotSchema = new mongoose.Schema({
    name: String,
    country: String,
    region: String,
    Wave: String
}, 
{
    collection: 'surfspots'
});

module.exports = mongoose.model('SurfspotModel', SurfspotSchema);