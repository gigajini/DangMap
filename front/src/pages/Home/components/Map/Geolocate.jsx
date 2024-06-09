// 현재 위치로 돌아오게 하는 버튼과 지도확대/축소 할 수 있는 컨트롤러 컴포넌트
import React, { useRef, useEffect } from 'react';
import { Map as KakaoMapComponent, ZoomControl, MapMarker } from 'react-kakao-maps-sdk';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import IconButton from '@mui/material/IconButton';

const Geolocate = ({ center, setCenter, position, handleClickOpen }) => {
  const mapRef = useRef();

  useEffect(() => {
    console.log(mapRef.current);
  }, []);

  const comeBackHome = () => {
    setCenter(position);
  };

  return (
    <>
      <MapMarker position={position} onClick={handleClickOpen} />
      <ZoomControl />
      <IconButton
        color="primary"
        onClick={comeBackHome}
        sx={{ position: 'absolute', top: 200, right: 1, zIndex: 5 }}
      >
        <GpsFixedIcon />
      </IconButton>
    </>
  );
};

export default Geolocate;