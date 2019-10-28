const mysql = require('mysql');
const path = require('path');
const nconf = require('nconf');
const dir = __dirname;
nconf.file('conn', path.join(dir, 'connection.config.json'));
var conn = mysql.createConnection({
    host: nconf.get('host'),
    user: nconf.get('user'),
    password: nconf.get('password'),
    port: nconf.get('port'),
    database: nconf.get('database'),
});
console.log(nconf.get('host'));
conn.connect(function(err) {
    if (err) throw err;
    console.log("Database is connected!");
});

module.exports=conn;
