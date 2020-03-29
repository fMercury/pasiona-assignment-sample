'use strict';

let clients = require('./getUsers.js');
let policies = require('../policy/getPolicies.js');
let clientsService = require('../../data/services/clientService.js');
let policiesService = require('../../data/services/policyService.js');

exports.getUserByPolicyNumber = (policyId, callback) => {
    policies.getPolicies(policyId, policiesService.selectPolicyById, (policy) => {
        if (policy != undefined && policy.length > 0) {
            clients.getUsers(policy[0]['clientId'], clientsService.selectUsersById, callback)
        }
        if (policy == undefined || policy.length == 0) {
            callback([])
        }
    })
}
