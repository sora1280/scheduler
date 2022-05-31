'use strict'

import { createConnection } from 'mysql';
const connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'scheduler_db'
});

connection.connect();

connection.query('SELECT * FROM schedule', function (err, results, fields) {
    if (err) throw error;
    console.log(results[0]);
})

connection.end();