
'use strict';

let controllers = require('../controllers/controllers.js');

const middlewares = {

    isLoggedIn: function (req, res, next) {
        controllers.getUsers(req, controllers.selectUsersByName, (user) => {
            if (user != undefined && user.length > 0) {
                return next();
            }
            controllers.getUsers(req, controllers.selectUsersById, (user) => {
                if (user != undefined && user.length > 0) {
                    return next();
                }

                controllers.getPolicies(req, controllers.selectPolicyById, (policy) => {

                    if (policy != undefined && policy.length > 0) {

                        controllers.getUsers(policy[0]['clientId'], controllers.selectUsersByClientId, (user) => {

                            if (user != undefined && user.length > 0) {
                                return next();
                            }

                            if (user == undefined || user.length == 0) {
                                res.redirect('/noauth');
                            }
                        })
                    }

                    if (policy == undefined || policy.length == 0) {
                        res.redirect('/noauth');
                    }

                })

            })
        })
        // if (req.user) return next();
        // res.redirect('/');
    },

    isSuperUser: function (req, res, next) {

        controllers.getUsers(req, controllers.selectUsersByName, (user) => {
            if (user != undefined && user.length > 0) {
                if (user[0]['role'] == 'admin') {
                    return next();
                }
            }

            controllers.getPolicies(req, controllers.selectPolicyById, (policy) => {
                if (policy != undefined && policy.length > 0) {

                    controllers.getUsers(policy[0]['clientId'], controllers.selectUsersByClientId, (user) => {
                        if (user != undefined && user.length > 0) {
                            if (user[0]['role'] == 'admin') {
                                return next();
                            }
                            res.redirect('/noadmin');

                        }

                        if (user == undefined || user.length == 0) {
                            res.redirect('/noadmin');
                        }

                    })
                }

                if (policy == undefined || policy.length == 0) {
                    res.redirect('/noadmin');
                }

            })

        })
        // if (req.user.is_superuser) return next();
        // res.redirect('/');
    },

    checkAdminAuth: function (req, res, next) {
        if (req.session.admin_token && req.session.admin_token.user_data.role == 'admin') {
            next();
        } else {
            res.send('You are not authorized to view this page');
        }
    },

    checkAuth: function (req, res, next) {
        if (req.session.user_token || req.session.admin_token) {
            next();
        } else {
            res.send('You are not authorized to view this page');
        }
    },

    checkPassQuery: function (req, res, next) {
        if (req.session.admin_token && req.session.admin_token.user_data.role == 'admin') {
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
                res.send("WARNING:" + error);
            }
        }
    },
};

module.exports = middlewares;

