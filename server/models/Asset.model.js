const mongoose = require('mongoose')
const Schema = mongoose.Schema

const assetSchema = new Schema({
  website: String,
  username: String,
  password: String,
})

const Asset = mongoose.model('Asset', assetSchema)
module.exports = Asset