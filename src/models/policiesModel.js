const auth = require('../middleware/authentication.js')
const sql = require('mssql')

exports.getPolicies = function (req, res) {
  
    const { user, password, server, database, port, instanceName } = require('../../.env');
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
    let _clientName = req.headers.name
    let _clientPolicieId = req.headers.policieid

    let resp = auth.checkToken(_token)
    let query = ''

    if (_clientName) {
        query = `select a.name as clientName,                          
                        b.id as policieId, 
                        b.amountInsured, 
                        b.email as policeEmail, 
                        b.inceptionDate, 
                        b.installmentPayment, 
                        b.clientId as policieClientId
                    from 
                        clients as a 
                    join policies as b on a.id = b.clientId 
                    where a.name = '${_clientName}'`
    } else if (_clientPolicieId) {
        query = `select a.id as clientID, 
                        a.email as clientEmail, 
                        a.name as clientName, 
                        a.role as clientRole, 
                        b.id as policieId                       
                    from 
                        clients as a 
                    join policies as b on a.id = b.clientId 
                    where b.id = '${_clientPolicieId}'`
    } else {
        return res.status(404).send({ msg: 'customer name or policie id not provided' });
    }
    if (resp.decoded.data.role === 'admin') {
        sql.connect(connectionData).then(function (pool) {
            console.log("==== DATABASE CONNECTED =====");
            return pool.request().query(query).then(function (result) {
                console.log("*** Data successfully returned *** ");
                let _returnSql = result.recordset.length === 0 ? false : result.recordset
                if (!_returnSql) {
                    console.log("Client does not exist")
                    sql.close();
                    res.status(500).send('User does not exist!')
                } else {
                    console.log('Successful data query');
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
        res.status(401).send({ msg: 'Unauthorized access to this query', role: resp.decoded.data.role , data : resp.msg });
    }
}
