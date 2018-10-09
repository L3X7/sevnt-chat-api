'use strict';
var messageHeader = require('../controllers/message-header.controller');
module.exports = function (app) {
    app.route("/message-header/get-message-header").get(messageHeader.getMessageHeader);
}