"use strict"

const Joi = require('@hapi/joi');

const user_url_data = data=> {
    const schema = Joi.object().keys({

        name: Joi.string().required(),
        email: Joi.string().email().required(),
        url: Joi.string().uri().required()

    });
    return  schema.validate(data);
}

module.exports = {

    user_url_data: user_url_data

}