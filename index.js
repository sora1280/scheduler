'use strict'

// DB関連
const mysql = require('mysql');
const jsonConfig = require('./.env/config.json');
const connection = mysql.createConnection({
    host: jsonConfig.host,
    user: jsonConfig.user,
    password: jsonConfig.password,
    database: jsonConfig.database
});

connection.connect();

connection.query('SELECT * FROM schedule', function (err, results, fields) {
    if (err) throw new Error('DB接続に問題があります');
    console.log(results[0]);
})

connection.end();

// オブジェクト
let lectureObj = {
    id: 0,
    name: 'sample',
    dayOfWeek: 'monday',
    startTime: '9:00',
    endTime: '10:45',
};


let loadSchdule = () => {
    let scheduleList = [];
    scheduleList.push(lectureObj);
    return scheduleList;
}

let showSchedule = () => {
    let arr = loadSchdule();
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].dayOfWeek === 'monday') {
            console.log(arr[i].name);
        }
    }
}

showSchedule();
