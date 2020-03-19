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

