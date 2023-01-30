import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const MapFormModal = () => {

  return(
    <>
     <Map //지도를 표시할 컨테이너
      // 지도의 중심좌표 
      center={{ lat: 33.5563, lng: 126.79581 }}
      // 지도의 크기
      style={{ width:'100%', height:'80vh' }}
      // 지도의 확대 레벨
      level={3}
    >
      <MapMarker 
        position={{ lat: 33.5563, lng: 126.79581 }}
      >
        <div >hi</div>
      </MapMarker>
    </Map>
    </>
  )
};

export default MapFormModal;