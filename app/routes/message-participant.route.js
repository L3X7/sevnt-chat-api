'use strict';
var messageParticipant = require('../controllers/message-participant.controller');
module.exports = function (app) {
    app.route('/message-participant/get-messages-participants').get(messageParticipant.getMessagesParticipants);
    app.route('/message-participant/create-message-participant').get(messageParticipant.createMessageParticipant);
}