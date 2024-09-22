const mySQL = require("mysql");
const express = require("express");

const apk = express();

apk.use(express.json());

const Connection = mySQL.createConnection({
  host : '',
  user : 'root',
  password : '',
  database : 'express'
});

Connection.connect((err)=> {
    if(!err) {
        console.log("MySQL Connected");
    } else {
        console.log ("database belum bisa tersambung")        
    }
})

module.exports = Connection
