'use strict';
var mongoose = require('mongoose'),
    Contact = mongoose.model('Contact');
exports.getContact = function (req, res) {
    Contact.find()
        .exec(function (err, contact) {
            if (err) {
                return next(err);
            }
            else if (!contact) {
                return res.status(200).send({
                    status: 1,
                    message: 'Contact not found'
                })
            }
            res.json(contact);
        })
}

exports.getContactByInitialUser = function (req, res) {
    Contact.find({ initial_user: req.query.id })
        .populate('user')
        .exec(function (err, contact) {
            if (err) {
                return next(err);
            }
            else if (!contact) {
                return res.status(200).send({
                    status: 1,
                    message: 'Contact not found'
                })
            }
            res.json(contact);
        });
}