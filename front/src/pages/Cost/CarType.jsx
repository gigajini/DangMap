import React, { useState } from "react";
import { Grid, Box, Button, Typography, useMediaQuery, TextField, Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CarPhotoAPI from "./CarPhotoAPI";
import SearchInput from "./../../components/input/SearchInput";
import ContentsPopup from './../../components/popup/ContentsPopup';
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";

// Dialog 스타일 정의
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

// 제조사별 홈페이지 URL 반환 함수
const getHomepageURL = (manufacturer) => {
    switch (manufacturer) {
        case "현대":
            return "https://www.hyundai.com";
        case "기아":
            return "https://www.kia.com";
        case "BMW":
            return "https://www.bmw.co.kr";
        case "벤츠":
            return "https://www.mercedes-benz.co.kr/";
        case "테슬라":
            return "https://www.tesla.com/ko_kr";
        case "르노삼성":
            return "https://www.renault.co.kr/";
        case "닛산":
            return "https://www.nissan.co.kr/";
        case "한국GM":
            return "https://www.gm-korea.co.kr/";
        default:
            return "";
    }
};

// 홈페이지로 리디렉션하는 함수
const handleHomepageRedirect = (manufacturer) => {
    const homepageURL = getHomepageURL(manufacturer);
    if (homepageURL) {
        window.location.href = homepageURL;
    } else {
        console.error("홈페이지 URL을 찾을 수 없습니다.");
    }
};

// CarType 컴포넌트 정의
const CarType = () => {
    // 상태 정의
    const [selectedCars, setSelectedCars] = useState([]);
    const [selectedChargingTypes, setSelectedChargingTypes] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [appliedSearchQuery, setAppliedSearchQuery] = useState("");
    const isMobile = useMediaQuery("(max-width:600px)");
    const isTablet = useMediaQuery("(max-width:900px)");

    // 제조사 클릭 핸들러
    const handleCarClick = (manufacturer) => {
        if (selectedCars.includes(manufacturer)) {
            setSelectedCars(selectedCars.filter((car) => car !== manufacturer));
        } else {
            setSelectedCars([...selectedCars, manufacturer]);
        }
    };

    // 충전 방식 클릭 핸들러
    const handleChargingTypeClick = (chargingType) => {
        if (selectedChargingTypes.includes(chargingType)) {
            setSelectedChargingTypes(selectedChargingTypes.filter((type) => type !== chargingType));
        } else {
            setSelectedChargingTypes([...selectedChargingTypes, chargingType]);
        }
    };

    // 차량 상세 정보 클릭 핸들러
    const handleCarDetailClick = (car) => {
        setSelectedCar(car);
        setOpen(true);
    };

    // 검색 입력 변경 핸들러
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // 검색 버튼 클릭 핸들러
    const handleSearchClick = () => {
        setAppliedSearchQuery(searchQuery);
    };

    // 팝업창 닫기
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                padding: isMobile ? "1vh" : "2vh",
                boxSizing: "border-box",
                margin: isMobile ? "0 10px" : "0 20px"
            }}
        >
            <Box sx={{
                width: isMobile ? "100%" : isTablet ? "80%" : "70%", 
                padding: isMobile ? "20px" : "40px",
                backgroundColor: "white", 
                borderRadius: "8px", 
                boxShadow:"0 0 12px rgba(0,0,0,0.271)",
                }}>

                <Typography>제조사별</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {["현대", "기아", "테슬라", "BMW", "벤츠", "르노삼성", "닛산", "한국GM"].map((manufacturer) => (
                    <Button
                        key={manufacturer}
                        variant="outlined"
                        sx={{
                            marginRight: "1vh",
                            marginBottom: "1vh",
                            backgroundColor: selectedCars.includes(manufacturer) ? "#336DFF" : "white",
                            color: selectedCars.includes(manufacturer) ? "white" : "#336DFF",
                            flexGrow: isMobile ? 1 : 0,
                            flexBasis: isMobile ? '45%' : 'auto',
                            '&:hover': { backgroundColor: selectedCars.includes(manufacturer) ? "#336DFF" : "white",
                                        color: selectedCars.includes(manufacturer) ? "white" : "#336DFF"
                            },
                        }}
                        onClick={() => handleCarClick(manufacturer)}
                    >
                        {manufacturer}
                    </Button>
                ))}
                </Box>
                <Typography sx={{ marginTop: "2vh" }}>충전방식</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {["DC콤보(급속)", "AC완속(5핀)", "AC완속(7핀)"].map((type) => (
                    <Button
                        key={type}
                        variant="outlined"
                        sx={{
                            marginRight: "1vh",
                            marginBottom: "1vh",
                            backgroundColor: selectedChargingTypes.includes(type) ? "#336DFF" : "white",
                            color: selectedChargingTypes.includes(type) ? "white" : "#336DFF",
                            flexGrow: isMobile ? 1 : 0,
                            flexBasis: isMobile ? '45%' : 'auto',
                            '&:hover': { backgroundColor: selectedChargingTypes.includes(type) ? "#336DFF" : "#white",
                                        color: selectedChargingTypes.includes(type) ? "white" : "#336DFF"
                            },
                        }}
                        onClick={() => handleChargingTypeClick(type)}
                    >
                        {type}
                    </Button>
                ))}
                </Box>
                <Typography sx={{ marginTop: "2vh" }}>차량검색</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '1vh' }}>
                    <TextField fullWidth variant="outlined" placeholder="검색어를 입력하세요" value={searchQuery} onChange={handleSearchChange} />
                    <Button variant="contained" onClick={handleSearchClick} > 검색 </Button></Box>
                </Box>
                <Box sx={{ marginTop: "2vh", width: "100%", maxWidth: "1000px" }}>
                    <Grid container>
                        <CarPhotoAPI 
                        onCarClick={handleCarDetailClick} 
                        selectedCars={selectedCars} 
                        selectedChargingTypes={selectedChargingTypes} 
                        searchQuery={appliedSearchQuery} />
                </Grid>
            </Box>
            {selectedCar && ( 
                <BootstrapDialog 
                    onClose={handleClose} 
                    aria-labelledby="customized-dialog-title" 
                    open={open}
                    fullWidth={true}
                    maxWidth="xs"
                >
                    <DialogTitle sx={{ m: 0, p: 2, fontWeight: 600 }} id="customized-dialog-title">
                        차량 상세 정보
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: "absolute",
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent sx={{ padding: '10px', textAlign: 'center' }}>
                        <img src={`${selectedCar.image}&w=200&h=200&fit=crop`} style={{ width: '100%', maxWidth: '300px', marginBottom: 20 }} alt="car" />
                        <Box sx={{ textAlign: 'center',}}>
                            <Typography variant="h6" component="strong" sx={{ marginBottom: 2 }}> 모델명: {selectedCar.모델명} </Typography>
                            <Typography variant="body1">제조사: {selectedCar.제조사}</Typography>
                            <Typography variant="body1">급속충전방식: {selectedCar.급속충전방식}</Typography>
                            <Typography variant="body1">완속충전방식: {selectedCar.완속충전방식}</Typography>
                            <Typography variant="body1">배터리용량: {selectedCar.배터리용량}</Typography>
                            <Typography variant="body1">출시일: {selectedCar.출시일}</Typography>
                        </Box>
                        <Button variant="outlined" sx={{ height: 40, marginTop: 4 }} onClick={() => handleHomepageRedirect(selectedCar.제조사)}> 홈페이지로 이동 </Button>
                    </DialogContent>
                </BootstrapDialog>
            )}
        </Grid>
    );
};

export default CarType;
