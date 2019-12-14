const {
    User,
    validate
} = require('../models/user');
const express = require('express');
const _ = require('lodash');
const router = express.Router();

router.post('/', async (req, res) => {
    console.log(req.body)
    const {
        error
    } = validate(req.body);
    if (error) {
        return res.status(400).render('registerPage', {
            err: error.details[0].message
        });
    }
    let user = await User.findOne({
        facultyNumber: req.body.facultyNumber
    });
    if (user) {
        return res.status(400).send('That user already exisits!');
    } else {
        user = new User({
            facultyNumber: req.body.facultyNumber,
            fName: req.body.fName,
            sName: req.body.sName,
            lName: req.body.lName,
            password: req.body.password,
            // confirmPassword: req.body.confirmPassword,
            specialty: req.body.specialty,
            course: req.body.course,
            trainingForm: req.body.trainingForm
        });

        user = new User(_.pick(req.body, ['facultyNumber', 'fName', 'sName',
            'lName', 'password', 'specialty', 'course', 'trainingForm'
        ]))
        await user.save();

        req.session.user = user;
        res.redirect('/view/coursework')
    }
});

module.exports = router;