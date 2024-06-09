import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import logo from "../../assets/logo.png";
import kakaoLoginImg from "../../assets/kakao_login_large_wide.png";
import { Box, Typography } from "@mui/material";

const RedOutlinedInput = styled(OutlinedInput)(({ theme, error }) => ({
    borderColor: error ? "red" : "inherit",
    "& fieldset": {
        borderColor: error ? "red" : "inherit",
    },
    "& input": {
        padding: "16px 14px",
    },
}));

const Login = () => {
    const authData = useAuth();
    const navigate = useNavigate();
    const { login } = authData;
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [loginError, setLoginError] = useState("");

    const onSubmit = async (data) => {
        if (!data.email || !data.password) {
            return;
        }

        await login(
            data,
            () => {
                setLoginError("");
                navigate("/");
            },
            () => setLoginError("아이디 또는 비밀번호가 잘못되었습니다.")
        );
        reset();
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "calc(100vh - 70px)",
                marginTop: "-70px", 
            }}
        >
            <Box
                sx={{
                    width: "400px",
                    padding: "40px",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 0 12px rgba(0, 0, 0, 0.341)",
                    textAlign: "center",
                }}
            >
                <img src={logo} alt="Logo" style={{ width: "80px", marginBottom: "24px" }} />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl sx={{ width: "100%", mb: 2 }} error={Boolean(errors.email) || Boolean(loginError)}>
                        <InputLabel htmlFor="email">아이디</InputLabel>
                        <RedOutlinedInput
                            id="email"
                            placeholder="아이디를 입력하세요"
                            type="text"
                            variant="outlined"
                            {...register("email", { required: "아이디는 필수값입니다." })}
                            label="아이디"
                            error={Boolean(errors.email) || Boolean(loginError)}
                        />
                        {errors.email && <span style={{ color: "red" }}>{errors.email.message}</span>}
                    </FormControl>
                    <FormControl sx={{ width: "100%", mb: 2 }} error={Boolean(errors.password) || Boolean(loginError)}>
                        <InputLabel htmlFor="password">비밀번호</InputLabel>
                        <RedOutlinedInput
                            id="password"
                            placeholder="비밀번호를 입력하세요"
                            type="password"
                            variant="outlined"
                            {...register("password", { required: "비밀번호는 필수값입니다." })}
                            label="비밀번호"
                            error={Boolean(errors.password) || Boolean(loginError)}
                        />
                        {errors.password && <span style={{ color: "red" }}>{errors.password.message}</span>}
                    </FormControl>
                    {loginError && !errors.email && !errors.password && (
                        <span style={{ display: "block", color: "red", fontSize: "0.8rem", marginBottom: "16px" }}>
                            {loginError}
                        </span>
                    )}
                    <Button variant="contained" type="submit" sx={{ display: "block", width: "100%", mt: 2 }}>
                        로그인
                    </Button>
                    <Link to={`${process.env.REACT_APP_API_URL}/auth/kakao`}>
                        <img src={kakaoLoginImg} alt="카카오 로그인" style={{ width: "100%", marginTop: "16px" }} />
                    </Link>
                </form>
                <Typography sx={{ marginTop: "16px" }}>
                    당충전 회원이 아니신가요?{" "}
                    <Link to="/join" style={{ fontWeight: "bold" }}>
                        회원가입
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default Login;
