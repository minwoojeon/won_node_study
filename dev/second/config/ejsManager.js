
module.exports = function(app) {
	//첫 화면
	app.get('/', (req, res) => {
	    const sess = req.session; // 세션 객체에 접근
	    res.render('index', {
	        nickname: sess.user_uid+1 ? users[sess.user_uid]['user_nickname'] : ''
	    });
	});



	app.get('/login', (req, res) => {
	    res.render('login'); // login.ejs 랜더링
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
	    if( !findUser(body.user_id, body.user_pwd) ) {
	        // 아이디도 중복안되게 분기 해야하나 지금은 넘어간다
	        users.push({
	            user_id: body.user_id,
	            user_pwd: body.user_pwd,
	            user_nickname: body.user_nickname
	        });
	        res.redirect('/login');
	    } else {
	        res.send('이미 존재함');
	    }
	});


	app.post('/login', (req, res) => {
	    const body = req.body; // body-parser 사용
	    console.log(req)
	    if( findUser( body.user_id, body.user_pwd ) ) {
	    // 해당유저가 존재한다면
	        req.session.user_uid = findUserIndex( body.user_id, body.user_pwd ); //유니크한 값 유저 색인 값 저장
	        res.redirect('/');
	    } else {
	        res.send('유효하지 않습니다.');
	    }
	});
