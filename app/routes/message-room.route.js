'use strict';
var messageRoom = require('../controllers/message-room.controller');
module.exports = function (app) {
    app.route("/message-room/get-messages-rooms").get(messageRoom.getMessagesRooms);
    app.route("/message-room/craete-message-rooms").post(messageRoom.createMessageRoom);
}