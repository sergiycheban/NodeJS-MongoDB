const Joi = require('joi');
const mongoose = require('mongoose');

const CourseWork = mongoose.model('CourseWork', new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
}));

exports.CourseWork = CourseWork;