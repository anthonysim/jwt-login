const mongoose = require('mongoose');
const { Schema } = mongoose;
const dotenv = require('dotenv');

// env configs
dotenv.config({ path: '__config__/config.env' });

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => console.log(`Mongo Connected to ${process.env.MONGO_URI}! 😀`))
  .catch(() => console.error('ERROR, Mongo NOT Connected 👎!'));


// schema model for mongo.
const emailPasswordSchema = new Schema({
  email: String,
  hashPassword: String,
});

module.exports = mongoose.model('Passports', emailPasswordSchema);