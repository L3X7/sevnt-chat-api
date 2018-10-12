'use strict';
var contact = require('../controllers/contact.controller');
module.exports = function (app) {
    app.route('/contact/get-contact').get(contact.getContacts);
    app.route('/contact/get-contact-by-iuser').get(contact.getContactByInitialUser);
    app.route('/contact/create-contact').post(contact.createContact);
}