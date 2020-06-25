var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user_details = new Schema({

    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    },
    url_id:{
        type: String,
        unique: true,
        required: true
    } 
});
user_details.set('timestamps', true);

module.exports = mongoose.model('user_details', user_details);