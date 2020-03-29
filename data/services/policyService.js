'use strict';

exports.selectPoliciesByClientId = function selectPoliciesByClientId(policies, req) {
    const results = []
    policies.forEach((policy) => {
        if (policy.clientId == req)
            results.push(policy)
    })
    return results
}

exports.selectPolicyById = function selectPolicyById(policies, req) {
    const results = []
    policies.forEach((policy) => {
        if (policy.id == req)
            results.push(policy)
    })
    return results
}

