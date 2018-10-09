'use strict';
var message = require('../controllers/message.controller');
module.exports = function (app) {
    app.route("/message/get-messages").get(message.getMessages);
    app.route("/message/create-message").post(message.createMessage);
}