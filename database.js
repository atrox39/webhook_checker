const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);
const { connection } = mongoose;

connection.on('open', () => {
  console.log('success');
});

connection.on('error', (err) => {
  console.log('error: ', err);
});

module.exports = connection;
