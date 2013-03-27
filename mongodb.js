var mongoose = require('mongoose')
  , mongoString = require('./mongo/mongo')();

if (mongoString) {
  var mongoQLog = require('./mongo/queue_log');
  mongoose.connect(mongoString);

  mongoQLog.findOne().select('timestamp').sort('-LAST_MOD').exec(function (err, timestamp) {
    if (err) throw err;
    timestamp = timestamp || 0;

    var GrowingFile = require('growing-file');

    var milliseconds = 1000 // Milliseconds in one second
      , seconds      = 60   // Second in one minute
      , minutes      = 60   // Minutes in one hour
      , hours        = 24   // Hours in one day
      , days         = 7;   // Days in one week

    // Timeout is a week, can be changed.
    var timeout      = days * hours * minutes * seconds * milliseconds;

    var firstReading = true;
    var qlogFile = '/var/log/asterisk/queue_log';
    var file = GrowingFile.open(qlogFile, { "timeout": timeout });

    file.on('data', function (data) {
      if (firstReading) {
        firstReading = false;

        var Lines = (data.toString('utf-8').trim().split('\n'));
        for (var i = 0; i < Lines.length; i++) {
          var Line = JSONLine(Lines[i].split('|'));
          if (Line.timestamp > timestamp) {
            new mongoQLog(Line).save();
          } else if (Line.timestamp == timestamp) {
            mongoQLog.findOne(Line, function (err, qlog) {
              if (err) throw err;
              if (!qlog) new mongoQLog(Line).save();
            });
          }
        }
      } else {
        var Line = JSONLine(data.toString('utf-8').trim().split('|'));
        new mongoQLog(Line).save();
      }
    });
  });
} else
  console.log('MongoDB is disabled.');

function JSONLine (qlogData) {
  return {
    "timestamp": qlogData[0] || "",
    "uniqueid": qlogData[1] || "",
    "queue": qlogData[2] || "",
    "channel": qlogData[3] || "",
    "event": qlogData[4] || "",
    "param1": qlogData[5] || "",
    "param2": qlogData[6] || "",
    "param3": qlogData[7] || ""
  };
}

process.on('SIGINT', function () {
  if (mongoString) mongoose.disconnect();
  process.exit(0);
});
