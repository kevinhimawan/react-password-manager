const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  password: String,
  asset: {
    type: Schema.Types.ObjectId,
    ref: 'Asset'
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User