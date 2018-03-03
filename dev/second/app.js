app.use(express.cookieParser());
app.use(express.session({
  key: ‘sid’, // 세션키
  secret: ‘secret’, // 비밀키
  cookie: {
    maxAge: 1000 * 60 * 60 // 쿠키 유효기간 1시간
  }
}));

function (req, res) {
  req.session.user_id = 1234, // 아이디
  req.session.name = ‘chris’ // 이름
}
exports.logout = function (req, res) {
  req.session.destory();  // 세션 삭제
  res.clearCookie(‘sid’); // 세션 쿠키 삭제
};
