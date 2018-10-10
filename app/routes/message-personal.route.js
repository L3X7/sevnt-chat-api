'use strict';
var messagePersonal = require('../controllers/message-personal.controller');
module.exports = function (app) {
    app.route("/message-personal/get-messages").get(messagePersonal.getMessages);
    app.route("/message-personal/create-message").post(messagePersonal.createMessage);
}