//지도 API를 뿌려주고 각 컴포넌트들을 보여주는 지도의 main 컴포넌트
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useContext, useEffect, useState, useRef } from 'react';
import { Map, useKakaoLoader } from 'react-kakao-maps-sdk';
import { MapContext } from '../../../../contexts/MapContext'; 
import Geolocate from './Geolocate';
import ClusterMarker from './ClusterMarker';
import { FilterGroup } from '../FilterGroup';
import { Box } from '@mui/material';

const KakaoMap = () => {
  const { mapPos } = useContext(MapContext);

  const [loading, error] = useKakaoLoader({
    appkey: process.env.REACT_APP_KAKAO_MAP_API_KEY,
    libraries: ["clusterer"],
  });

  //현재위치를 못 가져오게 막아 두었을 경우, 현재위치가 되는 기본 값(카카오 제주 지사)
  const mapRef = useRef(); 
  const [center, setCenter] = useState({
    lat: 33.450701,
    lng: 126.570667,
  });
  const [position, setPosition] = useState(center);

  //반응형분기점
  const theme = useTheme();
  const tabletWidth = useMediaQuery(theme.breakpoints.up("md"));
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
        setCenter({lat:pos.coords.latitude, lng:pos.coords.longitude});
    })
    navigator.geolocation.watchPosition(pos => {
        setPosition({lat:pos.coords.latitude, lng:pos.coords.longitude});
    });
}, []);

//충전소 위치 api에서 위도, 경도를 가져오고, 가져온 위도경도가 지도의 중심으로 이동하게 하는 코드
const onCenterChanged = (map) => {
  setCenter({
    lat: map.getCenter().getLat(),
    lng: map.getCenter().getLng(),
  });
};
    
  useEffect(() => {
      setCenter(mapPos);
  }, [mapPos]);

  return (
    <Box component="section" sx={{position:"relative", width: "100%", height: "calc(100vh - 64px)"}}>
      <Map
        id="map"
        position="absolute"
        center={center}
        style={{ width: "100%", height: "100%" }}
        level={3}
        ref={mapRef}
        onCenterChanged={onCenterChanged}
      >
        <Geolocate center={center} position={position} setCenter={setCenter} setPosition={setPosition} mapRef={mapRef} />
        <ClusterMarker />
      </Map>
      
      {/*모바일 버전일때 필터그룹 추가*/}
      {tabletWidth ? <FilterGroup /> : null}
    </Box>
  );
};

export default KakaoMap;