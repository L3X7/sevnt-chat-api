'use strict';

var moongose = require('mongoose'),
    User = moongose.model("User");

exports.getUsers = function (req, res) {
    User.find()
        .exec(function (err, user) {
            if (err) {
                return next(err);
            }
            else if (!user) {
                return res.status(404).send({
                    message: "Users not found"
                })
            }
            res.json(user);
        });
};
exports.createUser = function (req, res) {
    var user = new User(req.body);
    user.save(function (err) {
        if (err) {
            return next(err);
        }
        else {
            res.json({ status: 0, message: 'element saved' });
        }
    })
};
