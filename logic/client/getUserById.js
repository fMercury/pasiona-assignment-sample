'use strict';

let clients = require('./getUsers.js');
let clientsService = require('../../data/services/clientService.js');

exports.getUserById = (userId, callback) => {
    
    clients.getUsers(userId, clientsService.selectUsersById, callback)

}

