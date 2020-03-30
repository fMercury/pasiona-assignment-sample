'use strict';
require('dotenv').config()

let clients = require('../../logic/client/getUserByName.js');

exports.getUserByName = async (req, res) => {
    clients.getUserByName(req.query.user_name, (results) => {
        if (results != undefined) {
            return res.send({
                results
            });
        }
        if (results == undefined) {
        return res.status(500).send('code: U02');
        }
    })
}


