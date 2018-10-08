const express = require('express'),
router = express.Router();

require('./user.route')(router);
require('./message-header.route')(router);
require('./message-detail.route')(router);

module.exports = router;


