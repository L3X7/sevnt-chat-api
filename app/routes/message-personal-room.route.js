'use strict';
var messagePersonalRoom = require('../controllers/message-personal-room.controller');
module.exports = function (app) {
    app.route("/message-personal-room/get-messages").get(messagePersonalRoom.getMessages);
    app.route("/message-personal-room/create-message").post(messagePersonalRoom.createMessage);
}