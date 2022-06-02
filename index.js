'use strict'

//SQL定義

// DB関連
const mysql = require('mysql');
const { NULL } = require('mysql/lib/protocol/constants/types');
const jsonConfig = require('./.env/config.json');
const connection = mysql.createConnection({
    host: jsonConfig.host,
    user: jsonConfig.user,
    password: jsonConfig.password,
    database: jsonConfig.database
});

connection.connect();

/*
connection.query('SELECT * FROM schedule', function (err, results, fields) {
    if (err) throw new Error('DB接続に失敗');
    console.log(results[0]);
});
*/

// オブジェクト
let lectureObj = {
    title: "sample",
    dayOfWeek: 1,
    startTime: 540,
    endTime: 645,
    taskFlg: 0
};

let lectureObj2 = {
    title: "sample2",
    dayOfWeek: 2,
    startTime: 540,
    endTime: 645,
    taskFlg: 1
};

// 曜日変換
const parseIntDOW = (dOW) => {
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
};

// 時刻変換
const parseIntTime = (time) => {
    const arr = time.split(':');
    const intArr = [];
    for (let i = 0; i < arr.length; i++) {
        intArr[i] = parseInt(arr[i]);
    }
    return intArr[0] * 60 + intArr[1];
};

// スケジュール入力
const inputSchedule = (lectureObj) => {
    const arr = [];
    for (const key in lectureObj) {
        arr.push(lectureObj[key]);
    }
    connection.query('INSERT INTO schedule (title, dayOfWeek, startTime, endTime, taskFlg) VALUES (?, ?, ?, ?, ?)',
        arr, function (err, response) {
            if (err) throw err;
            console.log(response);
        });
};

// 全削除
const deleteTable = () => {
    connection.query('TRUNCATE TABLE schedule',
        function (err, response) {
            if (err) throw err;
            console.log(response);
        });
}


// スケジュール読み込み
const loadSchdule = () => {
    connection.query('SELECT * FROM schedule',
        function (err, response) {
            if (err) throw err;
            console.log(response);
        });
};

// sampleRun

deleteTable();
loadSchdule();
inputSchedule(lectureObj);
inputSchedule(lectureObj2)
loadSchdule();

connection.end();
