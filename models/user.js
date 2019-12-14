const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    facultyNumber: {
        type: String,
        required: true
    },
    fName: {
        type: String,
        required: true
    },
    sName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    specialty: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    trainingForm: {
        type: String,
        required: true
    }
}));

function validateUser(user) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-_@*]).{6,30}$/;
    const schema = {
        facultyNumber: Joi.string().min(10).max(10).required(),
        fName: Joi.string().min(2).max(100).required(),
        sName: Joi.string().min(2).max(100).required(),
        lName: Joi.string().min(2).max(100).optional(),
        password: Joi.string().regex(passwordRegex).required(),
        confirmPassword: Joi.any().valid(Joi.ref('password')).required().options({
            language: {
                any: {
                    allowOnly: 'Must match password'
                }
            }
        }),
        specialty: Joi.string().max(100).required(),
        course: Joi.string().required(),
        trainingForm: Joi.string().required()
    };
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;