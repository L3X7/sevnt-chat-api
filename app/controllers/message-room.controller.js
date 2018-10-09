'use strict';
var mongoose = require('mongoose'),
    MessageRoom = mongoose.model('MessageRoom');

exports.getMessagesRooms = function (req, res) {
    MessageRoom.find()
        .exec(function (err, messageRoom) {
            if (err) {
                return next(err);
            }
            else if (!messageRoom) {
                return res.status(200).send({
                    status: 1,
                    message: 'Message room not found'
                })
            }
            res.json(messageRoom);
        });
}
exports.createMessageRoom = function (req, res) {
    var messageRoom = new MessageRoom(req.body);
    messageRoom.save(function (err) {
        if (err) {
            return next(err)
        }
        else {
            res.json({ status: 0, message: 'Message room saved', item: messageRoom });
        }
    });
}