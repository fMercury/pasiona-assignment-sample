'use strict';

let controllers = require('../controllers/controllers.js');

module.exports = function (app) {    

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    app.route('/usersById/:user_id/')
        .get(controllers.getUserById)

    app.route('/usersByName/:user_name/')
        .get(controllers.getUserByName)

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    app.route('/policiesByUserName/:user_name/')
        .get(controllers.getPoliciesByUserName)

    app.route('/userByPolicyNumber/:policy_id/')
        .get(controllers.getUserByPolicyNumber)

};