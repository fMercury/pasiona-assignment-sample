'use strict';
require('dotenv').config()
let client = require('../../logic/client/getUsers.js');
let clientsService = require('../../data/services/clientService.js');
let jwt = require('jsonwebtoken');
const session = require('express-session');
session({ secret: process.env.JWT_SECRET, cookie: { maxAge: 60 * 60 * 1000 * 24 } }); // // expires in 24 hour

exports.auth = (req, res) => {
    const email = req.body.email;

    client.getUsers(email, clientsService.selectUsersByEmail, (result) => {
        if (result != undefined) {

            if (result.length == 1 && result[0]['email'] === email) {

                const user = {
                    id: result[0]['id'],
                    email: result[0]['email'],
                    name: result[0]['name'],
                    role: result[0]['role'],
                }

                const payload = {
                    check: true,
                    user_data: user,
                    date_access: new Date(Date.now())
                };

                const token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: 60 * 60 * 24 // expires in 24 hours
                });

                console.log(`http://localhost:${process.env.NODE_PORT}/loged?token=` + token)

                return res.send({
                    process: true,
                    message: user.name + ' authorized',
                    token: token,
                    'route': `/loged?token=${token}`,
                    'URL': `http://localhost:${process.env.NODE_PORT}/loged?token=${token}`
                });


            }
        }
        return res.status(401).send({
            process: false,
            message: 'Unauthorized' })
    })
}

exports.login = (req, res) => {
    try {
        const sess = req.session
        //const token = req.params.token;
        const token = req.query.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        client.getUsers(decoded.user_data.email, clientsService.selectUsersByEmail, (result) => {
            if (result != undefined) {
                if (result.length == 1) {
                    // mail works, token works 
                    if (result[0]['role'] == 'admin') {
                        sess.admin_token = decoded
                        sess.user_token = undefined

                        return res.redirect('/superuser');
                        
                    }
                    if (result[0]['role'] == 'user') {
                        sess.user_token = decoded
                        sess.admin_token = undefined

                        return res.redirect('/normaluser');
                        }
                }
                else {
                    // mail doesnt works
                    return res.status(401).send({
                        process: false,
                        message: 'Unauthorized'
                    })

                }
            }

        })

    }
    catch (error) {
        return res.status(401).send({ error: error })
    }
}
