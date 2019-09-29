const sql = require('mssql')
const auth = require('../middleware/authentication.js')

exports.userModel = function (req, res) {
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
    let _userName = req.body.name
    let _userEmail = req.body.email

    sql.connect(connectionData).then(function (pool) {
        console.log("==== DATABASE CONNECTED =====");
        let query = `select id, role from clients where name = '${_userName}' and email = '${_userEmail}'`
        return pool.request().query(query).then(function (result) {
            console.log("*** Data successfully returned *** ");
            let _returnSql = result.recordset.length === 0 ? false : result.recordset[0]
            if (!_returnSql) {
                console.log("User does not exist")
                sql.close();
                res.status(401).send('User does not exist!')
            } else {
                // Create token 
                console.log("User exist!");
                sql.close();                
                let token = auth.getToken(_returnSql)
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