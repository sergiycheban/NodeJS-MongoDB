const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const users = require('./routes/users');
const auth = require('./routes/auth');
const coursework = require('./routes/coursework');
const express = require('express');
const path = require('path')
global.__basedir = __dirname;
var session = require('express-session');
const {
    CourseWork
} = require('./models/coursework');
const app = express();

app.use(session({
    key: 'user_cookie',
    secret: 'sergey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 400000
    }
}));

mongoose.connect('mongodb://localhost/mongo-database', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Wrong', err));

app.set('views', path.join(__dirname, "views"))
app.set("view engine", "hbs")

var isLoggedIn = function (req, res, next) {
    if (req.session.user)
        next();
    else
        res.redirect('/')
}

var isLoggedOut = function (req, res, next) {
    if (!req.session.user)
        next();
    else
        res.redirect('/view/coursework')
}

app.get('/logout', (req, res) => {
    req.session.destroy();
    req.session = null;
    res.redirect('/');
})

app.get('/', isLoggedOut, (req, res) => {
    res.render('loginPage');
})

app.get('/register', isLoggedOut, (req, res) => {
    res.render('registerPage');
})

app.get('/create/coursework', isLoggedIn, (req, res) => {
    res.render('coursework');
})

app.get('/view/coursework', isLoggedIn, async (req, res) => {
    let courseWork = await CourseWork.find({
        userId: req.session.user._id
    });
    res.render('listCourseWorkPage', {
        userId: courseWork
    });
})

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/coursework', coursework);
app.use(express.static(path.join(__dirname, 'public')));


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));