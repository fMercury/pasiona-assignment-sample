'use strict';

let controllers = require('../controllers/controllers.js');
const middleware = require('../middleware/middleware.js');

module.exports = function (app) {

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    // session and params by query
    app.route('/usersById')
        .get(middleware.checkAuth, middleware.checkPassQuery, controllers.getUserById)

    app.route('/usersByName')
        .get(middleware.checkAuth, middleware.checkPassQuery, controllers.getUserByName)

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    // session and params by query
    app.route('/policiesByUserName')
        .get(middleware.checkAdminAuth, controllers.getPoliciesByUserName)

    app.route('/userByPolicyNumber')
        .get(middleware.checkAdminAuth, controllers.getUserByPolicyNumber)

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    app.route('/auth/')
        .get(controllers.auth)

    app.route('/login/:token/')
        .get(controllers.login)

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    app.get('/login/', function (req, res) {
        res.render('login');
    });

    app.get('/superuser/', middleware.checkAdminAuth, function (req, res) {
        res.render('superuser', { id: req.session.admin_token.user_data.id, email: req.session.admin_token.user_data.email, name: req.session.admin_token.user_data.name });
    });

    app.get('/normaluser/', middleware.checkAuth, function (req, res) {
        res.render('normaluser', { id: req.session.user_token.user_data.id, email: req.session.user_token.user_data.email, name: req.session.user_token.user_data.name });
    });

    app.get('/noauth/',
        (req, res) => res.json('no authenticated')
    );

    app.get('/noadmin/',
        (req, res) => res.json('action no authorized')
    );

    app.use('/', function (req, res) {
        if (!req.session.user_token && !req.session.admin_token) {
            res.redirect('/login');
        } else {

            if (req.session.admin_token) {
                res.redirect('superuser');
            }

            if (req.session.user_token) {
                res.redirect('normaluser');
            }

        }
    });


};