const mongoose = require('mongoose');
const User = require('../models/user.model');

module.exports.index = (req, res, next) => {
    res.render('auth/index');
}

module.exports.login = (req, res, next) => {
    res.render('auth/login');
}

module.exports.doLogin = (req, res, next) => {
    res.render('auth/index');
}

module.exports.signup = (req, res, next) => {
    res.render('auth/signup');
}

module.exports.doSignup = (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then(user => {
            if(user != null) {
                res.render('auth/signup', {
                    error: { username: 'User already exists'}
                })
            }
            else {
                user = new User({
                    username: req.body.username,
                    password: req.body.password,
                    role: req.body.role
                });
                user.save()
                    .then(() => {
                        res.redirect("/login");
                    })
                    .catch(error => {
                        if (error instanceof mongoose.Error.ValidationError) {
                            res.render('auth/signup', { 
                                user: user, 
                                error: error.errors 
                            });
                        } else {
                            next(error);
                        }
                    })
            }
        }).catch(error => next(error));
}