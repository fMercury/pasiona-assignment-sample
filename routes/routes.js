'use strict';

let controllers = require('../controllers/controllers.js');
const isLoggedIn = require('../middleware/middleware.js').isLoggedIn;
const isSuperUser = require('../middleware/middleware.js').isSuperUser;

module.exports = function (app) {    

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    app.route('/usersById/:user_id/')
        .get(isLoggedIn, controllers.getUserById)

    app.route('/usersByName/:user_name/')
        .get(isLoggedIn, controllers.getUserByName)

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    app.route('/policiesByUserName/:user_name/')
        .get(isLoggedIn, isSuperUser, controllers.getPoliciesByUserName)

    app.route('/userByPolicyNumber/:policy_id/')
        .get(isLoggedIn, isSuperUser, controllers.getUserByPolicyNumber)

};