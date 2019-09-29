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
function createTablePolicies(data) {
    const table = new sql.Table('policies');
    const constraintFk = 'ALTER TABLE policies ADD CONSTRAINT fkey_clients_id FOREIGN KEY (clientId) REFERENCES clients(id)'
    table.create = true;
    table.columns.add('id', sql.NVarChar(36), { nullable: false, primary: true });
    table.columns.add('amountInsured', sql.NVarChar(100), { nullable: false });
    table.columns.add('email', sql.NVarChar(50), { nullable: false });
    table.columns.add('inceptionDate', sql.NVarChar(100), { nullable: false });
    table.columns.add('installmentPayment', sql.NVarChar(10), { nullable: false });
    table.columns.add('clientId', sql.NVarChar(36), { nullable: false });
    for (let index = 0; index < data.length; index++) {
        table.rows.add(data[index].id, data[index].amountInsured, data[index].email, data[index].inceptionDate, data[index].installmentPayment, data[index].clientId)
    }

    const request = new sql.Request()
    request.bulk(table)
        .then(result => request.query(constraintFk))
        .then(result => { console.log('Success - Policies and KF constraint inserted in DB'), sql.close() })
        .catch(err => { console.log(`Erro : ${err}`), sql.close() })
}


function insertPoliciesData(data) {
    sql.connect(connectionData)
        .then(conn => createTablePolicies(data))
        .catch(err => console.log(`Erro : ${err}`));
}



module.exports = insertPoliciesData



