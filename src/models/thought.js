var mongoose = require('mongoose');
 
module.exports = mongoose.model('Thoughts', {
    thought: String
}, 'Thoughts');