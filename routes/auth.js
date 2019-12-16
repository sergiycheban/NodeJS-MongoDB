const Joi = require('joi');
const {
    User
} = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    let user = await User.findOne({
        facultyNumber: req.body.facultyNumber
    });
    if (!user) {
        return res.status(400).render('loginPage', {
            err: 'Incorrect facultyNumber or password.'
        });
    }

    let validPassword = await User.findOne({
        password: req.body.password
    });
    if (!validPassword) {
        return res.status(400).render('loginPage', {
            err: 'Incorrect facultyNumber or password.'
        });
    }
    req.session.user = user;
    res.redirect('/view/coursework')
});

function validate(req) {
    const schema = {
        facultyNumber: Joi.string().min(10).max(10).required(),
        password: Joi.string().required()
    };

    return Joi.validate(req, schema);
}

module.exports = router;