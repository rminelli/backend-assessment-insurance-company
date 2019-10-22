const getData = require('./getData')
const createDB = require('./createDatabase')
const insertClientsData = require('./insertClientsData')
const insertPoliciesData = require('./insertPoliciesData')
const { database } = require('../../.env');
const clientsUrl = "http://www.mocky.io/v2/5808862710000087232b75ac"
const policiesUrl = "http://www.mocky.io/v2/580891a4100000e8242b75c5"


createDB(database)
    .then(response => insertData())
    .catch(err => console.log(`Erro : ${err}`))

function insertData() {
    getData(clientsUrl)
        .then(response => insertClientsData(response.data.clients))
        .then(response => getData(policiesUrl)
            .then(response => insertPoliciesData(response.data.policies)))
        .catch(err => console.log(`Erro : ${err}`))
}







