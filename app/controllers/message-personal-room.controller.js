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
exports.getOrCreateMessageRoom = function (req, res) {

    //Check if exist the room
    MessagePersonalRoom.find(
        {
            $or: [
                { user_one: req.body.id_one, user_two: req.body.id_two },
                { user_two: req.body.id_one, user_one: req.body.id_two }
            ]
        }
    )
        .exec(function (err, messagePersonalRoom) {
            if (err) {
                return res.json({ status: 500, message: "Error in transaction" });
            }
            else if (!messagePersonalRoom) {
                return res.json({ status: 404, message: "Users not found" });
            }
            //If exist
            if (messagePersonalRoom.length) {
                return res.json({ status: 200, room: messagePersonalRoom[0]._id, message: "Success" });
            }

            //if not exist create
            else {
                var messagePersonalR = new MessagePersonalRoom({
                    user_one: req.body.user_one,
                    user_two: req.body.user_two,
                    status: true,
                })
                messagePersonalR.save(function (err) {
                    if (err) {
                        return res.json({ status: 500, message: "Error in transaction" });
                    }
                    else {
                        return res.json({ status: 200, room: messagePersonalR[0]._id, message: "Success, room created" });
                    }
                })
            }
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