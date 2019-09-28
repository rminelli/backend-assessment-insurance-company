const getData = require('./getData')
const insertPoliciesData = require('./insertPoliciesData')

const policiesUrl = "http://www.mocky.io/v2/580891a4100000e8242b75c5"

getData(policiesUrl).then(response =>  insertPoliciesData(response.data.policies))  









