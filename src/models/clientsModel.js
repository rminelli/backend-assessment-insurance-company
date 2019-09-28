const auth = require('../middleware/authentication.js')

exports.getClient = function (req, res) {
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
    let _token = req.headers.token
    let _userId = req.headers.id
    let _userName = req.headers.name

    let resp = auth.checkToken(_token)
    let query = ''

    if (_userId) {
        query = `select * from clients where id = '${_userId}'`
    } else if (_userName) {
        query = `select * from clients where name = '${_userName}'`
    } else {
        return res.status(404).send({ msg: 'id or name not found' });
    }
    if (resp.status) {
        sql.connect(connectionData).then(function (pool) {

            console.log("==== DATABASE CONNECTED =====");
            return pool.request().query(query).then(function (result) {
                console.log("*** Data successfully returned *** ");
                let _returnSql = result.recordset.length === 0 ? false : result.recordset[0]
                if (!_returnSql) {
                    console.log("Client does not exist")
                    sql.close();
                    res.status(500).send('User does not exist!')
                } else {
                    console.log("User exist!", _returnSql);
                    sql.close()
                    res.status(200).send({ msg: true, data: _returnSql })

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
    } else {
        res.status(401).send({ msg: resp.msg });
    }
}