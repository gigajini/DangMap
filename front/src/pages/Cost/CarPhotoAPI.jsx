import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Grid, Typography } from "@mui/material";

const imageStyle = {
    border: "1px solid #ccc",
    width: '100%',
    height: 220,
};

// CarPhotoAPI 컴포넌트 정의
export const CarPhotoAPI = ({onCarClick, selectedCars, selectedChargingTypes, searchQuery}) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [data, setData] = useState(null);

    // Unsplash에서 랜덤 이미지를 가져오는 함수
    useEffect(() => {
        const fetchRandomImage = async () => {
            try {
                setLoading(true);
                const response = await axios.get("https://api.unsplash.com/photos/random/", {
                    headers: {
                        Authorization: "Client-ID T3PZNjjzthxFni2o7W_aTfDpUC2zhpTYKdS7VULt2mY",
                    },
                    params: {
                        query: "car",
                        count: 18,
                    },
                });
                setImages(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error", err);
                setError("Failed to fetch image");
                setLoading(false);
            }
        };

        fetchRandomImage();
    }, []);

    // 차량 데이터를 가져오는 함수
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://api.odcloud.kr/api/15039549/v1/uddi:aacd2890-94b3-4645-baba-da7f3561e83d_202004141517?page=1&perPage=20&serviceKey=4B1nW8qD9IBn0d7dknKCzNYFxKNer4bSpWUpGZ8VhpFr9XZ14V8xXcF9vAd0my6td3TGf47WXnmmtYH2V3JV3Q%3D%3D"
                );
                console.log("API Response", response.data);

                if (response.data && response.data.data) {
                    setData(response.data.data);
                } else {
                    setData([]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // 로딩중일때 표시할내용
    if (loading) {
        return <div>Loading...</div>;
    }

    // 에러발생시 표시할내용
    if (error) {
        return <div>{error}</div>;
    }

    const boxStyle = {
        border: "1px solid #ccc",
        padding: "3vh",
        marginTop: -1,
        width: '100%',
        height: 200,
        alignItems: "center",
    };

    // 선택된 조건에 따라 데이터 필터링
    const filteredData = data.filter(car => { 
        const manufacturerMatch = selectedCars.length === 0 || selectedCars.includes(car.제조사); 
        const chargingTypeMatch = selectedChargingTypes.length === 0 || selectedChargingTypes.includes(car.급속충전방식) || selectedChargingTypes.includes(car.완속충전방식); 
        const searchQueryMatch = car.모델명.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                car.제조사.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                car.급속충전방식.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                car.완속충전방식.toLowerCase().includes(searchQuery.toLowerCase());
        return manufacturerMatch && chargingTypeMatch && searchQueryMatch; });

    return (
        <Grid container spacing={2}> 
            {filteredData.map((car, idx) => ( 
                <Grid item xs={12} sm={6} md={4} key={idx}>
                    <Box sx={{ cursor: 'pointer' }} onClick={() => onCarClick({ ...car, image: images[idx] ? images[idx].urls.raw : '' })}> {images[idx] && ( 
                        <img src={`${images[idx].urls.raw}&w=300&fit=crop`} style={imageStyle} alt="car" /> )} 
                        <Box sx={boxStyle}>
                            <Typography variant="h6" component="strong"> 모델명: {car.모델명} 
                            </Typography><Typography variant="body1">제조사: {car.제조사}</Typography>
                            <Typography variant="body1">급속충전방식: {car.급속충전방식}</Typography>
                            <Typography variant="body1">완속충전방식: {car.완속충전방식}</Typography>
                            </Box></Box></Grid> ))} </Grid>






    );
};

export default CarPhotoAPI;
