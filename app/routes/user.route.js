'use strict';
var user = require('../controllers/user.controller');
module.exports = function (app) {
    app.route('/user/get-users').get(user.getUsers);
    app.route('/user/find-users').get(user.findUsers);
    app.route('/user/create-user').post(user.createUser);
    app.route('/user/login').post(user.login);
}