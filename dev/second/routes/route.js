const express = require('express');
const router = express.Router();
　
const mysql = require('mysql');
const connection = mysql.createConnection(require('../config/dbconfig.js'));
　
connection.connect((err) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log( 'mysql connect completed' );
});

module.exports = router;
