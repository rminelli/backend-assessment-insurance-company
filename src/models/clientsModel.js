const auth = require('../middleware/authentication.js')
const sql = require('mssql')

exports.getClient = function (req, res) {
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
    let _token = req.headers.token
    let _clientId = req.headers.id
    let _clientName = req.headers.name

    let resp = auth.checkToken(_token)
    let query = ''

    if (_clientId) {
        query = `select * from clients where id = '${_clientId}'`
    } else if (_clientName) {
        query = `select * from clients where name = '${_clientName}'`
    } else {
        return res.status(404).send({ msg: 'client id or name not provided' });
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