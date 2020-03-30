'use strict';

let policy = require('../../controllers/getPoliciesByUserName.js');
const middleware = require('../../middlewares/middleware.js');

module.exports = function (app) {

    app.route('/policiesByUserName')
        .get(middleware.checkAdminAuth, async (req, res) => {
            return await policy.getPoliciesByUserName(req, res);
        })

};