//작성하기 버튼을 클릭할 시 리뷰를 작성할 수 있는 화면 컴포넌트
import { useTheme } from "@emotion/react";
import { Button, FormControl, Grid, TextField, Typography, useMediaQuery } from "@mui/material";
import Rating from "@mui/material/Rating";
import { useCallback, useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "./../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import SearchPopup from "./SearchPopup";
import { reviewApi } from "../../../api/services/review";

const ReviewPost = ({ open, handleClose }) => {
    const { loginUser, logout } = useAuth();
    const [station, setStation] = useState("");
    const [starScore, setStarScore] = useState(0);
    const [content, setContent] = useState("");
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        const UserId = loginUser?.id;
        e.preventDefault();
        try {
            if (UserId && station) {
                const data= {
                    station,
                    starScore,
                    content,
                    UserId,
                }
                // const token = loginUser.token;
                const res = await reviewApi.reviewPost(data, token);
                console.log(res);
                if (res.data.code === 200) {
                    Swal.fire({
                        title: `작성 완료하였습니다.`,
                        icon: "success",
                        confirmButtonText: "확인",
                        confirmButtonColor: theme.palette.primary.main,
                    }).then(() => navigate("/community"));
                    setStation("");
                    setStarScore(0);
                    setContent("");
                }
            } else {
                Swal.fire({
                    title: `이용후기를 작성해 주세요`,
                    icon: "warning",
                    confirmButtonText: "확인",
                    confirmButtonColor: theme.palette.error.main,
                });
            }
        } catch (err) {
            if(err.response.data.code == 500) {
                logout(()=>{
                  console.error(err);
                  navigate('/')
                })
              }
        }
    };

    //별점
    const writestarScore = useCallback((event, newValue) => {
        setStarScore(newValue);
    }, []);

    const writeContent = useCallback((e) => {
        setContent(e.target.value);
    }, []);

    return (
        <>
            <Typography variant="h5" sx={{ margin: "30px" }}>
                충전소 이용 후기 작성
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid
                    container
                    direction="column"
                    justifyContent="flex-start" 
                    sx={{ margin: "0 auto", width: "90%" }}
                >
                    <FormControl sx={{ mb: 2 }}>
                        {/*이용 충전소를 검색하여 선택하는 부분*/}
                        <Typography>충전소:</Typography>
                        <SearchPopup open={open} handleClose={handleClose} station={station} setStation={setStation} />
                    </FormControl>
                    <FormControl
                        sx={{
                            mb: 2,
                            display: "flex",
                            flexDirection: isDesktop ? "row" : "column",
                            alignItems: isDesktop ? "center" : "flex-start",
                        }}
                    >
                        <Typography sx={{ marginRight: 7, whiteSpace: "nowrap" }}>별 점 {isDesktop && ":"}</Typography>
                        <Rating name="starscore" value={starScore} onChange={writestarScore} size="large" />
                        <TextField
                            name="starscore"
                            value={starScore}
                            onChange={(e) => setStarScore(e.target.value)}
                            sx={{ visibility: "hidden" }}
                        />
                    </FormControl>
                    <FormControl sx={{ mb: 2 }}>
                        <Typography>후기 내용:</Typography>
                        <TextField
                            name="content"
                            value={content}
                            onChange={writeContent}
                            multiline
                            rows={9}
                            fullWidth
                        />
                    </FormControl>
                    <Button type="submit" variant="contained" size="large" sx={{ width: "100%", mt: 2 }}>
                        작성하기
                    </Button>
                </Grid>
            </form>
        </>
    );
};

export default ReviewPost;
