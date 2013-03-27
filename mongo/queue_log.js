var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var queuelogSchema = new Schema ({
  timestamp: String,
  uniqueid: String,
  queue: String,
  channel: String,
  event: String,
  param1: String,
  param2: String,
  param3: String
});

module.exports = mongoose.model ('queue_log', queuelogSchema, 'queue_log');
