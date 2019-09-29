# Backend application for Insurance Company (Assessment)
## An insurance company has requested the development of a server-side application that can manage some information about the company's insurance policies and customers.

[![node version](https://img.shields.io/node/v/axios.svg?style=flat-square)](https://github.com/nodejs/node)
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

**The company provided two data sources, available on the services:**
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

**Change the configuration file with the access credentials for the database and your preferred private key**
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

### Step 2: Set up the Environment

## How to Use
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

# The api is running at http://127.0.0.1:3000/api/
# Use Postman a client REST to test the API. 

# Run test
$ npm test

```


### Web API###
**API Constraints:**

Get user data filtered by user id -> Can be accessed by users with role "users" and "admin":

* api/clients/**{id}**


Get user data filterd by user name -> Can be accessed by users with role "users" and "admin"

* api/clients/name/**{name}**


Get the list of policies linked to a user name -> Can be accessed by users with role "admin"

* api/clients/name/**{name}**/policies


Get the user linked to a policy number -> Can be accessed by users with role "admin"

* api/policies/**{policyId}**/client

***






for simulation purposes the token expiration time has been set to 300 seconds (5minutes)


####Javascript　

