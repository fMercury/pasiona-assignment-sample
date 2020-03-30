'use strict';

let policy = require('../../logic/policy/getPoliciesByUserName.js');

exports.getPoliciesByUserName = (req, res) => {
    policy.getPoliciesByUserName(req.query.user_name, (results) => {
                if (results != undefined) {
                    return res.send({
                        results
                    });
                }
                return res.status(500).send('code: P01');
            })
}
