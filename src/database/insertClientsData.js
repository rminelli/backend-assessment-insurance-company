const sql = require('mssql')
const { user, password, server, database, port, instanceName } = require('../config/config.js');
let connectionData = {
    user: user,
    password: password,
    server: server,
    database: database,
    port: port,
    options: {
        encrypt: false,
        instanceName: instanceName
    }
}
function createTableClients(data) {

    const table = new sql.Table('clients');
    table.create = true;
    table.columns.add('id', sql.NVarChar(36), { nullable: false, primary: true });
    table.columns.add('name', sql.NVarChar(150), { nullable: false });
    table.columns.add('email', sql.NVarChar(50), { nullable: false });
    table.columns.add('role', sql.NVarChar(10), { nullable: false });

    for (let index = 0; index < data.length; index++) {
        table.rows.add(data[index].id, data[index].name, data[index].email, data[index].role)
    }

    const request = new sql.Request()
    request.bulk(table)
        .then(result => { console.log('Success - Clientes inserted in DB'), sql.close() })
        .catch(err => { console.log(`Erro : ${err}`), sql.close() })

}

function insertClientsData(data) {
    sql.connect(connectionData)
        .then(conn => createTableClients(data))
        .catch(err => console.log(`Erro : ${err}`));
}

module.exports = insertClientsData

