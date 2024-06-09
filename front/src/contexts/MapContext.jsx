import React, { createContext, useState, useEffect } from 'react';

export const MapContext = createContext();

export const MapProvider = ({ children }) => {
    const [stations, setStations] = useState([]); // 전체 충전소 데이터 모음
    const [favStation, setFavStation] = useState([]); // 즐겨찾는 충전소 데이터 모음
    const [favList, setFavList] = useState([]); // 즐겨찾기 충전소 아이디 모음
    const [positionArr, setPositionArr] = useState(); // 충전소 위치 모음
    const [filterList, setFilterList] = useState({}); // 필터 정보 모음
    const [mapPos, setMapPos] = useState({lat:37.261911, lng:127.030736}); // 지도 중심좌표 저장
    const [stationIdx, setStationIdx] = useState(0); // 충전소 페이지인덱스 저장

    useEffect(() => {
      navigator.geolocation.getCurrentPosition(pos => {
        setMapPos({lat:pos.coords.latitude, lng:pos.coords.longitude});
      })
    }, []);
    
  return (
    <MapContext.Provider 
        value={{ 
            stations, setStations, 
            favStation, setFavStation,
            favList, setFavList,
            positionArr, setPositionArr,
            filterList, setFilterList,
            mapPos, setMapPos,
            stationIdx, setStationIdx
        }}
    >
      {children}
    </MapContext.Provider>
  );
};