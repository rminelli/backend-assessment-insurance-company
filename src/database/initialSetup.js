const getData = require('./getData')
const createDatabase = require('./createDatabase')
const insertClientsData = require('./insertClientsData')
const insertPoliciesData = require('./insertPoliciesData')

const databaseName = 'IC_Database'
const clientsUrl = "http://www.mocky.io/v2/5808862710000087232b75ac"
const policiesUrl = "http://www.mocky.io/v2/580891a4100000e8242b75c5"

function insertData() {
getData(clientsUrl)
     .then(response => insertClientsData(response.data.clients))
     .then(response => getData(policiesUrl).then(response => insertPoliciesData(response.data.policies)))
     .catch(err => console.log(`Erro : ${err}`))
}

createDatabase(databaseName)
setTimeout(function(){ insertData(); }, 4000);





