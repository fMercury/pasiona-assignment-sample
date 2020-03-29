'use strict';

let policy = require('../../controllers/getUserByPolicyNumber.js');
const middleware = require('../../middlewares/middleware.js');

module.exports = function (app) {

    app.route('/userByPolicyNumber')
        .get(middleware.checkAdminAuth, policy.getUserByPolicyNumber)

};