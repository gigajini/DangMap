import { Box, Button, Grid, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import Chart from "./Chart/Chart";
import CarType from "./CarType";
import PageHeader from "../../components/layouts/PageHeader";

const Cost = () => {
    const [activeButton, setActiveButton] = useState("electricCar");
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <PageHeader title="정보마당" desc="전기차 종류 및 브랜드별 요금 현황을 볼 수 있습니다." />
            <Box sx={{ marginBottom: "10px", display: "flex", width: "100%", marginBottom: "50px" }}>
                <Button
                    variant="contained"
                    sx={{
                        width: "50%",
                        height: "46px",
                        backgroundColor: activeButton === "electricCar" ? "primary.main" : "grey.100",
                        color: activeButton === "electricCar" ? "white" : "grey.500",
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                    }}
                    onClick={() => {
                        setActiveButton("electricCar");
                    }}
                >
                    전기차 종류
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        width: "50%",
                        height: "46px",
                        backgroundColor: activeButton === "costTable" ? "primary.main" : "grey.100",
                        color: activeButton === "costTable" ? "white" : "grey.500",
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                    }}
                    onClick={() => {
                        setActiveButton("costTable");
                    }}
                >
                    요금표
                </Button>
            </Box>
            {activeButton === "electricCar" ? (
                <CarType />
            ) : (
                <>
                    <Chart />
                </>
            )}
        </Grid>
    );
};

export default Cost;
