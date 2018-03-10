const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt-nodejs'); // 3장에서 사용할 암호화 모듈

const connection = mysql.createConnection(require('../config/dbconfig.js'));　
connection.connect((err) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log( 'mysql login connect completed' );
});


const findUser = async (user_id, user_pwd) => {
    // id와 password가 일치하는 유저 찾는 함수, 없으면 undefined 반환
    // console.log(user_id);
    // console.log(user_pwd);
//select * from test_users where id = 'won' and pw = 1234;
    const sql = 'SELECT * FROM test_users';
//const sql = 'SELECT * FROM test_users WHERE id = ' + user_id + ' AND pw = ' + user_pwd;
    return await connection.query(sql, (err, results, field) => {
        //console.log(results); // 배열 형태로 결과가 떨어짐
        //console.log(results[0].id);
        //console.log(results[0].pw);

        let id = results[0].id
        let pw = results[0].pw
        let check = (id == user_id) & (pw == user_pwd)
        return check

        // return users.find( v => (v.user_id === user_id && v.user_pwd === user_pwd) );
        //return true
    })



}
const findUserIndex = (user_id, user_pwd) => {
    // 일치하는 유저의 index값(유니크) 반환
    // console.log(users.user_id);
    // console.log(users.user_pwd);
    //
    // return users.findIndex( v => (v.user_id === user_id && v.user_pwd === user_pwd) );
}

// module.exports = findUser, findUserIndex;
module.exports = {
  findUser,
  findUserIndex
 };
