const axios = require('axios')
const getData = async function (url) {
  return await axios.get(url)
}

module.exports = getData
