'use strict';

let policy = require('../controllers/policyController.js');
const middleware = require('../middlewares/middleware.js');

module.exports = function (app) {

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    // session and params by query
    app.route('/policiesByUserName')
        .get(middleware.checkAdminAuth, policy.getPoliciesByUserName)

    app.route('/userByPolicyNumber')
        .get(middleware.checkAdminAuth, policy.getUserByPolicyNumber)


};