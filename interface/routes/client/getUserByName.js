'use strict';

let client = require('../../controllers/getUsersByName.js');
const middleware = require('../../middlewares/middleware.js');

module.exports = function (app) {

    app.route('/usersByName')
        .get(middleware.checkAuth, middleware.checkPassQuery, client.getUserByName)

};