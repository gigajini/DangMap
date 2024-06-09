const passport = require("passport")
const { User } = require("../models")
const local = require("./local");
const jwt = require("./jwt");
const kakao = require("./kakao");

module.exports = () => {
    local();
    jwt();
    kakao();


    // 전략 성공 시 호출
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        User.findOne({
            where: { id },
        })
        .then(user => {
            done(null, user);
        })
        .catch(err => done(err));
    })
}
