module.exports = function () {
  var config = require('./mongo.json');

  if (config.enabled) {
    var string = "mongodb://";

    if (config.user) {
      string += config.user;
      if (config.pass) string += ':' + config.pass;
      string += '@';
    }

    string += config.host;
    if (config.port) string += ':' + config.port;
    string += '/' + config.name;

    return string;
  } else {
    return false;
  }
}
