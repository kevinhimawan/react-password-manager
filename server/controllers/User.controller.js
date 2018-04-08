const User = require('../models/User.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10

module.exports = {
  usersignup (req, res) {
    const { username, email, password } = req.body
    User.findOne({$or: [
      {email: email},
      {username: username}
    ]})
    .exec()
    .then(userData => {
      if (userData) {
        res.status(409).json({
          message: `This ${email} email address has already taken`
        })
      } else {
        let salt = bcrypt.genSaltSync(saltRounds);
        let hash = bcrypt.hashSync(password, salt);
        newUser = new User({
          username,email,password: hash
        })
        newUser.save()
        .then(newUserData => {

          const token = jwt.sign({expired: Math.floor(Date.now() / 1000) + (60 * 60), data:{id:newUserData._id, email: newUserData.email, status: newUserData.status}},'secret')
          console.log(token)
          res.status(200).json({
            token})
        })
        .catch(err => {
          res.status(500).json(err)
        })
      }
    })
  },
}