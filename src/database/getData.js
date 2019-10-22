const axios = require('axios')
const getData = async function (url) {
  result = await axios.get(url)
  return result 
}

module.exports = getData
