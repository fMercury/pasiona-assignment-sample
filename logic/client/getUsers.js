'use strict';
let clients = require('../../data/persistence/clientPersistence.js');

exports.getUsers = function getUsers(req, filter, callback) {
    clients.getUsers((value)=>{
        if (value != undefined) {
            const results = filter(value, req)
            callback(results)
        }
        if (value == undefined) {
            callback(undefined)
        }
    })
}

