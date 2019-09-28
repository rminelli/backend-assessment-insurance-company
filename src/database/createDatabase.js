const sql = require("mssql");
let connectionData = {
    user: 'sa',
    password: 'SQLExpress',
    server: 'localhost',
    port: 1433,
    options: {
        encrypt: false,
        instanceName: 'SQLEXPRESS'
    }
}

 function ddlObject(databaseName) {    
    sql.query(`USE master IF DB_ID ('${databaseName}') IS NOT NULL DROP DATABASE ${databaseName} CREATE DATABASE ${databaseName}`)
        .then(conn => { console.log(`${databaseName} created!`), sql.close() })
        .catch(err => { console.log(`Erro : ${err}`), sql.close() })        
}

 function createDatabaseName(databaseName) {
    sql.connect(connectionData)
        .then(conn => ddlObject(databaseName))
        .catch(err => console.log(`Erro : ${err}`))        
}

module.exports = createDatabaseName