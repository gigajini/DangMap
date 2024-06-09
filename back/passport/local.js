const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: false
    }, async (email, password, done) => {
        try {
            // 특정 이메일을 가진 유저를 조회
            const exUser = await User.findOne({ where : { email }});
            // 특정 이메일을 가진 유저가 이미 존재한다면
            if(exUser) {
                console.log(exUser, 1111111)
                // 현재 입력한 비밀번호와 암호화된 가입된 비밀번호를 비교
                const result = await bcrypt.compare(password, exUser.password);
                // 결과가 true라면 exUser를 넘김
                if (result) {
                    done(null, exUser);
                // 결과가 일치하지않다면 메세지를 넘김
                } else {
                    done(null, false, { message: '비밀번호가 일치하지 않습니다.'}) 
                }
            // 애초에 이메일을 가진 유저가 존재하지않는다면 역시 메세지를 넘김
            } else {
                console.log(exUser, 222222)
                done(null, false, { message: '가입되지 않은 회원입니다'})
            }
        } catch (err) {
            console.error(err);
            done(err)
        }
    }
    ))
}