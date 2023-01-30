import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MapForm = () => {
  
  const navigate = useNavigate();
  const location = useLocation();

  const initialState = {
    title: '',
    content: '',
    address: '',
    coordinateX: '',
    coordinateY: '',
    placeName: '',
    time: '',
    recruitNum: '',
    species: '',
  }
  const [ meeting, setMeeting ] = useState(initialState);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setMeeting({ ...meeting, [name]: value });
  };

  console.log(meeting);

  const formSubmit = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_API}/api/meeting`,
      meeting
      )

      console.log(res);
    }
    catch(err){
      console.error(err);
    };
  };
  
  

  return (
    <div>
      <h1>미팅 만들기</h1>
      
      <form style={{
        width: '50vw',
        display:'flex', 
        flexDirection: 'column',
        }}
      >
        <input type="text" name="title" placeholder="모임 이름" onChange={inputHandler}/>
        
        <input type="time" name="time" placeholder="모임 시간" onChange={inputHandler}/>

        {/* 버튼은 클릭 시 폼 제출이 됨으로 div 등으로 바꾸는건? */}
        <button onClick={() => navigate('/mapformmodal')}>모임장소</button>

        <input type="number" placeholder="모임인원" onChange={inputHandler}/>

        <div onChange={inputHandler}>
          <div>모집 반려동물</div>
          <div>
            <input type="radio" name="species" id="dog" value="dog" checked/>
            <label htmlFor="dog">Dog</label>
          </div>
          <div>
            <input type="radio" name="species" id="cat" value="dog"/>
            <label htmlFor="cat">Cat</label>
          </div>
        </div>
      </form>

      <button onClick={formSubmit}>미팅 만들기</button>
    </div>
  );
};

export default MapForm;