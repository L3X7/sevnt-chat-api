'use strict';
var mongoose = require('mongoose'),
    MessagePersonal = mongoose.model('MessagePersonal');

exports.getMessages = function (req, res) {
    MessagePersonal.find()
        .exec(function (err, messagePersonal) {
            if (err) {
                return next(err);
            }
            else if (!messagePersonal) {
                return res.status(200).send({
                    status: 1,
                    message: 'Message not found'
                })
            }
            res.json(messagePersonal);
        });
}

exports.createMessage = function (req, res) {
    var messagePersonal = new MessagePersonal(req.body);
    messagePersonal.save(function (err) {
        if (err) {
            return next(err)
        }
        else {
            res.json({ status: 0, message: 'Message saved', item: message });
        }
    });
}