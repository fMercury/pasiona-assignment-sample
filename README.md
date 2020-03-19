# 


# backend_pasiona

An application that manages some information regarding insurance policies and company clients.
To do that, there are two services that provide all the data needed:
- http://www.mocky.io/v2/5808862710000087232b75ac
- http://www.mocky.io/v2/580891a4100000e8242b75c5

With this information, have to create a Web API that exposes the following services with their inherent restrictions:

* Get user daa filtered by user id -> Can be accessed by users with role "users" and "admin"
* Get user data filtered by user name -> Can be accessed by user with role "users" and "admin"
* Get the list of policies linked to a user name -> Can be accessed by users with role "admin"
* Get the user linked to a policy number -> Can be accessed by users with role "admin"

## Getting Started

Fork or Clone from https://github.com/fMercury/backend_pasiona
```
git clone https://github.com/fMercury/backend_pasiona.git
```
and inside project folder run 
```
npm install
npm start
```

.
.

Error codes: 
U01 : controller:getUsersById 
U02 : controller:getUsersByName
P01 : controller:getPoliciesByUserName
P02 : controller:getUserByPolicyNumber
E01 : index:StatusCode_500

.
.

usersById
http://127.0.0.1:5000/usersById/a3b8d425-2b60-4ad7-becc-bedf2ef860bd
http://127.0.0.1:5000/usersById/a0ece5db-cd14-4f21-812f-966633e7be86
http://127.0.0.1:5000/usersById/e8fd159b-57c4-4d36-9bd7-a59ca13057bb

usersByName
http://127.0.0.1:5000/usersByName/Barnett
http://127.0.0.1:5000/usersByName/Britney
http://127.0.0.1:5000/usersByName/Manning

policiesByUserName
http://127.0.0.1:5000/policiesByUserName/Barnett
http://127.0.0.1:5000/policiesByUserName/Britney
http://127.0.0.1:5000/policiesByUserName/Manning

userByPolicyNumber
http://127.0.0.1:5000/userByPolicyNumber/7b624ed3-00d5-4c1b-9ab8-c265067ef58b
http://127.0.0.1:5000/userByPolicyNumber/64cceef9-3a01-49ae-a23b-3761b604800b

