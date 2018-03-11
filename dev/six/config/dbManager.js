const express = require('express');
const mysql = require('mysql');
const connection = mysql.createConnection(require('../config/database.js'));
const bcrypt = require('bcrypt-nodejs');
　
connection.connect((err) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log( 'mysql connect completed' );
});

exports.findUser = (user_id, user_pwd, callback) => {
    // id와 password가 일치하는 유저 찾는 함수
    // console.log("cccccc");
    // var sql = `SELECT * FROM test_users WHERE id = '${user_id}'`
    // // var sql = 'SELECT * FROM test_users WHERE id = '+user_id;
    // connection.query(sql, (err, results, field) => {
    //     console.log(results); // 배열 형태로 결과가 떨어짐
    //
    //     if(err) callback(false);
    //     if()
    //     callback(false)
    // })

    var sql = `SELECT * FROM test_users WHERE id = '${user_id}'`

    connection.query(sql, function(err, rows){
      //var hash_pwd = bcrypt.hashSync(rows[0].pw); // bcrypt는 암호화 모듈로 아래 compareSync 를 할때 첫번째 값은 비교할 일반값 두번째 값은 hash가 진행되어진 값이 들어가야한다
      //이에 처음 db 테스트 진행중일때 비밀번호 인자값을 hashSync를 진행하지 않은 값을 보내었기 때문에 당장 진행을 위해 잠시 여기서 사용 하였다.  추후 제거 예정
      // console.log(err);
      // console.log(rows);
        if (err)
            return callback(err);
        if (!rows.length) {
            return callback(null, false);
        }

//bcrypt 오류 찾기위한 부분 해결.
// console.log("if start");
// if (user_pwd == rows[0].pw){
//   console.log("cocococo");
// }else {
//   console.log(user_pwd);
//   console.log(rows[0].pw);
//   console.log("what");
// }


        if (!bcrypt.compareSync(user_pwd, rows[0].pw)){
          //console.log(1234);
          return callback(null, false); // create the loginMessage and save it to session as flashdata

        }

           // return callback(null, false); // create the loginMessage and save it to session as flashdata

        // all is well, return successful user
        return callback(null, rows[0]);
    });





    // console.log(connection.query("SELECT * FROM test_users"));
    // function(err, rows){
    //     if (err)
    //         return done(err);
    //     if (!rows.length) {
    //         return done(null, false, req.flash('loginMessage', 'No user found.'));
    //       }
    //
    //     if (!bcrypt.compareSync(user_pwd, rows[0].password))
    //         return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
    //
    //     // all is well, return successful user
    //     return done(null, rows[0]);
    // });
    // //return users.find( v => (v.user_id === user_id &&  bcrypt.compareSync(user_pwd, v.user_pwd) ) );
}
exports.insertUser = (user_id, user_pwd, user_nickname, callback) => {
    var sql = `SELECT * FROM test_users WHERE id = '${user_id}'`

    connection.query(sql, function(err, rows){
        if (err)
            return callback(err); //에러처리
        if (rows.length) {
            return callback(null, false);//이미 아이디가 있음을 처리
        }else{ // 아이디 생성 로직은 passport 로직을 따왔음
          var newUserMysql = {
                        username: user_id,
                        password: bcrypt.hashSync(user_pwd, null, null),
                        nickname: user_nickname
                    };
                    //var insertQuery = `INSERT INTO test_users ( id, pw, nick ) values ('${newUserMysql.username}','${newUserMysql.password}', '${newUserMysql.nickname}')`;
                    //console.log(insertQuery);
                    var insertQuery = "INSERT INTO test_users ( id, pw, nick ) values (?,?,?)";

                    connection.query(insertQuery,[newUserMysql.username, newUserMysql.password, newUserMysql.nickname],function (err, rows) {
                      return callback(null, rows);
                    });

                    // connection.query(insertQuery,function(err, rows) {
                    //                         //console.log(rows);
                    //                         return callback(null, rows);
                    //                     });
        }
    });
}
