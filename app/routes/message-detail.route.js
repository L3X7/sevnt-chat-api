'use strict';
var messageDetail = require('../controllers/message-detail.controller');
module.exports = function (app) {
    app.route('/message-detail/get-message-detail').get(messageDetail.getMessageDetail);
}