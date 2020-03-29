'use strict';

let clients = require('./getUsers.js');
let clientsService = require('../../data/services/clientService.js');

exports.getUserByName = (userName, callback) => {

    clients.getUsers(userName, clientsService.selectUsersByName, callback)

}
