import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { Link } from "react-router-dom";
import { useState ,useEffect} from "react";
const {kakao} = window
const MapFormModal = () => {
  const [info, setInfo] = useState()
  const [markers, setMarkers] = useState([])
  const [map, setMap] = useState()
  const [InputText, setInputText] = useState('')
  const [Place, setPlace] = useState("")

  const onChange = (e) => {
    setInputText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPlace(InputText)
    setInputText('')
  }
  console.log(markers)
  useEffect(() => {
    if (!map) return
    const ps = new kakao.maps.services.Places()

    ps.keywordSearch(Place, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds()
        let markers = []
        console.log(data)
        for (var i = 0; i < data.length; i++) {
          // @ts-ignore
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
            address: data[i].address_name,
          })
          
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }
        setMarkers(markers)

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds)
      }
    })
  }, [Place])
  return(
    <>
    <form className="inputForm" onSubmit={handleSubmit}>
        <input placeholder="검색어를 입력하세요" onChange={onChange} value={InputText} />
        <button type="submit">검색</button>
      </form>
     <Map //지도를 표시할 컨테이너
      // 지도의 중심좌표 
      center={{ lat: 33.450701, lng: 126.570667 }}
      // 지도의 크기
      style={{ width:'100%', height:'80vh' }}
      // 지도의 확대 레벨
      level={3}
      onCreate={setMap}
    >
      {markers.map((marker) => (
        <MapMarker
          key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
          position={marker.position}
          onClick={() => setInfo(marker)}
        >
          {info &&info.content === marker.content && (
            <div style={{color:"#000"}}>{marker.content}</div>
          )}
        </MapMarker>
      ))}
    </Map>
    </>
  )
};

export default MapFormModal;