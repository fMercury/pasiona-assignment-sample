const getUserById = require('./getUserById');
const getUserByName = require('./getUserByName');
const getUserByPolicyNumber = require('./getUserByPolicyNumber');

module.exports = function (app) {

    getUserById(app)

    getUserByName(app)
    
    getUserByPolicyNumber(app)

};
