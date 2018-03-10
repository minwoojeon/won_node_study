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

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM test_users';
    connection.query(sql, (err, results, field) => {
        console.log(results); // 배열 형태로 결과가 떨어짐
        res.render('index', {
            layout: false, // express-ejs-layouts는 기본으로 layout.ejs가 설정되어야 하는데 이를 사용하지 않을 경우
            test: results
        });
    });
});
　
module.exports = router;
