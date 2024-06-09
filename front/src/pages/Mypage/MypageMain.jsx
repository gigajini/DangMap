import { Box, Button, Grid, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import Mypage from "./components/Mypage";
import ModifyInfo from "./components/ModifyInfo";
import PageHeader from "../../components/layouts/PageHeader";
import { useAuth } from "../../hooks/useAuth";

const Community = () => {
    const [activeButton, setActiveButton] = useState("mycar");
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.up("md"));
    return (
        <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <PageHeader title="마이페이지" desc="내 차량 정보 및 개인정보를 확인하고 수정할 수 있습니다." />
            <Box sx={{ marginBottom: "10px", display: "flex", width: "100%", marginBottom: "50px" }}>
                <Button
                    variant="contained"
                    sx={{
                        width: "50%",
                        height: "46px",
                        backgroundColor: activeButton === "mycar" ? "primary.main" : "grey.100",
                        color: activeButton === "mycar" ? "white" : "grey.500",
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                    }}
                    onClick={() => {
                        setActiveButton("mycar");
                    }}
                >
                    내 차량 정보
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        width: "50%",
                        height: "46px",
                        backgroundColor: activeButton === "myinfo" ? "primary.main" : "grey.100",
                        color: activeButton === "myinfo" ? "white" : "grey.500",
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                    }}
                    onClick={() => {
                        setActiveButton("myinfo");
                    }}
                >
                    개인정보
                </Button>
            </Box>
            {activeButton === "mycar" ? (
                //이 부분에 추가해주시면 됩니다!
                <Mypage />
            ) : (
                <ModifyInfo />
            )}
        </Grid>
    );
};

export default Community;
