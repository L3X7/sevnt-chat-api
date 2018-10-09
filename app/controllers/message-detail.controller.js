'use strict';
var mongoose = require('mongoose'),
    MessageDetail = mongoose.model('MessageDetail');

exports.getMessageDetail = function (req, res) {
    MessageDetail.find()
        .exec(function (err, messageDetail) {
            if (err) {
                return next(err);
            }
            else if (!messageDetail) {
                return res.status(200).send({
                    status: 1,
                    message: 'Message detail not found'
                })
            }
            res.json(messageDetail);
        });
}