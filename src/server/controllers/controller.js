const Model = require('../db-models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');


// env configs
dotenv.config({ path: '__config__/config.env' });

// ======= Signs up user ===========
const signUpUser = (req, res) => {
  const { email, password } = req.body;

  Model.findOne({ email }, (err, user) => {
    if (err) throw err;

    if (user) {
      console.log(`Username ${email} already exists, please login instead!`);
      res.sendStatus(409);
    } else {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) throw err;

        if (hash) {
          const user = new Model({ email, hashPassword: hash });
          user.save(err => {
            if (err) {
              throw err;
            } else {
              console.log(`${email} and password has been saved!`);
              res.sendStatus(201);
            }
          })
        }
      })
    }
  })
}

// ======== Logs In user ===========
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  Model.findOne({ email }, (err, user) => {
    if (err) throw err;

    if (user) {
      bcrypt.compare(password, user.hashPassword, (err, result) => {
        if (err) {
          throw err;
        }

        if (result) {
          console.log(result, 'User found and authenticated!');
          // creates json web token
          const token = jwt.sign({ user: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
          console.log('Created Token', token)
          res.json({ token })
        } else {
          console.log('Password failed!')
          res.sendStatus(401)
        }
      })
    } else {
      console.log('User not found!')
      res.sendStatus(404)
    }
  })
}


module.exports = {
  signUpUser,
  loginUser,
}