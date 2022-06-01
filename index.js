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

// 曜日変換
let parseIntDOW = (dOW) => {
    switch (dOW) {
        case 'Monday':
            return 1;
        case 'Tuesday':
            return 2;
        case 'Wednesday':
            return 3;
        case 'Thursday':
            return 4;
        case 'Friday':
            return 5;
        case 'Saturday':
            return 6;
        case 'Sunday':
            return 7;
        default:
            return 0;
    }
}

// 時刻変換
let parseIntTime = (time) => {
    const arr = time.split(':');
    const intArr = [];
    for (let i = 0; i < arr.length; i++) {
        intArr[i] = parseInt(arr[i]);
    }
    return intArr[0] * 60 + intArr[1];
}


// sample
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
