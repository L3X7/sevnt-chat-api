'use strict';
var mongoose = require('mongoose'),
    MessageHeader = mongoose.model('MessageHeader');

exports.getMessageHeader = function (req, res) {
    MessageHeader.find()
        .exec(function (err, messageHeader) {
            if (err) {
                return next(err);
            }
            else if (!messageHeader) {
                return res.status(200).send({
                    status: 1,
                    message: 'Message header not found'
                })
            }
            res.json(messageHeader);
        });
}