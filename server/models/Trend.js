const mongoose = require('mongoose');

const trendSchema = new mongoose.Schema({
    trends: [{type: String}],
    timestamp: {type: Date, default: Date.now},
    ip: {type: String}
});

const TrendModel = mongoose.model('Trend', trendSchema);

module.exports = TrendModel;