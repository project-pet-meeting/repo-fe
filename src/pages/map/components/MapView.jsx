import React, { useEffect, useRef, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const MapView = ({geoLocation}) => {

  // geoLocation === null ? 

  const [myLocation, setMyLocation] = useState(geoLocation);
  console.log(myLocation)

  useEffect(() => {
    setMyLocation(geoLocation);
  },[])

  return (
    <Map // 지도를 표시할 Container
      center={myLocation.center}
      style={{
        // 지도의 크기
        width: "100%",
        height: "100vh",
      }}
      level={3} // 지도의 확대 레벨
    >
      {!myLocation.isLoading && (
        <MapMarker position={myLocation.center}>
          <div style={{ padding: "5px", color: "#000" }}>{myLocation.errMsg ? myLocation.errMsg : "여기에 계신가요?!"}</div>
        </MapMarker>
      )}
    </Map>

    // <Map
    //   center={{ lat: 33.5563, lng: 126.79581 }}
    //   // 지도의 크기
    //   style={{ width: "100%", height: "100vh" }}
    //   // 지도의 확대 레벨
    //   level={3}
    // >
    //   <MapMarker position={{ lat: 33.5563, lng: 126.79581 }}>
    //     <div>hi</div>
    //   </MapMarker>
    // </Map>
  );
}

export default MapView;