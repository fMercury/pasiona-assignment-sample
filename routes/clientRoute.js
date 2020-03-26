'use strict';

let client = require('../controllers/clientController.js');
const middleware = require('../middlewares/middleware.js');

module.exports = function (app) {

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    // session and params by query
    app.route('/usersById')
        .get(middleware.checkAuth, middleware.checkPassQuery, client.getUserById)

    app.route('/usersByName')
        .get(middleware.checkAuth, middleware.checkPassQuery, client.getUserByName)


};