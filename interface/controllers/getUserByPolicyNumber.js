'use strict';

let client = require('../../logic/client/getUserByPolicyNumber.js');

exports.getUserByPolicyNumber = (req, res) => {
    client.getUserByPolicyNumber(req.query.policy_id, (results) => {
                if (results != undefined) {
                    return res.send({
                        results
                    });
                }
                return res.status(500).send('Error code: P02');
            })
}

