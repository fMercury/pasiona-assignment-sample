'use strict';
require('dotenv').config()

let clients = require('../../logic/client/getUserByName.js');

exports.getUserByName = (req, res) => {
    clients.getUserByName(req.query.user_name, (results) => {
        if (results != undefined) {
            return res.send({
                results
            });
        }
        return res.status(500).send('Error code: U02');
    })
}

