const crypto = require('crypto')

const access_token = crypto.randomBytes(10).toString('hex')
console.log(access_token)

const refresh_token = crypto.randomBytes(10).toString('hex')
console.log(refresh_token)