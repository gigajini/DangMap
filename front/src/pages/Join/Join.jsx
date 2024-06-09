import { Button, InputLabel, TextField, Box, FormControl, OutlinedInput, InputAdornment, IconButton, Stack, Typography, } from '@mui/material/'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const Join = () => {

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()

    //비밀번호 일치 검증
    const password = watch("password", "");
    const passwordCheck = watch("passwordCheck", "");

    const onSubmit = async(data) => {
        const {email, username, password} = data;
        try{            
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/join`,{
                email,
                username, 
                password
            })

            console.log(response);
            if (response.data.code === 200) {
                Swal.fire({
                    title: "축하합니다!",
                    text: response.data.message,
                    icon: "success"
                });
                navigate('/login');
            } else {
                throw new Error(response.data.message);
            }
        }catch(err){
            console.log(username)
            Swal.fire({
                title: "에러 발생",
                text: err.message,
                icon: "error"
            });
        }
    }

    const contStyle = {
        width:'100%', 
        height:'calc(100vh - 240px)', 
        display:'flex',
        justifyContent:'center', 
        alignItems:'center'
    }

    const boxStyle = {
        width:'100%',
        height:'520px',
        maxWidth:'400px',
        p: 4,
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 0 12px rgba(0, 0, 0, 0.271)",
        textAlign: "center"
    }


    return ( 
        <Box component="section" sx={contStyle}>
            <Box sx={boxStyle}>
                <Typography variant="h4" my={3} sx={{fontWeight:'bold'}}>회원가입</Typography>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit(onSubmit)}
                    sx = {{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width : '100%',
                        maxWidth : '460px',
                        gap: '16px'
                    }}
                >
                    <TextField
                        error={errors.email ? true : false}
                        helperText={errors.email && errors.email.message}
                        label="이메일"
                        variant="outlined"
                        sx={{ display: 'block' }}
                        fullWidth
                        autoFocus
                        {...register("email", {
                            required: "이메일은 필수 입력 항목입니다.",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "올바른 이메일 형식을 입력하세요."
                            }
                        })}
                    />
                    {/* nickname */}
                    <TextField
                        error={errors.username ? true : false}
                        helperText={errors.username && errors.username.message}
                        label="이름"
                        variant="outlined"
                        fullWidth
                        autoComplete="username"
                        sx={{ display: 'block' }}
                        {...register("username", { 
                            required: "이름은 필수 입력 항목입니다."
                        })}
                    />
                    {/* password */}
                    <FormControl fullWidth sx={{ display: 'block' }} variant="outlined">
                        <TextField
                            error={errors.password ? true : false}
                            helperText={errors.password && errors.password.message}
                            id="password"
                            fullWidth
                            type='password'
                            autoComplete="new-password"
                            label="비밀번호"
                            {...register("password", {
                                required: "비밀번호는 필수 입력 항목입니다.",
                                minLength: {
                                    value: 8,
                                    message: "비밀번호는 최소 8자 이상이어야 합니다."
                                },
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                    message: "비밀번호는 하나의 영어 알파벳과 숫자를 포함해야 합니다."
                                }
                            })}
                        />
                    </FormControl>
                    {/* password check */}
                    <FormControl fullWidth sx={{display: 'block' }} variant="outlined">
                        <TextField
                            id="PasswordCheck"
                            fullWidth
                            autoComplete="new-password"
                            error={errors.passwordCheck ? true : false}
                            helperText={errors.passwordCheck && errors.passwordCheck.message}
                            type='password'
                            label="비밀번호 확인"
                            {...register("passwordCheck", { 
                                required: true,
                                validate: value => value === password || "비밀번호가 일치하지 않습니다."
                            })}
                        />
                    </FormControl>
                    {/* button */}
                    <Box mt={2} sx={{width : '100%', display: 'flex', gap:'8px', flexDirection: {sm : 'row', xs: 'column-reverse'}}} >
                        <Button variant="outlined" sx={{width: '50%'}} onClick={(e) => {
                            e.preventDefault()
                            reset();
                        }} >초기화</Button>
                        <Button type='suibmit' variant="contained" size="large" sx={{width: '50%'}} >회원가입</Button>
                    </Box>
                    
                </Box>
            </Box>
        </Box> 
    );
}
 
export default Join;