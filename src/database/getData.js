const axios = require('axios')

const getData = function (url) {
  return axios.get(url)
}

module.exports = getData
