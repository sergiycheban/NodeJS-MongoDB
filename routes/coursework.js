const {
    CourseWork
} = require('../models/coursework');
const express = require('express');
const formidable = require('formidable')
const router = express.Router();

router.post('', async (req, res) => {
    var form = new formidable.IncomingForm();
    form.uploadDir = __basedir + '/public/courseworks';
    form.keepExtensions = true;

    form.parse(req, async function (err, fields, files) {
        if (err) {
            res.status(500).send();
            return;
        }

        req.body.file = files.file.path.replace(__basedir + '/public', '');
        req.body.title = fields.title;
        req.body.userId = req.session.user._id;

        courseWork = new CourseWork({
            userId: req.body.userId,
            title: req.body.title,
            file: req.body.file
        });

        courseWork = new CourseWork(req.body, ['userId', 'title', 'file']);
        await courseWork.save();
        res.redirect('/view/coursework')
    })
});

module.exports = router;