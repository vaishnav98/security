var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var databaseConfig = require('./config/database');
var Attendance = require('./models/attendance');

var pushAttendance = require('./routes/device/pushAttendance');
var getAccessByHash = require('./routes/device/getAccessByHash')

mongoose.connect(databaseConfig.address);

/* app.use(express.json())
 */
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));



CronJob = require('cron').CronJob;
console.log('Before job instantiation');
job = new CronJob('00 00 00 * * *', function () {
    d = new Date();
    console.log('Cron :: onTick:', d);
    Attendance.populateEmploys(function (err, doc) {
        if (err) console.log(err);
    });
});
console.log('After job instantiation');
job.start();


app.use('/device/pushAttendance', pushAttendance);
app.use('/device/getAccessByHash', getAccessByHash);




app.listen(1234);