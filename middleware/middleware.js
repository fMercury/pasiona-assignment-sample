
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
    },
};

module.exports = middlewares;

