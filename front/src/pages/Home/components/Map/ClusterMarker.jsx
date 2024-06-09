//클러스터 마커, 커스텀 마커 지도에 표시하는 컴포넌트
import React, { useRef, useContext, useState } from 'react';
import { MapContext } from '../../../../contexts/MapContext';
import Detail from './Detail';
import { MapMarker } from 'react-kakao-maps-sdk';
import { MarkerClusterer } from 'react-kakao-maps-sdk';

const ClusterMarker = () => {
  const { positionArr } = useContext(MapContext);
  const [open, setOpen] = useState(false);
  const [detailIndex, setDetailIndex] = useState(null);
  const mapRef = useRef();

  const onClusterclick = (_target, cluster) => {
    const map = mapRef.current;
    if (map) {
      const level = map.getLevel() - 1;
      map.setLevel(level, { anchor: cluster.getCenter() });
    }
  };

  const handleClickOpen = (index) => {
    setDetailIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  return (
    //클러스터 마커
    <MarkerClusterer
      averageCenter={true}
      minLevel={6}
      disableClickZoom={false}
      onClick={() => onClusterclick()}
    >
      {/*positionArr 기준으로 조건에 맞게 커스텀 마커 사용하기*/}
      {positionArr?.map((position, index) => (
        <MapMarker
          key={`${position.title}-${index}`}
          position={position.latlng}
          onClick={() => handleClickOpen(index)}

          image={
            position.fav === true ?
            {
              src:'./즐겨찾기1.png', size: { width: 29, height: 42 },
            }
            : 
            position.available === false ?
            {
              src: '/not_using1.png',  size: { width: 29, height: 42 },
            }
            :
            null
          }
        />
      ))}
      <Detail open={open} handleClose={handleClose} detailIndex={detailIndex} />
  </MarkerClusterer>
  );
};

export default ClusterMarker;
