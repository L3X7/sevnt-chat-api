'use strict';
var contact = require('../controllers/contact.controller');
module.exports = function (app) {
    app.route('/contact/get-contact').get(contact.getContact);
    app.route('contact/get-contact-by-iuser').get(contact.getContactByInitialUser);
}