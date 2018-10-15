'use strict';
var messagePersonalService = require('../controllers/message-personal-service.controller');
module.exports = function (app) {
    app.route("/message-personal-service/get-messages-by-id").get(messagePersonalService.getMessagesById);
    app.route("/message-personal-service/create-message").post(messagePersonalService.createMessage);
    app.route("/message-personal-service/get-messages-by-room").get(messagePersonalService.getLastMessagesById);
}