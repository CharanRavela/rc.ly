"use strict"

const express = require('express');
const router = express.Router();

const contoller = require('../controllers/controllers')

// index route
router.route("").get(contoller.index);

//Generate url id for the given url
router.route("/get_url_id").post(contoller.url_shortener);

//Redirecting the url id
router.route("/:url_id").get(contoller.url_redirector);

//get all shortened urls
router.route("/get_all/url_ids").get(contoller.get_all_url_ids);


module.exports = router;