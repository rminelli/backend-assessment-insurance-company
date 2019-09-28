const sql = require('mssql')
let connectionData = {
    user: 'sa',
    password: 'SQLExpress',
    server: 'localhost',
    database: 'IC_Database',
    port: 1433,
    options: {
        encrypt: false,
        instanceName: 'SQLEXPRESS'
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
             .then(result => {console.log('constraintFk'), sql.close()})
             .catch(err => { console.log(`Erro : ${err}`), sql.close() })
}


function insertPoliciesData(data) {
    sql.connect(connectionData)
        .then(conn => createTablePolicies(data))
        .catch(err => console.log(`Erro : ${err}`));
}
   


module.exports = insertPoliciesData



