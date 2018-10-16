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
                return res.status(200).send({
                    message: "User not found"
                })
            }
            res.json(user);
        });
};
exports.findUsers = function (req, res) {
    User.find({ username: { $regex: '.*' + req.query.username + '.*' } })
        .exec(function (err, users) {
            if (err) {
                return json({ status: 500, users: [], message: "Error in transaction" });
            }
            else if (!users) {
                return json({ status: 404, users: [], message: "Users not found" });
            }
            return res.json({ status: 200, users: users, message: "Success" });
        });
}
exports.createUser = function (req, res) {

    User.find({ username: req.body.username })
        .exec(function (errCheck, userCheck) {
            if (errCheck) {
                return res.json({ status: 500, user: [], message: "Error in transaction" });
            }
            else if (!userCheck) {
                return res.json({ status: 404, user: [], message: "Users not found" });
            }

            if (userCheck.length) {
                return res.json({ status: 400, user: [], message: 'The username already exist' });
            }
            else {
                var user = new User(req.body);
                user.save(function (err) {
                    if (err) {
                        return res.json({ status: 500, user: [], message: 'Error in transaction' });
                    }
                    else {
                        return res.json({ status: 200, user: user, message: 'element saved' });
                    }
                })
            }

        })
};
exports.login = function (req, res) {
    User.find({ username: req.body.username, password: req.body.password })
        .exec(function (err, user) {
            if (err) {
                return res.json({ status: 500, user: [], message: "Error in transaction" });
            }
            else if (!user) {
                return res.json({ status: 404, user: [], message: "Users not found" });
            }
            return res.json({ status: 200, user: user, message: "Success" });
        });
}
