'use strict';
var mongoose = require('mongoose'),
    MessagePersonal = mongoose.model('MessagePersonal'),
    MessagePersonalRoom = mongoose.model('MessagePersonalRoom');

exports.getMessagesById = function (req, res) {

    //Find room 
    MessagePersonalRoom.find({
        $or: [
            { user_one: req.query.id_one, user_two: req.query.id_two },
            { user_two: req.query.id_one, user_one: req.query.id_two }
        ]
    })
        .exec(function (err, messagePersonalRoom) {
            if (err) {
                res.json({ status: 1, message: 'Error in transaction' });
            }
            else if (!messagePersonalRoom) {
                return res.status(200).send({
                    status: 1,
                    message: 'Messages not found'
                })
            }
            if (messagePersonalRoom.length) {
                //If exist last messages
                MessagePersonal.find({
                    message_personal_room: messagePersonalRoom[0]._id
                })
                    .exec(function (error, messagePersonal) {
                        if (error) {
                            return next(error);
                        }
                        else if (!messagePersonal) {
                            return res.status(200).send({
                                status: 1,
                                message: 'Messages not found'
                            })
                        }
                        res.json({ status: 0, messagePersonalRoom: messagePersonalRoom, messagePersonal: messagePersonal });
                    });
            }
            else {
                res.json({ status: 0, messagePersonalRoom: messagePersonalRoom, messagePersonal: [] });
            }
        });
}

exports.createMessage = function (req, res) {
    //if message_room is null, create a new message room

    if (req.body.message_room == 0) {
        var messagePersonalRoom = new MessagePersonalRoom({
            user_one: req.body.user_one,
            user_two: req.body.user_two,
            status: true,

        });
        messagePersonalRoom.save(function (err) {
            if (err) {
                return res.status(200).send({
                    status: 2,
                    message: 'Error in transaction'
                })
            }
            else {
                var messagePersonal = new MessagePersonal({
                    message_personal_room: messagePersonalRoom._id,
                    created_by: req.body.user_one,
                    message: req.body.message,
                    status: true
                })
                messagePersonal.save(function (err) {
                    if (err) {
                        res.json({ status: 1, messagePersonalRoom: messagePersonalRoom._id, message: 'Error in save message' });
                    }
                    else {
                        res.json({ status: 0, messagePersonalRoom: messagePersonalRoom._id, message: 'Message saved' });
                    }
                })
            }
        });
    }

    //if message_room not is null
    else {
        var messagePersonal = new MessagePersonal({
            message_personal_room: req.body.message_room,
            created_by: req.body.user_one,
            message: req.body.message,
            status: true
        })
        messagePersonal.save(function (err) {
            if (err) {
                res.json({ status: 1, messagePersonalRoom: req.body.message_room, message: 'Error in save message' });
            }
            else {
                res.json({ status: 0, messagePersonalRoom: req.body.message_room, message: 'Message saved' });
            }
        })
    }
}

exports.getLastMessagesById = function (req, res) {

    //Find rooms
    MessagePersonalRoom.find({
        $or: [
            { user_one: req.query.id_one },
            { user_two: req.query.id_one }
        ]
    })
        .exec(function (err, messagePersonalRoom) {
            if (err) {
                return res.json({ status: 500, message: "Error in transaction" });
            }
            else if (!messagePersonalRoom) {
                return res.json({ status: 404, message: "Users not found" });
            }
            if (messagePersonalRoom.length) {
                //If exist last messages
                var idMessagesPersonalRoom = [];
                messagePersonalRoom.forEach(function (element) {
                    idMessagesPersonalRoom.push(element._id);
                });

                //Find messages
                MessagePersonal.find({
                    message_personal_room: { $in: idMessagesPersonalRoom }
                },
                    {},
                    {
                        $group:
                        {
                            _id: "$message_personal_room"
                        }
                    })
                    .sort({
                        created_date: 'desc'
                    })
                    .exec(function (error, messagePersonal) {
                        if (error) {
                            return res.json({ status: 500, message: "Error in transaction" });
                        }
                        else if (!messagePersonal) {
                            return res.json({ status: 404, message: "Users not found" });
                        }
                        var curentId;
                        var messagePM = [];
                        for (let index = 0; index < messagePersonal.length; index++) {
                            if (index == 0) {
                                messagePM.push(messagePersonal[index]);
                                curentId = (messagePersonal[index].message_personal_room).toString();
                            }
                            else {                                
                                if (curentId !== (messagePersonal[index].message_personal_room).toString()) {

                                    console.log(curentId + ' = ' + messagePersonal[index].message_personal_room);
                                    messagePM.push(messagePersonal[index]);
                                }
                                curentId = (messagePersonal[index].message_personal_room).toString();
                            }
                        }

                        return res.json({ status: 0, messagePersonalRoom: messagePersonalRoom, messagePersonal: messagePM });
                    });
            }
            else {
                return res.json({ status: 0, messagePersonalRoom: messagePersonalRoom, messagePersonal: [] });
            }
        });
}