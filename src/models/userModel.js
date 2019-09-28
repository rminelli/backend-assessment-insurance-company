exports.userModel = function (req, res) {
    const config = require('../config/config.js');
    const jwt = require('jsonwebtoken');
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
    let _userName = req.body.name
    let _userEmail = req.body.email
   
    sql.connect(connectionData).then(function (pool) {        
        console.log("==== DATABASE CONNECTED =====");
        let query = `select id from clients where name = '${_userName}' and email = '${_userEmail}'`
        return pool.request().query(query).then(function (result) {
            console.log("*** Data successfully returned *** ");
            let _returnSql = result.recordset.length === 0 ?  false : result.recordset[0].id 
            if (!_returnSql) {
                console.log("User does not exist")
                sql.close();
                res.status(500).send('User does not exist!')               
            } else {
                // Create token 
                console.log("Authenticated");
                sql.close();
               let token = jwt.sign({_returnSql}, config.myprivatekey, {expiresIn: 3000}) // expires in 50min)
               res.status(200).send({ auth: true, token: token });                    
            }
        }).catch(function (err) {
            console.log("SQL Error", err);
            sql.close();
            res.json(
                {
                    "status": false,
                    "msg": "SQL Error"
                }
            )
        });
    }).catch(function (errsql) {
        console.log("SQL Error", errsql);
        sql.close();
        res.json(
            {
                "status": false,
                "msg": "SQL Error"
            }
        )
    })
}