"use strict"

var mongoose = require('mongoose');

const { 

    user_url_data

} = require('../middlewares/middlewares');

const {

    unique_string 

} = require('../helpers/helpers');

const {
    user_details
} = require('../models/models');

const user_collection = mongoose.model('user_details');

module.exports.index = async( req, res) => {
    try{
        return res.status(200).send({ success: true, message:"You got access to this website."});
    }
    catch(error){
        return res.status(500).send({ success: false, message:"Server error"});
    }
};

module.exports.url_shortener = async ( req, res) => {
    try{
        
        if(req.body != null){

            console.log(req.body);
            const validate = user_url_data(req.body);
            
            validate.then( async (done) => {

                var url_id;
                await unique_string().then( async result => {
                    url_id = result;
                    var document = new user_collection({
                        name: done.name,
                        email: done.email,
                        url: done.url,
                        url_id: url_id
                    });
                    document.save( async (err, document) => {
                        if(err){
                            await console.log(err);
                            return res.status(400).send({ success: false, message:"URL Generation failed ", error:"DB save error"});
                        }
                        else{
                            return res.status(200).send({ success: true, message: "You have successfully generated a new url", response: url_id});
                        }
                    });
                }).catch( async err=> {
                    await console.log(err);
                    return res.status(400).send({ success: false, message:"Bad Request", error:"Invalid field values"});
                })

            }).catch( async err => {
                await console.log(err);
                return res.status(400).send({ success: false, message:"Bad Request", error:"Invalid field values"});
            })
        }
        else{
            return res.status(400).send({ success: false, message:"Bad Request", error:"Received empty body"});
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).send({ success: false, message:"Server error"});
    }
};

module.exports.url_redirector = async ( req, res) => {
    try{
        if(req.params != null){

            var redirect = "";
            var is_found = false;
            await user_collection.findOne({ url_id: req.params.url_id
            }).then( async data => {
                console.log(data);
                if(data){

                    redirect = data.url;
                    is_found = true;

                }
                else{

                    is_found = false;

                }
            }).catch( err =>{
        
                console.log(err);
                return res.status(400).send({ success: false, message:"Bad Request", error:"DB Error."});
        
            });

            if(is_found){

                res.redirect(redirect);
                await console.log("Redirection was successful");

            }
            else{

                console.log("No details found!");
                return res.status(400).send({ success: false, message:"Bad Request", error:"url not found."});

            }
        }
        else{
            return res.status(400).send({ success: false, message:"Bad Request", error:"params missing"});
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).send({ success: false, message:"Server error"});
    }
};

module.exports.get_all_url_ids = async ( req, res) => {

    try{

        user_collection.find({}).sort({ updatedAt: -1}).then( async dbRes => {

            if(dbRes.length  === 0){

                return res.status(400).send({ success: false, message:"Try after sometime", error:"No details found"});

            }
            else
            {

                return res.status(200).send({ success: true, message: "Data found!", response: dbRes});

            }

        }).catch( async err => {

            console.log(err);
            return res.status(400).send({ success: false, message:"Bad Request", error:"DB Error."});

        });

    }
    catch{

        console.log(error);
        return res.status(500).send({ success: false, message:"Server error"});

    }
};