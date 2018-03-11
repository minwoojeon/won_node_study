const bcrypt = require('bcrypt-nodejs');

const Check = require('../config/dbManager.js');

module.exports = function(app) {
app.get('/', (req, res) => {
    const sess = req.session; // 세션 객체에 접근
    res.render('index', {
      // console.log(sess);
        nickname: sess.user_uid+1 ? sess.user_uid : ''
    });
    console.log(sess);
});




// const users = [ //db 연동 안하고 사용
//     {
//         user_id: 'won',
//         user_nickname: '정원',
//         user_pwd: '123456'
//     },
//     {
//         user_id: 'binoo',
//         user_nickname: '민우',
//         user_pwd: '1q2w3e4r'
//     }
// ]
// const findUser = (user_id, user_pwd) => {
//     // id와 password가 일치하는 유저 찾는 함수, 없으면 undefined 반환
//     return users.find( v => (v.user_id === user_id &&  bcrypt.compareSync(user_pwd, v.user_pwd) ) );
// }
// const findUserIndex = (user_id, user_pwd) => {
//     // 일치하는 유저의 index값(유니크) 반환
//     return users.findIndex( v => (v.user_id === user_id && bcrypt.compareSync(user_pwd, v.user_pwd)) );
// }
app.get('/login', (req, res) => {
    res.render('login'); // login.ejs 랜더링
});
app.post('/login', (req, res) => {
    const body = req.body; // body-parser 사용

    Check.findUser( body.user_id, body.user_pwd, function (err, auth){
      if(auth){
        req.session.user_uid = auth.nick;//차후 유저의 닉네임이 아닌 secret code(예를 들어 ip값 혹은 mac address)를 넘겨 주어 해당하는 값이 없으면 세션이 유지 안되도록 조정예정
        // 세션유지시간도 차후 추가 예정
        res.redirect('/')
      }else {
        res.send('유효하지 않습니다.')
      }
      //auth ?  res.redirect('/') : res.send('유효하지 않습니다.')

    })


});
app.get('/logout', (req, res) => {
    delete req.session.user_uid;
    res.redirect('/');
});


app.get('/join', (req, res) => {
    res.render('join');
});
app.post('/join', (req, res) => {
    const body = req.body;
    Check.insertUser( body.user_id, body.user_pwd, body.user_nickname, function (err, auth){
      if(auth){
        //req.session.user_uid = auth.nick;//차후 유저의 닉네임이 아닌 secret code(예를 들어 ip값 혹은 mac address)를 넘겨 주어 해당하는 값이 없으면 세션이 유지 안되도록 조정예정
        // 세션유지시간도 차후 추가 예정
        res.redirect('/login')
      }else {
        res.send('생성불가')
      }
      //auth ?  res.redirect('/') : res.send('유효하지 않습니다.')

    })
    // if( !findUser(body.user_id, body.user_pwd) ) {
    //     // 아이디도 중복안되게 분기 해야함
    //     users.push({
    //         user_id: body.user_id,
    //         user_pwd: body.user_pwd,
    //         user_nickname: body.user_nickname
    //     });
    //     res.redirect('/login');
    // } else {
    //     res.send('이미 존재함');
    // }
});
}
