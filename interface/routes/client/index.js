import getUserById from "./getUserById";
import getUserByName from "./getUserByName";
import getUserByPolicyNumber from "./getUserByPolicyNumber";

module.exports = function (app) {

    getUserById(app)

    getUserByName(app)
    
    getUserByPolicyNumber(app)

};
