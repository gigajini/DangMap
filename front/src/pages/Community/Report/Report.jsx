import { useTheme } from "@emotion/react";
import { Grid, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import ReportDriver from "./ReportDriver";
import MyReport from "./MyReport";
import { useAuth } from "../../../hooks/useAuth";
import { communityApi } from "../../../api/services/community";
import { useNavigate } from "react-router-dom";

const Report = () => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const { loginUser, logout, kakaoLogin } = useAuth();
    const navigate = useNavigate();
    const [reports, setReports] = useState([]);

    const getReports = async () => {
        try {
            const userId = loginUser?.id;
            const token = localStorage.getItem("token");

            const res = await communityApi.getReport(userId, token);
            if (res.data.code === 200) {
                setReports(res.data.payload);
            }
        } catch (err) {
            if (err.response.data.code === 500) {
                logout(() => {
                    console.error(err);
                    navigate("/");
                });
            }
        }
    };

    useEffect(() => {
        kakaoLogin();
    }, [loginUser]);

    useEffect(() => {
        getReports();
    }, []);

    return (
        <Grid
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: isDesktop ? "none" : "center",
                flexDirection: isDesktop ? "row" : "column",
                width: "100%",
                minHeight: "750px",
            }}
        >
            <ReportDriver isDesktop={isDesktop} theme={theme} getReports={getReports} loginUser={loginUser} />
            <MyReport isDesktop={isDesktop} reports={reports} />
        </Grid>
    );
};

export default Report;
