const { customAlphabet } = require('nanoid')

const nanoId = customAlphabet('123456789', 6)

module.exports = nanoId;