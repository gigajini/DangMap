const bcrypt = require("bcrypt");
const { User } = require("../models");
const passport = require("passport");
const jwt = require("jsonwebtoken");

exports.createToken = async (req, res, next) => {
    try {
        // passport.authenticate('local') 미들웨어 실행
        passport.authenticate("local", { session: false }, (err, user, info) => {
            if (err) {
                console.error(err);
                return next(err);
            } else if (!user) {
                throw new Error(info.message);
            }
            // 정상 로그인
            return req.login(user, (err) => {
                const accessToken = jwt.sign(
                    { id: user.id, nickname: user.dataValues.username, email: user.dataValues.email },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.ASSESS_TOKEN_EXPIRE,
                        issuer: "dang_project",
                        subject: "accessToken",
                    }
                );

                const refreshToken = jwt.sign(
                    { id: user.id, nickname: user.dataValues.username, email: user.dataValues.email },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
                        issuer: "dang_project",
                        subject: "refreshToken",
                    }
                );
                User.update({ refreshToken }, { where: { id: user.id } });
                if (err) {
                    console.error(err);
                    return next(err);
                }

                res.json({
                    code: 200,
                    message: "토큰이 발급되었습니다.",
                    accessToken,
                    userId: user.id,
                });
            });
        })(req, res, next);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.join = async (req, res, next) => {
    console.log(req.body);
    const { email, username, password } = req.body;
    try {
        const exUser = await User.findOne({ where: { email } });
        if (exUser) {
            throw new Error("이미 가입된 이메일입니다.");
        }
        const hash = await bcrypt.hash(password, 10);
        await User.create({
            email,
            username,
            password: hash,
        });
        res.json({
            code: 200,
            message: "회원가입이 완료되었습니다.",
        });
    } catch (err) {
        console.error(err);
        return next(err);
    }
};

exports.refreshToken = async (req, res, next) => {
    try {
        const { accessToken } = req.body;
        console.log(accessToken);
        const accessResult = jwt.decode(accessToken, process.env.JWT_SECRET);
        const user = await User.findOne({ where: { id: accessResult.id } });
        const refreshResult = jwt.verify(user.refreshToken, process.env.JWT_SECRET);
        if (accessResult.id !== refreshResult.id) {
            throw new Error("토큰이 일치하지 않습니다.");
        }

        const newAccessToken = jwt.sign(
            { id: accessResult.id, nickname: accessResult.nickname, email: accessResult.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.ASSESS_TOKEN_EXPIRE, issuer: "mini_project", subject: "accessToken" }
        );

        res.json({
            code: 200,
            message: "새로운 토큰이 발급되었습니다.",
            accessToken: newAccessToken,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.kakaoLogin = async (req, res, next) => {
    try {
        passport.authenticate("kakao", { session: false }, (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                throw new Error(info.message);
            }
            return req.login(user, (err) => {
                const accessToken = jwt.sign(
                    { id: user.id, nickname: user.dataValues.username },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "1h",
                        issuer: "dang_project",
                        subject: "accessToken",
                    }
                );

                const refreshToken = jwt.sign(
                    { id: user.id, nickname: user.dataValues.username },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "7d",
                        issuer: "dang_project",
                        subject: "refreshToken",
                    }
                );

                User.update({ refreshToken }, { where: { id: user.id } });
                if (err) {
                    console.error(err);
                    return next(err);
                }

                res.cookie("userId", user.id, {
                    httpOnly: false,
                    secure: false,
                });

                res.cookie("accessToken", accessToken, {
                    httpOnly: false,
                    secure: false,
                });
                res.status(302).redirect(process.env.CLIENT_URL);
            });
        })(req, res, next);
    } catch (err) {
        return next(err);
    }
};
