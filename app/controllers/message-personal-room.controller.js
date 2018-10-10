'use strict';
var mongoose = require('mongoose'),
    MessagePersonalRoom = mongoose.model('MessagePersonalRoom');

exports.getMessages = function (req, res) {
    MessagePersonalRoom.find()
        .exec(function (err, messagePersonalRoom) {
            if (err) {
                return next(err);
            }
            else if (!messagePersonalRoom) {
                return res.status(200).send({
                    status: 1,
                    message: 'Message not found'
                })
            }
            res.json(messagePersonalRoom);
        });
}

exports.createMessage = function (req, res) {
    var messagePersonalRoom = new MessagePersonalRoom(req.body);
    messagePersonalRoom.save(function (err) {
        if (err) {
            return next(err)
        }
        else {
            res.json({ status: 0, message: 'Message saved', item: message });
        }
    });
}