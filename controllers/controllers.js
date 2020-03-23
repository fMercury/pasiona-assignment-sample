'use strict';
require('dotenv').config()
let request = require('request')
let NodeCache = require("node-cache");
let myCache = new NodeCache();

let jwt = require('jsonwebtoken');
const session = require('express-session');
session({ secret: process.env.JWT_SECRET, cookie: { maxAge: 60 * 60 * 1000 * 24 } }); // // expires in 24 hour

//////////////////////////////////////////////////////////////////////////////////////////////////////////
const clientsURL = 'http://www.mocky.io/v2/5808862710000087232b75ac';

function getUsers(req, filter, callback) {
    let myURL = clientsURL
    let value = myCache.get(myURL);

    if (value != undefined) {
        // console.log('------ Users cache')
        const results = filter(value, req)
        callback(results)
    }

    if (value == undefined) {
        request({ url: myURL, json: true }, (error, response, body) => {
            if (error && response.statusCode === 500) {
                console.error(err.stack);
                callback(undefined)
            }

            if (!error && response.statusCode === 200) {
                myCache.set(myURL, body.clients, 100000000)
                // console.log('------ Users Original API')
                const results = filter(body.clients, req)
                callback(results)
            }
        })

    }
}
exports.getUsers = getUsers

function selectUsersById(users, req) {
    const results = []
    users.forEach((user) => {
        if (user.id == req.query.user_id)
            results.push(user)
    })
    return results
}
exports.selectUsersById = selectUsersById

function selectUsersByName(users, req) {
    const results = []
    users.forEach((user) => {
        if (user.name == req.query.user_name)
            results.push(user)
    })
    return results
}
exports.selectUsersByName = selectUsersByName

exports.getUserById = (req, res) => {
    getUsers(req, selectUsersById, (results) => {
        if (results != undefined) {

            return res.send({
                results
            });
        }

        return res.status(500).send('Error code: U01');
    })
}

exports.getUserByName = (req, res) => {
    getUsers(req, selectUsersByName, (results) => {
        if (results != undefined) {
            return res.send({
                results
            });
        }
        return res.status(500).send('Error code: U02');
    })
}

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

    getUsers(req, selectUsersByName, (user) => {

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

            getUsers(policy[0]['clientId'], selectUsersByClientId, (results) => {

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

function selectUsersByEmail(users, email) {
    const results = []
    users.forEach((user) => {
        if (user.email == email)
            results.push(user)
    })
    return results
}

exports.auth = (req, res) => {
    const email = req.query.email; 

    getUsers(email, selectUsersByEmail, (result) => {
        if (result != undefined) {

            if (result.length == 1 && result[0]['email'] === email) {

                const user = {
                    id: result[0]['id'],
                    email: result[0]['email'],
                    name: result[0]['name'],
                    role: result[0]['role'],
                }

                const payload = {
                    check: true,
                    user_data: user,
                    date_access: new Date(Date.now())
                };

                const token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: 60 * 60 * 24 // expires in 24 hours
                });

                console.log("http://localhost:5001/login/" + token)

                //sendMail(result[0]['email'], result[0]['name'], `http://localhost:5001/login/${token}`, "Token Message", "noreply@pasiona_test.com", "noreply_pasiona_test") 

                return res.send({
                    //'msg':"The URL with your access token was sended to your email",
                    'URL': `http://localhost:5001/login/${token}`
                });


            }
        }
        return res.send({
            'Result': "User not found"
        });
    })
}

exports.login = (req, res) => {
    try {
        const sess = req.session
        const token = req.params.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        getUsers(decoded.user_data.email, selectUsersByEmail, (result) => {
            if (result != undefined) {
                if (result.length == 1) {
                    // if (result[0]['token'] === token) {
                    if (true) {
                        // mail works, token works 
                        if (result[0]['role'] == 'admin') {
                            sess.admin_token = decoded
                            sess.user_token = undefined

                            res.redirect('/superuser');
                        }
                        if (result[0]['role'] == 'user') {
                            sess.user_token = decoded
                            sess.admin_token = undefined

                            res.redirect('/normaluser');
                        }
                    }
                    // else{
                    //     // mail works, token doesnt works 
                    //     return res.send({
                    //         'Result': "Invalid Token"
                    //     });
                    // }
                }
                else {
                    // mail doesnt works
                    return res.send({
                        'Result': "Invalid User"
                    });


                }
            }

        })

    }
    catch (error) {
        return res.send({
            'Result': "error" + error
        });
    }
}
