
var GrowingFile = require('growing-file');

var qlogFile = '/var/log/asterisk/queue_log';
var file = GrowingFile.open(qlogFile, { timeout: 3600000 });

file.on('data', function (data) {
  qlogLine = data.toString('utf-8').trim().split('|');
  console.log(qlogLine);
});

process.on('SIGINT', function () {
  process.exit(0);
});
