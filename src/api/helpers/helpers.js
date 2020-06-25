'use strict'

const mongoose = require('mongoose');

const {
    user_details
} = require('../models/models')

let details = mongoose.model('user_details')

const randomString = (length, chars) => {
    
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;

};

const unique_string = async () => {

    var unique = randomString(8, "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    var is_unique = false;
    
    return new Promise ( async (resolve, reject) => {
        
        await details.find({ shortened_url: unique
        }).then( async data => {
            
            if(data.length > 0){

                is_unique = false;
                unique_string();

            }
            else{

                is_unique = true;

            }
        }).catch( err =>{

            console.log(err);

        });

        if(is_unique){

            resolve(unique);

        }
        else{

            const error = {

                msg: "failed to create unique string"

            };
            
            reject(error);

        }
    });
};


module.exports = {

    randomString: randomString,
    unique_string: unique_string,

}
