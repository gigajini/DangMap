import { useEffect, useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";  // 기본 내보내기가 아닌 이름 있는 내보내기로 변경

export const useProvideAuth = () => {
    const [loginUser, setLoginUser] = useState({
        id: localStorage.getItem("userId"),
        token: localStorage.getItem("token"),
        nickname: "",
        email: "",
        loginType: localStorage.getItem("loginType") || "local", // 기본값은 "local"
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setLoginUser((prevUser) => ({
                    ...prevUser,
                    nickname: decodedToken.nickname,
                    email: decodedToken.email,
                }));
            } catch (err) {
                console.error(err);
            }
        }
    }, []);

    useEffect(() => {
        const cookies = new Cookies();
        const kakaoToken = cookies.get("accessToken");
        if (kakaoToken) {
            try {
                const decodedKakaoToken = jwtDecode(kakaoToken);
                setLoginUser((prevUser) => ({
                    ...prevUser,
                    nickname: decodedKakaoToken.nickname,
                    loginType: 'kakao' // 로그인 유형을 "kakao"로 설정
                }));
                localStorage.setItem("loginType", "kakao");
            } catch (err) {
                console.error(err);
            }
        }
    }, []);

    const kakaoLogin = () => {
        const cookies = new Cookies();

        if (cookies.get("accessToken") && cookies.get("userId")) {
            localStorage.setItem("userId", cookies.get("userId"));
            localStorage.setItem("token", cookies.get("accessToken"));
            localStorage.setItem("loginType", "kakao");

            setLoginUser({
                id: cookies.get("userId"),
                token: cookies.get("accessToken"),
                nickname: "",
                loginType: "kakao", // 로그인 유형을 "kakao"로 설정
            });
        }
        cookies.remove("userId");
        cookies.remove("accessToken");
    };

    const login = async (data, successCallback, failCallback) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, data);
            if (response.data.code === 200) {
                const id = response.data.userId;
                const token = response.data.accessToken;

                localStorage.setItem("userId", id);
                localStorage.setItem("token", token);
                localStorage.setItem("loginType", "local"); // 로그인 유형을 "local"로 설정

                const decodedToken = jwtDecode(token);

                setLoginUser({
                    id: id,
                    token,
                    nickname: decodedToken.nickname,
                    email: decodedToken.email,
                    loginType: "local" // 로그인 유형을 "local"로 설정
                });
                successCallback();
            }
        } catch (error) {
            console.error(error);
            failCallback();
        }
    };

    const refreshToken = (newToken) => {
        setLoginUser((prevUser) => ({
            ...prevUser,
            token: newToken
        }));
    };

    const cookies = new Cookies();
    const logout = (callback) => {
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        localStorage.removeItem("loginType");
        cookies.remove("userId");
        cookies.remove("accessToken");
        setLoginUser(null);
        callback();
    };

    return {
        loginUser,
        login,
        logout,
        kakaoLogin,
        refreshToken
    };
};
