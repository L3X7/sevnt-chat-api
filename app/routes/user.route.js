'use strict';
var users = require('../controllers/user.controller');
module.exports = function (app) {    
    app.route('/user/get-user').get(users.getUser);
    app.route('/user/create_user').post(users.createUser);
}