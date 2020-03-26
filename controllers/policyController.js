'use strict';
require('dotenv').config()
let client = require('./clientController.js');
let request = require('request')
let NodeCache = require("node-cache");
let myCache = new NodeCache();

//////////////////////////////////////////////////////////////////////////////////////////////////////////
const policiesURL = 'http://www.mocky.io/v2/580891a4100000e8242b75c5';

function getPolicies(req, filter, callback) {

    let myURL = policiesURL
    let value = myCache.get(myURL);

    if (value != undefined) {
        // console.log('------ Policies cache')
        const results = filter(value, req)
        callback(results)
    }

    if (value == undefined) {
        // console.log('------ Policies original API')
        request({ url: myURL, json: true }, (error, response, body) => {
            if (error && response.statusCode === 500) {
                console.error(err.stack);
                callback(undefined)
            }
            if (!error && response.statusCode === 200) {
                myCache.set(myURL, body.policies, 100000000)
                const results = filter(body.policies, req)
                callback(results)
            }
        })

    }
}
exports.getPolicies = getPolicies

function selectPoliciesByClientId(policies, clientId) {
    const results = []
    policies.forEach((policy) => {
        if (policy.clientId == clientId)
            results.push(policy)
    })
    return results
}

function selectPolicyById(policies, req) {
    const results = []
    policies.forEach((policy) => {
        if (policy.id == req.query.policy_id)
            results.push(policy)
    })
    return results
}
exports.selectPolicyById = selectPolicyById

function selectUsersByClientId(users, clientId) {
    const results = []
    users.forEach((user) => {
        if (user.id == clientId)
            results.push(user)
    })
    return results
}
exports.selectUsersByClientId = selectUsersByClientId

exports.getPoliciesByUserName = (req, res) => {

    client.getUsers(req, client.selectUsersByName, (user) => {

        if (user != undefined && user.length > 0) {

            getPolicies(user[0]['id'], selectPoliciesByClientId, (results) => {

                if (results != undefined) {
                    return res.send({
                        results
                    });
                }
                return res.status(500).send('Error code: P01');
            })
        }
        if (user == undefined || user.length == 0) {
            return res.send({
                "results": []
            });
        }
    })
}

exports.getUserByPolicyNumber = (req, res) => {

    getPolicies(req, selectPolicyById, (policy) => {

        if (policy != undefined && policy.length > 0) {

            client.getUsers(policy[0]['clientId'], selectUsersByClientId, (results) => {

                if (results != undefined) {
                    return res.send({
                        results
                    });
                }
                return res.status(500).send('Error code: P02');
            })
        }
        if (policy == undefined || policy.length == 0) {
            return res.send({
                "results": []
            });
        }
    })

}
//////////////////////////////////////////////////////////////////////////////////////////////////////////
