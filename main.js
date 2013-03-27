// Main File check for Databases Setup.

// MongoDB
var mongoose = require('mongoose')
  , mongoString = require('./mongo/mongo')();

if (mongoString) {
  var mongoQLog = require('./mongo/queue_log');
  mongoose.connect(mongoString, function (err) {
    if (err) console.log(err);
    else {
      console.log('Mongo Database Connection Successful.');
      mongoose.disconnect();
    }
  });
} else {
  console.log('MongoDB is disabled.');
}
