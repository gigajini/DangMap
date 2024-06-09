import { Container, Box } from "@mui/material";
import { useLocation } from "react-router-dom";

const Main = ({ children }) => {
    const location = useLocation();
    const pathName = location.pathname;

    return (
        <>
            {//지도 페이지는 fullwidth로 보여주기
            pathName === "/" ? (
                <Box sx={{ height: "calc(100vh - 64px)", marginTop: "64px" }}>{children}</Box>
            ) : (
                <Container sx={{ minHeight: "calc(100vh - 120px)", marginTop: "120px" }}>{children}</Container>
            )}
        </>
    );
};

export default Main;
