import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, Outlet, useNavigate } 
from "react-router-dom";
import MapView from "./components/MapView";
import MapBtn from "./components/MapBtn";
import NavBar from "../../components/NavBar";

const MapPage = () => {

  const location = useLocation();
  const navigate = useNavigate();
  console.log('location is..', location);

  const [geoLocation, setGeoLocation] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

 const meetingHandler = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/meeting`
    )
    console.log(res.data.meetingList.length);
    
    if( res.status === 200 || 202 ){
      if(res.data.meetingList.length === 0) {
        navigate('/mapviewmodal')
      } else {
        navigate('/')
        // 여기선 만든 채팅방들이 나와야함.
      }
      // res.data.meetingList.length === 0 
      // ? navigate('/mapviewmodal') 
      // : null
    }
    
  }
  catch(err){
    console.error(err)
  }
 }

 console.log(navigator);
  const nowLocation = () => {
    // console.log('nowLocation');
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
  }
  
  return (
    <>
      <div style={{ display: "flex", width: "100vw" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            zIndex: "10",
            position: "fixed",
            bottom: "10px",
            right: "10px",
          }}
        >
          {/* <Link /> 요소에는 state 속성이 있습니다. 그것은 개체를 포함합니다. 
          background를 키로 전달하고 location을 값으로 전달합니다. */}
          <span>
            <Link to='/makemeetingmodal' state={{ background: location }}>
                <MapBtn icons='paw' onClick={meetingHandler} style={{ marginBottom: "10px" }} />
            </Link>
          </span>
          <span>
            <MapBtn icons='gps' onClick={nowLocation} />
          </span>
        </div>
        <MapView geoLocation={geoLocation}/>
        <div style={{ display: "flex" }}></div>
      </div>
      <NavBar />
    </>
  );
};

export default MapPage;