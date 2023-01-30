import React, {useState, useEffect} from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const MapGeoLocation = () => {

  const [geoLocation, setGeoLocation] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeoLocation((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          setGeoLocation((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // GeoLocation을 사용할 수 없을 때 마커 표시 위치와 인포윈도우 내용 설정.
      setGeoLocation((prev) => ({
        ...prev,
        errMsg: "내위치 사용을 눌러주세요.",
        isLoading: false,
      }));
    }
  }, []);

  return (
    <>
      <Map // 지도를 표시할 Container
        center={geoLocation.center}
        style={{
          // 지도의 크기
          width: "100%",
          height: "450px",
        }}
        level={3} // 지도의 확대 레벨
      >
        {!geoLocation.isLoading && (
          <MapMarker position={geoLocation.center}>
            <div style={{ padding: "5px", color: "#000" }}>{geoLocation.errMsg ? geoLocation.errMsg : "여기에 계신가요?!"}</div>
          </MapMarker>
        )}
      </Map>
    </>
  );
}

export default MapGeoLocation;

