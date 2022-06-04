const mysql = require('mysql2');
const db_setting = {
    host: 'localhost',
    user: 'dbuser',
    password: 'pass',
    database: 'testdb'
};

let mycon = null;

(async() =&amp;amp;gt; {
    try {
        mycon = await mysql.createConnection(db_setting);
        mycon.connect(function(err){
            if(err){
                console.log(err);
            }else{
                console.log("success");
            }
        }
    } catch(e) {
        console.log(e);
    }

    if( mycon ){
        mycon.end();
    }
})();