import {
    Box,
    Drawer,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Paper,
    styled,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import "../../App.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.up("md"));
    const location = useLocation();
    const { loginUser, logout, kakaoLogin } = useAuth();
    const [open, setOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userStatus, setUserStatus] = useState("guest"); // guest, user, admin

    useEffect(() => {
        kakaoLogin();
        if (loginUser?.id) {
            setUserStatus("user");
        } else {
            setUserStatus("guest");
        }
    }, [loginUser]);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const StyledTypo = styled(Typography)({
        cursor: "pointer",
        margin: "10px",
        color: "#4b4037",
        "&:hover": {
            color: theme.palette.primary.main,
        },
    });

    const ActiveNav = styled(StyledTypo)({
        fontWeight: "bold",
    });

    //유저 카드
    const MessageBox = () => {
        return (
            <Paper
                elevation={3}
                sx={{
                    width: "200px",
                    height: "120px",
                    position: "absolute",
                    top: "140%",
                    right: "0",
                    backgroundColor: "white",
                    zIndex: 1,
                    borderRadius: 1,
                    padding: 2,
                }}
            >
                <Box sx={{ padding: "10px" }}>
                    <Typography>{loginUser && loginUser?.nickname}님</Typography>
                    <Typography sx={{ fontSize: "14px", color: theme.palette.grey[500] }}>
                        {loginUser?.email}
                    </Typography>
                    <Typography sx={{ fontSize: "14px" }}>
                        내 자동차: <span style={{ fontWeight: 600 }}>테슬라</span>
                    </Typography>
                </Box>
            </Paper>
        );
    };

    const guest = [
        { nav: "정보마당", link: "/cost" },
        { nav: "커뮤니티", link: "/community" },
        { nav: "회원가입", link: "/join" },
        { nav: "로그인", link: "/login" },
    ];

    const user = [
        { nav: "정보마당", link: "/cost" },
        { nav: "커뮤니티", link: "/community" },
        { nav: "마이페이지", link: "/mypage" },
        { nav: "로그아웃", link: "/" },
    ];

    const admin = [
        { nav: "정보마당", link: "/cost" },
        { nav: "커뮤니티", link: "/community" },
        { nav: "회원관리", link: "/admin" },
        { nav: "로그아웃", link: "/" },
    ];

    const ELEVATION = location.pathname === "/" ? 0 : 4;

    // 데스크탑 헤더
    const DeskTopHeader = () => {
        return (
            <AppBar color="secondary" elevation={ELEVATION}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box
                        sx={{ display: "flex", cursor: "pointer" }}
                        onClick={() => {
                            window.location.href = "/";
                        }}
                    >
                        <Box component="img" src="/danglogo.svg" alt="logo" sx={{ width: "90px", height: "auto" }} />
                    </Box>

                    {/* 로그인 하지 않은 경우 */}
                    {userStatus && userStatus === "guest" && (
                        <Grid sx={{ display: "flex" }}>
                            {guest.map((text, index) => (
                                <Link to={text.link} key={index}>
                                    {location.pathname === text.link ? (
                                        <ActiveNav>{text.nav}</ActiveNav>
                                    ) : (
                                        <StyledTypo>{text.nav}</StyledTypo>
                                    )}
                                </Link>
                            ))}
                        </Grid>
                    )}
                    {/* 일반 유저 로그인 한 경우 */}
                    {userStatus && userStatus === "user" && (
                        <Grid sx={{ display: "flex", alignItems: "center" }}>
                            <Grid>
                                <StyledTypo
                                    onClick={(e) => {
                                        setDropdownOpen(!dropdownOpen);
                                    }}
                                    sx={{ position: "relative" }}
                                >
                                    {loginUser && loginUser?.nickname}님
                                    {dropdownOpen ? (
                                        <ArrowDropUpIcon sx={{ fontSize: "22px" }} />
                                    ) : (
                                        <ArrowDropDownIcon sx={{ fontSize: "22px" }} />
                                    )}
                                    {dropdownOpen && <MessageBox />}
                                </StyledTypo>
                            </Grid>
                            {user.map((text, index) => (
                                <Link to={text.link} key={index}>
                                    {text.nav !== "로그아웃" && location.pathname === text.link ? (
                                        <ActiveNav
                                            onClick={() => {
                                                text.nav === "로그아웃" &&
                                                    logout(() => {
                                                        setUserStatus("guest");
                                                    });
                                            }}
                                        >
                                            {text.nav}
                                        </ActiveNav>
                                    ) : (
                                        <>
                                            <StyledTypo
                                                onClick={() => {
                                                    text.nav === "로그아웃" &&
                                                        logout(() => {
                                                            setUserStatus("guest");
                                                        });
                                                }}
                                            >
                                                {text.nav}
                                            </StyledTypo>
                                        </>
                                    )}
                                </Link>
                            ))}
                        </Grid>
                    )}

                    {/* 관리자일 경우 */}
                    {userStatus && userStatus === "admin" && (
                        <Grid sx={{ display: "flex" }}>
                            {admin.map((text, index) => (
                                <Link to={text.link} key={index}>
                                    {text.nav !== "로그아웃" && location.pathname === text.link ? (
                                        <ActiveNav>{text.nav}</ActiveNav>
                                    ) : (
                                        <StyledTypo>{text.nav}</StyledTypo>
                                    )}
                                </Link>
                            ))}
                        </Grid>
                    )}
                </Toolbar>
            </AppBar>
        );
    };

    // 모바일 헤더 아이템들
    const DrawerItem = (text) => {
        return (
            <ListItem key={text.nav} disablePadding>
                <Link to={text.link}>
                    <ListItemButton>
                        {text.nav !== "로그아웃" && location.pathname === text.link ? (
                            <ActiveNav
                                onClick={() => {
                                    text.nav === "로그아웃" &&
                                        logout(() => {
                                            setUserStatus("guest");
                                        });
                                }}
                            >
                                {text.nav}
                            </ActiveNav>
                        ) : (
                            <ListItemText
                                onClick={() => {
                                    text.nav === "로그아웃" &&
                                        logout(() => {
                                            setUserStatus("guest");
                                        });
                                }}
                                primary={text.nav}
                            />
                        )}
                    </ListItemButton>
                </Link>
            </ListItem>
        );
    };

    // 모바일 헤더 리스트들
    const DrawerList = (
        <Box sx={{ width: "250px" }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem disablePadding>
                    <Link to="/">
                        <ListItemButton sx={{ width: "88px" }}>
                            {location.pathname === "/" ? (
                                <ActiveNav
                                    onClick={() => {
                                        window.location.href = "/";
                                    }}
                                >
                                    홈
                                </ActiveNav>
                            ) : (
                                <ListItemText
                                    onClick={() => {
                                        window.location.href = "/";
                                    }}
                                    primary="홈"
                                />
                            )}
                        </ListItemButton>
                    </Link>
                </ListItem>
                {userStatus && userStatus === "guest" && guest.map((text, index) => DrawerItem(text))}
                {userStatus && userStatus === "user" && user.map((text, index) => DrawerItem(text))}
                {userStatus && userStatus === "admin" && admin.map((text, index) => DrawerItem(text))}
            </List>
        </Box>
    );

    // 모바일 헤더
    const MobileHeader = () => {
        return (
            <AppBar color="secondary" elevation={ELEVATION} sx={{ minHeight: "64px" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <MenuIcon sx={{ fontSize: "32px", borderRadius: "2px" }} onClick={toggleDrawer(true)} />
                    <Drawer open={open} onClose={toggleDrawer(false)}>
                        {DrawerList}
                    </Drawer>
                    {loginUser?.id && (
                        <>
                            <StyledTypo
                                variant="h6"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                sx={{ position: "relative" }}
                            >
                                {loginUser && loginUser?.nickname}님
                                {dropdownOpen ? (
                                    <ArrowDropUpIcon sx={{ fontSize: "22px" }} />
                                ) : (
                                    <ArrowDropDownIcon sx={{ fontSize: "22px" }} />
                                )}
                                {dropdownOpen && <MessageBox />}
                            </StyledTypo>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        );
    };

    return isMobile ? <DeskTopHeader /> : <MobileHeader />;
};

export default Header;
