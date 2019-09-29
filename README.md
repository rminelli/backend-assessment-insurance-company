# Backend application for Insurance Company (Assessment)
## An insurance company has requested the development of a server-side application that can manage some information about the company's insurance policies and customers.

[![prettier](https://img.shields.io/badge/styled%20with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![GitHub](https://img.shields.io/github/license/mtxr/vscode-sqltools?style=flat-square)](https://github.com/rminelli/backend-assessment-insurance-company/blob/master/LICENSE)

This project was created with:

- Microsoft SQL Server 2017 Express 
- Javascript 
- Node.js
- Express.js
- Jwt
- Axios
- Jest
- Using MVC Design Pattern

**The company provided two data sources, available on the services**
* The list of company clients can be found at: http://www.mocky.io/v2/5808862710000087232b75ac
* The list of company policies can be found at: http://www.mocky.io/v2/580891a4100000e8242b75c5

**Restrictions & Constraints**
* Get user data filtered by user id -> Can be accessed by users with role "users" and "admin"
* Get user data filtered by user name -> Can be accessed by users with role "users" and "admin"
* Get the list of policies linked to a user name -> Can be accessed by users with role "admin"
* Get the user linked to a policy number -> Can be accessed by users with role "admin"
* Think about licenses of 3d party libraries (if needed)
* Authentication and authorization. Take the user role from the web service that returns the list of company clients 

## Getting Started
### Step 1: Install and Set up the Database
In order to install the edition of SQL Server 2017 Express, first you have to download the installer from the following [link](https://www.microsoft.com/pt-br/sql-server/sql-server-downloads).

**Turn on the SQL Server Browser**

Go to start up menu or the search and look for SQL Server Configuration Manager and run it! 
In the left Tab click on SQL Server Services now in the right tab double click on SQL Server Browser
will open a window, you will see 3 tabs, go for the Service tab change start mode to Automatic and apply
left click on SQL Server Browser and click restart

Back to the right tab click on SQL Server Network Configuration then Client Protocols change TCP/IP to enable.

**Database diagram (Will be created after the environment setup is completed)**
![](./docs/db.png)

### Step 2: Set up the Environment
```bash
# Clone this repository
$ git clone https://github.com/rminelli/backend-assessment-insurance-company

# Go into the repository
$ cd backend-assessment-insurance-company

# Install dependencies
$ npm install

# Create database and migrate data from the provided source
$ npm run migrate

# Run the app
$ npm start

# Run the app with nodemon
$ npm run start-dev

# The api is running at http://127.0.0.1:3000/api/
# Use Postman a client REST to test the API. 

# Run test
$ npm test

```
**Change the configuration file with the access credentials for the database and your preferred private key**
```bash
$ ./src/config/config.js
```
```javascript
module.exports = {
  myprivatekey: 'robertominelli@2019',
  user: 'sa',
  password: 'SQLExpress',
  server: 'localhost',
  database: 'IC_Database',
  port: 1433,
  instanceName: 'SQLEXPRESS'
};
```

## Web API REST
**API Constraints:**

### Get access token:

* api/
* Parameters required for authentication: **name** and **email**

The variable body (req.body) is sent to application / x-www-form-urlencoded, the body of the HTTP message sent to the server is essentially a query string, name / value is separated by ampersands (&), and names are separated from values using equal (=)

An example of this would be:

name=Jacquelyn&email=jacquelynblankenship%40quotezart.com
```bash
POST /api/ HTTP/1.1
Host: localhost:3000
Content-Type: application/x-www-form-urlencoded
User-Agent: PostmanRuntime/7.17.1
Accept: */*
Cache-Control: no-cache
Postman-Token: 8d0ffefe-8f9b-412d-a5d9-13b08b6a002b,9377ac9f-1013-4f6a-a617-545a829891d5
Host: localhost:3000
Accept-Encoding: gzip, deflate
Content-Length: 57
Connection: keep-alive
cache-control: no-cache
name=Jacquelyn&email=jacquelynblankenship%40quotezart.com
```

* For simulation purposes the token expiration time has been set to 300 seconds (5 minutes)
You can change this in the function getToken
```bash
$ ./src/middleware/authentication.js
```
```javascript
exports.getToken = function name(data) {
  let token = jwt.sign({ data }, config.myprivatekey, { expiresIn: 300 }) // expiration time
  return token
}
```

**Note:** Each token contains the user role according to the credentials provided by it, so if the user does not have the admin role he will not have access to **policies api**

### Get user data filterd by user name -> Can be accessed by users with role "users" and "admin"

* api/clients/
* Parameters required for fetch data: **token** and **id** or **name**

### Get the user linked to a policy number -> Can be accessed by users with role "admin"

* api/policies/
* Parameters required for fetch data: **token** and **name** or **policy number**

## Example using Postman:

**Getting access token**

Select **POST** 

Enter URL http://localhost:3000/api 

Click on **Body** select **x-www-form-urlencodedc** option and enter 2 parameters: 

- Key: **name**, 	Value: **Client name**
- Key: **email**, 	Value: **Client Email**

Click **Send** button

Will get **200 OK** and **access token**
```json
{
    "auth": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiMDA1OWJhNDQtNzVkYy00ZjczLTlhOWYtMGUyMzc2OTA5ZTI4Iiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTU2OTc5MDA0MiwiZXhwIjoxNTY5NzkwMzQyfQ.swtv9dG6xr-KMwOWeSYlEvL4L_bVp3r0_YHNewJjeeM"
}
```
![](./docs/getToken.png)

***

**Access api/clients/**

Select **GET**

Enter URL http://localhost:3000/api/clients

Click on **Header** and enter the parameters: 

Note: Parameters required for fetch data: **token** and **name** or **policy number**

- Key: **token**, 	Value: **Token provided**
- Key: **name**, 	Value: **Client Email** 
- Key: **id**, 		Value: **Client Id**


Click **Send** button

Will get **200 OK** and **data**
```json
{
    "msg": true,
    "data": {
        "id": "a0ece5db-cd14-4f21-812f-966633e7be86",
        "name": "Britney",
        "email": "britneyblankenship@quotezart.com",
        "role": "admin"
    }
}
```
![](./docs/getClients.png)

***

**Access api/clients/**

Select **GET**

Enter URL http://localhost:3000/api/policies

Click on **Header** and enter the parameters: 

Note: Parameters required for fetch data: **token** and **name** or **policieId**

- Key: **token**, 	Value: **Token provided**
- Key: **name**, 	Value: **Client Email** 
- Key: **policieId**, 	Value: **Policie Id** 

Click **Send** button

Will get **200 OK** and **data**
```json
{
    "msg": true,
    "data": [
        {
            "clientName": "Britney",
            "policieId": "0039b246-5ffa-4b90-b16f-fc9f2d4033d6",
            "amountInsured": "879.83",
            "policeEmail": "inesblankenship@quotezart.com",
            "inceptionDate": "2014-06-29T03:41:22Z",
            "installmentPayment": "false",
            "policieClientId": "a0ece5db-cd14-4f21-812f-966633e7be86"
        }
    ]
}   
```
![](./docs/getPolicies.png)


## License
[MIT](https://github.com/rminelli/backend-assessment-insurance-company/blob/master/LICENSE)










