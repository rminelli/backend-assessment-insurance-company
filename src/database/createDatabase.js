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

function createDatabase() {
    const databaseName = 'IC_Database'
    sql.query(`USE master IF DB_ID ('${databaseName}') IS NOT NULL DROP DATABASE ${databaseName} CREATE DATABASE ${databaseName}`)
       .then(conn => {console.log(`${databaseName} created!`), sql.close()})
       .catch(err => {console.log("erro! " + err), sql.close()})    
}

sql.connect(connectionData)
    .then(conn => createDatabase(conn))
    .catch(err => console.log("erro! " + err))
