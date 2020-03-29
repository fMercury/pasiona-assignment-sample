'use strict';

let clients = require('../client/getUsers.js');
let policies = require('./getPolicies.js');
let clientsService = require('../../data/services/clientService.js');
let policiesService = require('../../data/services/policyService.js');

exports.getPoliciesByUserName = (userName, callback) => {
    clients.getUsers(userName, clientsService.selectUsersByName, (user) => {
        if (user != undefined && user.length > 0) {
            policies.getPolicies(user[0]['id'], policiesService.selectPoliciesByClientId, callback)
        }
        if (user == undefined || user.length == 0) {
            callback([]);
        }
    })
}
