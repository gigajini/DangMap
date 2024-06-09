import { Button, FormControl, Grid, OutlinedInput, Paper, TextField, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import Swal from "sweetalert2";
import { communityApi } from "../../../api/services/community";
import SearchPopup from "../Review/SearchPopup";

const ReportDriver = ({ isDesktop, theme, getReports, loginUser }) => {
    const [carNum, setCarNum] = useState("");
    const [station, setStation] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        const UserId = loginUser?.id;
        const token = localStorage.getItem("token");
        e.preventDefault();
        try {
            if (carNum && station && content) {
                const res = await communityApi.postReport({ carNum, station, content, UserId }, token);
                if (res.data.code === 200) {
                    Swal.fire({
                        title: `신고 되었습니다`,
                        icon: "success",
                        confirmButtonText: "확인",
                        confirmButtonColor: theme.palette.primary.main,
                    });
                    setCarNum("");
                    setStation("");
                    setContent("");
                    getReports();
                }
            } else {
                Swal.fire({
                    title: `내용을 입력해주세요`,
                    icon: "warning",
                    confirmButtonText: "확인",
                    confirmButtonColor: theme.palette.error.main,
                });
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleCarNumChange = useCallback((e) => {
        setCarNum(e.target.value);
    }, []);

    const handleContentChange = useCallback((e) => {
        setContent(e.target.value);
    }, []);

    return (
        <>
            <Grid
                sx={{
                    width: isDesktop ? "40%" : "100%",
                    minWidth: "400px",
                    marginRight: isDesktop ? "20px" : 0,
                    marginBottom: isDesktop ? 0 : "20px",
                }}
            >
                <Typography variant="h5" sx={{ marginBottom: "20px", fontWeight: "bold" }}>
                    비매너 차량 신고
                </Typography>
                <Paper elevation="6" sx={{ paddingTop: 2, height: "660px" }}>
                    <form onSubmit={handleSubmit}>
                        <Grid
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <FormControl
                                sx={{
                                    mb: 2,
                                    width: isDesktop ? "350px" : "80%",
                                }}
                            >
                                <Typography sx={{ mb: 1 }}>차 번호</Typography>
                                <OutlinedInput name="carNum" value={carNum} onChange={handleCarNumChange} />
                            </FormControl>
                            <FormControl
                                sx={{
                                    mb: 2,
                                    width: isDesktop ? "350px" : "80%",
                                }}
                            >
                                <Typography sx={{ mb: 1 }}>충전소</Typography>

                                <Grid>
                                    <SearchPopup
                                        station={station}
                                        setStation={setStation}
                                        buttonWidth="100%"
                                        buttonHeight="56px"
                                    />
                                </Grid>
                            </FormControl>
                            <FormControl
                                sx={{
                                    mb: 2,
                                    width: isDesktop ? "350px" : "80%",
                                }}
                            >
                                <Typography sx={{ mb: 1, whiteSpace: "nowrap" }}>신고 내용</Typography>
                                <TextField
                                    name="content"
                                    value={content}
                                    onChange={handleContentChange}
                                    multiline
                                    rows={13}
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    width: "75%",
                                    height: "40px",
                                }}
                            >
                                신고
                            </Button>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </>
    );
};

export default ReportDriver;
