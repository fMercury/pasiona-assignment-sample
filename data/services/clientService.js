'use strict';

exports.selectUsersById = function selectUsersById(users, req) {
    const results = []
    users.forEach((user) => {
        if (user.id == req)
            results.push(user)
    })
    return results
}

exports.selectUsersByName = function selectUsersByName(users, req) {
    const results = []
    users.forEach((user) => {
        if (user.name == req)
            results.push(user)
    })
    return results
}

exports.selectUsersByEmail = function selectUsersByEmail(users, req) {
    const results = []
    users.forEach((user) => {
        if (user.email == req)
            results.push(user)
    })
    return results
}
