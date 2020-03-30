'use strict';

const middlewares = {

    checkAdminAuth: function (req, res, next) {
        if (req.session.admin_token || req.get("Authorization")) {
            next();
        } else {
            res.send('You are not authorized to view this page .');
        }
    },

    checkAuth: function (req, res, next) {
        if (req.session.user_token || req.session.admin_token || req.get("Authorization")) {
            next();
        } else {
            res.send('You are not authorized to view this page.');
        }
    },

    checkPassQuery: function (req, res, next) {
        if (req.session.admin_token || req.get("Authorization")) {
            next();
        }

        if (!req.session.admin_token) {
            try {
                if (req.session.user_token) {
                    if (req.session.user_token.user_data.name == req.query.user_name || req.session.user_token.user_data.id == req.query.user_id) {
                        next();
                    }
                    if (req.session.user_token.user_data.name != req.query.user_name && req.session.user_token.user_data.id != req.query.user_id) {
                        res.send('You are not authorized to view this information');
                    }
                }

                if (!req.session.user_token) {
                    res.redirect('/login');
                }
            } catch (error) {
                console.log("WARNING:" + error)
            }
        }
    },
};


module.exports = middlewares;

