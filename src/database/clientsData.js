const sql = require("mssql");
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


function createTable(conn) {

    const table = new sql.Table('clients');
    table.create = true;
    table.columns.add('id', sql.NVarChar(36), { nullable: false, primary: true });
    table.columns.add('name', sql.NVarChar(150), { nullable: false });
    table.columns.add('email', sql.NVarChar(50), { nullable: false });
    table.columns.add('role', sql.NVarChar(10), { nullable: false });
    table.rows.add('a0ece5db-cd14-4f21-812f-966633e7be86', 'Britney', 'britneyblankenship@quotezart.com','admin2');

    const request = new sql.Request()    
    request.bulk(table)
        .then(result => {console.log(result), sql.close()})
        .catch(err => {console.log('error in bulk. ' + err), sql.close()})    
}

sql.connect(connectionData)
   .then(conn => createTable(conn))
   .catch(err => console.log("erro! " + err));

