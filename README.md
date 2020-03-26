== PASIONA TEST BACKEND

# 
# Backend API REST - Assessment (W.I.P.)

An application that manages some information regarding insurance policies and company clients.
To do that, there are two services that provide all the data needed:
- http://www.mocky.io/v2/5808862710000087232b75ac
- http://www.mocky.io/v2/580891a4100000e8242b75c5

With this information, have to create a Web API that exposes the following services with their inherent restrictions:
* Get user daa filtered by user id -> Can be accessed by users with role "users" and "admin"
* Get user data filtered by user name -> Can be accessed by user with role "users" and "admin"
* Get the list of policies linked to a user name -> Can be accessed by users with role "admin"
* Get the user linked to a policy number -> Can be accessed by users with role "admin"

Aditional details

- Solution properly structured 

![Assessment](https://github.com/fMercury/backend_pasiona/blob/master/backend_test_axa.pdf "Assessment")



## How to:

Fork or Clone from https://github.com/fMercury/backend_pasiona
```
git clone https://github.com/fMercury/backend_pasiona.git
```
and inside project folder run 
```
npm install
npm start
```

## Solution implemented: 

Administrators can run queries for any user or policy.
Ordinary users cannot access information from other users.
If the URL is incorrect, the server automatically redirects to the dashboard corresponding to the type of user logged in or to the login page. To change user, you have to go to login site and enter different user information. User session data will be updated with the last token accessed.


## API Documentation: 

## Example:

http://localhost:5001/login

- examples with .usersById
http://localhost:5001/usersById?user_id=a3b8d425-2b60-4ad7-becc-bedf2ef860bd
http://localhost:5001/usersById?user_id=a0ece5db-cd14-4f21-812f-966633e7be86
http://localhost:5001/usersById?user_id=e8fd159b-57c4-4d36-9bd7-a59ca13057bb

- examples with .usersByName
http://localhost:5001/usersByName?user_name=Barnett
http://localhost:5001/usersByName?user_name=Britney
http://localhost:5001/usersByName?user_name=Manning

- examples with .policiesByUserName
http://localhost:5001/policiesByUserName?user_name=Barnett
http://localhost:5001/policiesByUserName?user_name=Britney
http://localhost:5001/policiesByUserName?user_name=Manning

- examples with .userByPolicyNumber
- Britney user
http://localhost:5001/userByPolicyNumber?policy_id=7b624ed3-00d5-4c1b-9ab8-c265067ef58b

- Manning user
http://localhost:5001/userByPolicyNumber?policy_id=64cceef9-3a01-49ae-a23b-3761b604800b

.

Error codes: 
- U01 : controller:getUsersById 
- U02 : controller:getUsersByName
- P01 : controller:getPoliciesByUserName
- P02 : controller:getUserByPolicyNumber
- E01 : index:StatusCode_500
