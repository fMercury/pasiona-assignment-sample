'use strict';
require('dotenv').config()
let request = require('request')
let NodeCache = require("node-cache");
let myCache = new NodeCache();

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

function selectUsersByEmail(users, email) {
    const results = []
    users.forEach((user) => {
        if (user.email == email)
            results.push(user)
    })
    return results
}

exports.selectUsersByEmail = selectUsersByEmail
