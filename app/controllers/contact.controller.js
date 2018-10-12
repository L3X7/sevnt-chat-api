'use strict';
var mongoose = require('mongoose'),
    Contact = mongoose.model('Contact');
exports.getContacts = function (req, res) {
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
    Contact.find({ user: req.query.id })
        .populate('user')
        .populate('contact_user')
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

exports.createContact = function (req, res) {
    var contact = new Contact(req.body);
    contact.save(function (err) {
        if (err) {
            return res.json({ status: 500, message: "Error in transaction" })
        }
        else {
            return res.json({ status: 200, message: 'Contact saved' });
        }
    });
}