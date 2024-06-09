//회원 정보 수정 및 탈퇴
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { authApi } from "../../../api/services/auth";
import { useAuth } from './../../../hooks/useAuth';

const ModifyInfo = () => {
    const { loginUser, logout } = useAuth();
    const email = loginUser.email;
    const isKakaoLogin = loginUser.loginType === 'kakao'; // 카카오 로그인인지 확인
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const modify = async(e) => {
        try {
            const data = { username: e.username, password: e.password };
            const res = await authApi.authPut(data, token);
            if (res.data.code === 200) {
                Swal.fire({
                    title: "축하합니다!",
                    text: "수정이 완료되었습니다.",
                    icon: "success"
                });
                navigate('/');
            } 
        } catch (err) {
            if(err.response.data.code === 500) {
                logout(() => {
                    console.error(err);
                    navigate('/');
                });
            }

            Swal.fire({
                title: "에러 발생",
                text: err.message,
                icon: "error"
            });
        }
    };

    const deleteButton = async() => {
        const res = await authApi.authDel(token);
        try {
            if(res.data.code === 200) {
                logout(() => {
                    Swal.fire({
                        title: "삭제되었습니다.",
                        text: "삭제되었습니다.",
                        icon: "success"
                    });
                    navigate('/');
                });
            }
        } catch(err) {
            console.error(err);
        }
    };

    return ( 
        <>
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(modify)}
                sx={{ width: "400px", padding: "40px", backgroundColor: "white", borderRadius: "8px", 
                boxShadow: "0 0 12px rgba(0,0,0,0.271)", textAlign: "center", marginBottom: 3,
                '& .MuiTextField-root': { marginTop: 1 }}}
            >
                <TextField disabled variant="outlined" label="이메일" defaultValue={email}
                    sx={{ display: 'block' }} fullWidth
                />
                <TextField variant="outlined" label="이름" autoComplete="username"
                    error={errors.username ? true : false}
                    helperText={errors.username && errors.username.message}
                    sx={{ display: 'block' }} fullWidth 
                    {...register("username", { value: loginUser.nickname, required: "이름을 입력해주세요." })}
                    disabled={isKakaoLogin} // 카카오 로그인 시 비활성화
                />
                <TextField variant="outlined" label="비밀번호" type="password"
                    error={errors.password ? true : false}
                    helperText={errors.password && errors.password.message}
                    sx={{ display: 'block' }} fullWidth
                    {...register("password", {
                        required: "비밀번호를 입력해주세요.",
                        minLength: {
                            value: 8,
                            message: "비밀번호는 최소 8자 이상이어야 합니다."
                        },
                        pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                            message: "비밀번호는 하나의 영어 알파벳과 숫자를 포함해야 합니다."
                        }
                    })}
                    disabled={isKakaoLogin} // 카카오 로그인 시 비활성화
                />
                <TextField
                    fullWidth
                    error={errors.passwordCheck ? true : false}
                    helperText={errors.passwordCheck && errors.passwordCheck.message}
                    type='password'
                    label="비밀번호 확인"
                    {...register("passwordCheck", { 
                        required: "비밀번호 확인을 입력해주세요.",
                        validate: value => value === getValues("password") || "비밀번호가 일치하지 않습니다."
                    })}
                    disabled={isKakaoLogin} // 카카오 로그인 시 비활성화
                />
                <Button type="submit" variant="contained" size="large" sx={{ marginTop: 1 }} fullWidth disabled={isKakaoLogin}>
                    수정하기
                </Button>

                <Box sx={{ mt: 3 }}>
                    <Typography variant="h6">회원 탈퇴</Typography>
                    <Typography variant="subtitle1">탈퇴 약정</Typography>
                    <Button type="button" variant="contained" size="large" fullWidth onClick={deleteButton}>
                        탈퇴하기
                    </Button>
                </Box>
            </Box>
        </>
    );
}

export default ModifyInfo;
