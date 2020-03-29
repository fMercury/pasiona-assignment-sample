'use strict';
require('dotenv').config()
let request = require('request')
let NodeCache = require("node-cache");
let myCache = new NodeCache();

const policiesURL = 'http://www.mocky.io/v2/580891a4100000e8242b75c5';

exports.getPolicies = function getPolicies(callback) {
    let myURL = policiesURL
    let value = myCache.get(myURL);
    if (value != undefined) {
        callback(value);
    }
    if (value == undefined) {
        request({ url: myURL, json: true }, (error, response, body) => {
            if (error && response.statusCode === 500) {
                console.error(err.stack);
                callback(undefined);
            }
            if (!error && response.statusCode === 200) {
                myCache.set(myURL, body.policies, 100000000)
                callback(body.policies);
            }
        })
    }
}
