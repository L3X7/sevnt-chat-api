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
    Contact.find({
        user: req.body.user,
        contact_user: req.body.contact_user
    })
        .exec(function (err, contactCheck) {
            if (err) {
                return res.json({ status: 500, contact: [], message: "Error in transaction" });
            }
            else if (!contactCheck) {
                return res.json({ status: 404, contact: [], message: "Contact not found" });
            }

            if (contactCheck.length) {
                return res.json({ status: 400, contact: [], message: 'The contact already exist' });
            }
            var contact = new Contact(req.body);
            contact.save(function (err) {
                if (err) {
                    return res.json({ status: 500, contact: [], message: 'Error in transaction' });
                }
                else {
                    return res.json({ status: 200, contact: contact, message: 'element saved' });
                }
            })
        })
}