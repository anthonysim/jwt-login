const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// env configs
dotenv.config({ path: '__config__/config.env' });

// cookies version
exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (token === null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403)
    }
    console.log(user);
    req.user = user;
    return res.sendStatus(200);
    // next();
  })
}


// local storage version
// exports.verifyToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1]

//   if (token === null) {
//     return res.sendStatus(401);
//   }

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) {
//       return res.sendStatus(403)
//     }
//     console.log(user);
//     req.user = user;
//     next();
//   })
// }