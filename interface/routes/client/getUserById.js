'use strict';

let client = require('../../controllers/getUsersById.js');
const middleware = require('../../middlewares/middleware.js');

module.exports = function (app) {

    app.route('/usersById')
        .get(middleware.checkAuth, middleware.checkPassQuery, async (req, res) => { 
            return await client.getUserById(req, res); 
        })

};
