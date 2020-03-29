== PASIONA TEST BACKEND

# 
# Backend API REST - Assessment

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

- Usage of last technologies 
- Solution properly structured 
- Usage of patterns
- Addeverything you think it is needed to ensure product quality & proper maintenance in case of an error
- We expect to have a minimum documentation on README file. We need to know what have you done and how to run your app. Alsoif you have taken any decision or could not meetany ofrequirements, please explain it to us.

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

## Solution: 

Administrators can run queries for any user or policy.
Non Admmin users cannot access information from other users.
If the URL is incorrect, the server automatically redirects to the dashboard corresponding to the type of user logged in or to the login page. 

## Documentation: 

## Example:

http://localhost:5001/login

- **GET: usersById?user_id= -**

Example
```json
Request:  
http://localhost:5001/usersById?user_id=a0ece5db-cd14-4f21-812f-966633e7be86

Response:
{
  "results": [
    {
      "id": "a0ece5db-cd14-4f21-812f-966633e7be86",
      "name": "Britney",
      "email": "britneyblankenship@quotezart.com",
      "role": "admin"
    }
  ]
}
```

- **GET: usersByName?user_name= -**

Example
```json
Request:  
http://localhost:5001/usersByName?user_name=Britney

Response:
{
  "results": [
    {
      "id": "a0ece5db-cd14-4f21-812f-966633e7be86",
      "name": "Britney",
      "email": "britneyblankenship@quotezart.com",
      "role": "admin"
    }
  ]
}
```

- **GET: policiesByUserName?user_name= -**

Example
```json
Request:  
http://localhost:5001/policiesByUserName?user_name=Britney

Response:
{
  "results": [
    {
      "id": "7b624ed3-00d5-4c1b-9ab8-c265067ef58b",
      "amountInsured": 399.89,
      "email": "inesblankenship@quotezart.com",
      "inceptionDate": "2015-07-06T06:55:49Z",
      "installmentPayment": true,
      "clientId": "a0ece5db-cd14-4f21-812f-966633e7be86"
    },
    .
    .
    .
    {
      "id": "0df3bcef-7a14-4dd7-a42d-fa209d0d5804",
      "amountInsured": 705.14,
      "email": "inesblankenship@quotezart.com",
      "inceptionDate": "2014-05-11T12:28:41Z",
      "installmentPayment": false,
      "clientId": "a0ece5db-cd14-4f21-812f-966633e7be86"
    }
  ]
}
```

- **GET: userByPolicyNumber?policy_id= -**

Example
```json
Request:  
http://localhost:5001/userByPolicyNumber?policy_id=7b624ed3-00d5-4c1b-9ab8-c265067ef58b

Response:
{
  "results": [
    {
      "id": "a0ece5db-cd14-4f21-812f-966633e7be86",
      "name": "Britney",
      "email": "britneyblankenship@quotezart.com",
      "role": "admin"
    }
  ]
}
```
