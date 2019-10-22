const { user, password, server, port, instanceName } = require('../../.env');
const sql = require("mssql");
let connectionData = {
    user: user,
    password: password,
    server: server,
    port: port,
    options: {
        encrypt: false,
        instanceName: instanceName
    }
}

const createDB = async (databaseName) => {
    try {
        await sql.connect(connectionData)
        const result = await sql.query(`USE master IF DB_ID ('${databaseName}') IS NOT NULL DROP DATABASE ${databaseName} CREATE DATABASE ${databaseName}`)
        await sql.close()
        console.log(`${databaseName} created!`)
        return result
    } catch (err) {
        sql.close()
        console.log(err)
    }
}


module.exports = createDB