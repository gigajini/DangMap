import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

const boxStyle = {
    border: '1px solid #ccc',
    width: '100%',
}

const CarAPI = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 데이터 가져오기 함수
    useEffect(()=> {
        const fetchData = async () => {
            try {
                // API 요청보내기
                const response = await axios.get('https://api.odcloud.kr/api/15039549/v1/uddi:aacd2890-94b3-4645-baba-da7f3561e83d_202004141517?page=1&perPage=20&serviceKey=4B1nW8qD9IBn0d7dknKCzNYFxKNer4bSpWUpGZ8VhpFr9XZ14V8xXcF9vAd0my6td3TGf47WXnmmtYH2V3JV3Q%3D%3D');
                console.log('API Response', response.data);

                // 데이터 상태 업데이트
                if (response.data && response.data.data) {
                    setData(response.data.data);
                } else {
                    setData([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {data.length > 0 ? (
                data.map((item, index) => (
                <Box key={index} sx={boxStyle}>
                    <Typography variant = 'h6' component = 'strong'>모델명: {item.모델명}</Typography>
                    <Typography variant = 'body1'>제조사: {item.제조사}</Typography>
                    <Typography variant = 'body1'>급속충전방식: {item.급속충전방식}</Typography>
                    <Typography variant = 'body1'>완속충전방식: {item.완속충전방식}</Typography>
                    <Typography variant = 'body1'>배터리용량: {item.배터리용량}</Typography>
                    <Typography variant = 'body1'>출시일: {item.출시일}</Typography>
                </Box>
            ))
        ) : (
            <p>No data available</p>
        )}
        </Box>
    );
};


export default CarAPI;