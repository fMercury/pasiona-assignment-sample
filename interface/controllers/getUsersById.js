'use strict';
require('dotenv').config()

let clients = require('../../logic/client/getUserById.js');

exports.getUserById = async (req, res) => {
    clients.getUserById(req.query.user_id, (results) => {
        if (results != undefined) {
            return res.send({
                results
            });
        }
        if (results == undefined) {
            return res.status(500).send('code: U01');
        }
    })
}


