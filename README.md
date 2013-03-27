qlog2db
=======

This script gather data from queue_log file and save it into database following this structure:

Fields in queue_log
-------------------

  * epoch timestamp of listed action
  * uniqueid of call
  * queue name
  * bridged channel
  * event
  * event parameter 1
  * event parameter 2
  * event parameter 3

Name for database fields
------------------------

 * timestamp
 * uniqueid
 * queue
 * channel
 * event
 * param1
 * param2
 * param3

### Notes
> http://www.voip-info.org/wiki/view/Asterisk+log+queue_log
>
> *Some DataBases require an aditional field for row id.*

Database support
----------------

For additional database engine support:

 * Create directory for database files and scripts in principal directory.
 * Go to the database directory.
 * Create database.json file with entries for database connection.
 * Into database.json file add a field called "enabled" with boolean value.
 * Implement in main.js script.
