'use strict';

let auth = require('../controllers/authController.js');
const middleware = require('../middlewares/middleware.js');

module.exports = function (app) {

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    app.route('/auth/')
        .get(auth.auth)

    app.route('/login/:token/')
        .get(auth.login)

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