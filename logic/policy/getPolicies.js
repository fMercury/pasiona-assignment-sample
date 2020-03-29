'use strict';
let policies = require('../../data/persistence/policyPersistence.js');

exports.getPolicies = function getPolicies(req, filter, callback) {

    policies.getPolicies((value) => {
        if (value != undefined) {
            const results = filter(value, req)
            callback(results)
        }
        if (value == undefined) {
            callback(undefined)
        }
    })
}

