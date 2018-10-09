'use strict';
var mongoose = require('mongoose'),
    Message = mongoose.model('Message');

exports.getMessages = function (req, res) {
    Message.find()
        .exec(function (err, message) {
            if (err) {
                return next(err);
            }
            else if (!message) {
                return res.status(200).send({
                    status: 1,
                    message: 'Message not found'
                })
            }
            res.json(message);
        });
}

exports.createMessage = function (req, res) {
    var message = new Message(req.body);
    message.save(function (err) {
        if (err) {
            return next(err)
        }
        else {
            res.json({ status: 0, message: 'Message saved', item: message });
        }
    });
}