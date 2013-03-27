function QueueLog (qlogData) {
  this.qlogJSON = {
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

module.exports = QueueLog;
