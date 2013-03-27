var GrowingFile = require('growing-file');

var milliseconds = 1000 // Milliseconds in one second
  , seconds      = 60   // Second in one minute
  , minutes      = 60   // Minutes in one hour
  , hours        = 24   // Hours in one day
  , days         = 7;   // Days in one week

// Timeout is a week, can be changed.
var timeout      = days * hours * minutes * seconds * milliseconds;

var qlogFile = '/var/log/asterisk/queue_log';
var file = GrowingFile.open(qlogFile, { "timeout": timeout });

var firstReading = true;

file.on('data', function (data) {
  if (firstReading) {
    firstReading = false;

    // TODO: Process lines on first reading.
  } else {
    var QueueLog = require('./QueueLog');
    var qlogObject = new QueueLog((data.toString('utf-8').trim().split('|')));
    console.log(qlogObject.qlogJSON);
  }
});

process.on('SIGINT', function () {
  process.exit(0);
});
