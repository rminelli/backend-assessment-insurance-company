const getData = require('./getData')

const clientsUrl = "http://www.mocky.io/v2/5808862710000087232b75ac"
const policiesUrl = "http://www.mocky.io/v2/580891a4100000e8242b75c5"


Promise.all([getData(clientsUrl),getData(policiesUrl)]).then(function (response) {
    const _clients = response[0].data.clients
    const _policies = response[1].data.policies
    console.log(_clients)
    console.log(_policies)
}).catch(err => console.log(`Erro : ${err}`));