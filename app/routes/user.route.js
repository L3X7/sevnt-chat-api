'use strict';
var users = require('../controllers/user.controller');
module.exports = function (app) {    
    app.route('/user/get-users').get(users.getUsers);
    app.route('/user/create_user').post(users.createUser);
}