'use strict';
require('dotenv').config()

let clients = require('../../logic/client/getUserById.js');

exports.getUserById = (req, res) => {
    clients.getUserById(req.query.user_id, (results) => {
        if (results != undefined) {
            return res.send({
                results
            });
        }
        return res.status(500).send('Error code: U01');
    })
}

