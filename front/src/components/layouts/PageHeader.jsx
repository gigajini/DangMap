import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";

const PageHeader = ({ title, desc }) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

    return isDesktop ? (
        // 데스크탑일 경우 설명과 차 사진 양끝에 배치
        <Grid sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Grid>
                <Typography variant="h4" sx={{ fontWeight: "bold", color: theme.palette.primary.dark }}>
                    {title}
                </Typography>
                <Typography sx={{ width: "75%", whiteSpace: "pre-wrap" }}>{desc}</Typography>
            </Grid>

            <Box component="img" src="/car.png" alt="car" />
        </Grid>
    ) : (
        // 모바일일 경우 차 사진이 없어지고 글씨 중앙 정렬
        <Grid sx={{ marginBottom: "20px", textAlign: "center" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: theme.palette.primary.dark }}>
                {title}
            </Typography>
            <Typography>{desc}</Typography>
        </Grid>
    );
};

export default PageHeader;
