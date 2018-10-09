'use strict';
var mongoose = require('mongoose'),
    MessageParticipant = mongoose.model('MessageParticipant');

exports.getMessagesParticipants = function (req, res) {
    MessageParticipant.find()
        .exec(function (err, messageParticipant) {
            if (err) {
                return next(err);
            }
            else if (!messageParticipant) {
                return res.status(200).send({
                    status: 1,
                    message: 'Message detail not found'
                })
            }
            res.json(messageParticipant);
        });
}

exports.createMessageParticipant = function (req, res) {
    var messageParticipant = new MessageParticipant(req.body);
    messageParticipant.save(function (err) {
        if (err) {
            return next(err)
        }
        else {
            res.json({ status: 0, message: 'Message participant saved', item: messageParticipant });
        }
    });
}