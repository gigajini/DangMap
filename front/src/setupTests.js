import { Route, Routes } from "react-router-dom";
// import Layout from "./layouts/layout";
import Home from "./pages/Home";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Admin from "./pages/Admin";
import Community from "./pages/Community";
import Cost from "./pages/Cost";
import Mypage from "./pages/Mypage";
import Layout from "./components/layouts/layout";

function App() {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#336dff",
            },
            secondary: {
                main: "#FFCF32",
                contrastText: "#00000",
            },
        },
    });

    console.log(theme);

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Layout>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/join" element={<Join />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/cost" element={<Cost />} />
                        <Route path="/community" element={<Community />} />
                        <Route path="/mypage" element={<Mypage />} />
                    </Routes>
                </Layout>
            </ThemeProvider>
        </>
    );
}

export default App;
