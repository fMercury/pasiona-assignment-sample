'use strict';
require('dotenv').config()
let client = require('./clientController.js');
let jwt = require('jsonwebtoken');
const session = require('express-session');
session({ secret: process.env.JWT_SECRET, cookie: { maxAge: 60 * 60 * 1000 * 24 } }); // // expires in 24 hour

//////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.auth = (req, res) => {
    const email = req.query.email;

    client.getUsers(email, client.selectUsersByEmail, (result) => {
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

                console.log("http://localhost:5001/login/" + token)

                //sendMail(result[0]['email'], result[0]['name'], `http://localhost:5001/login/${token}`, "Token Message", "noreply@pasiona_test.com", "noreply_pasiona_test") 

                return res.send({
                    //'msg':"The URL with your access token was sended to your email",
                    'URL': `http://localhost:5001/login/${token}`
                });


            }
        }
        return res.send({
            'Result': "User not found"
        });
    })
}

exports.login = (req, res) => {
    try {
        const sess = req.session
        const token = req.params.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        client.getUsers(decoded.user_data.email, client.selectUsersByEmail, (result) => {
            if (result != undefined) {
                if (result.length == 1) {
                    // if (result[0]['token'] === token) {
                    if (true) {
                        // mail works, token works 
                        if (result[0]['role'] == 'admin') {
                            sess.admin_token = decoded
                            sess.user_token = undefined

                            res.redirect('/superuser');
                        }
                        if (result[0]['role'] == 'user') {
                            sess.user_token = decoded
                            sess.admin_token = undefined

                            res.redirect('/normaluser');
                        }
                    }
                    // else{
                    //     // mail works, token doesnt works 
                    //     return res.send({
                    //         'Result': "Invalid Token"
                    //     });
                    // }
                }
                else {
                    // mail doesnt works
                    return res.send({
                        'Result': "Invalid User"
                    });


                }
            }

        })

    }
    catch (error) {
        return res.send({
            'Result': "error" + error
        });
    }
}
