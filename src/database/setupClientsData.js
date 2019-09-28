const getData = require('./getData')
const insertClientsData = require('./insertClientsData')

const clientsUrl = "http://www.mocky.io/v2/5808862710000087232b75ac"

getData(clientsUrl).then(response =>  insertClientsData(response.data.clients))  











