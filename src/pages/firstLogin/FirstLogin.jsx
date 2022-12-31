import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import "./styled.scss";

const FirstLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem("nicknameRef")
    sessionStorage.removeItem("locationRef")
  },[])

  // input에 입력한 값을 저장
  const nicknameRef = useRef();
  const locationRef = useRef();

  const nextBut = () => {
    if(nicknameRef.current.value === "" || locationRef.current.value === ""){
      alert("모든 항목을 입력해주세요!")
    }else{
      sessionStorage.setItem("nicknameRef", nicknameRef.current.value);
      sessionStorage.setItem("locationRef", nicknameRef.current.value);

      navigate('/firstlogin/pet')
    }
  };
  return (
    <>
      <div className='box'>
        <div className='login'>
          <p>유저 정보 입력</p>
        </div>
        <div className='userinfo'>
          <input
            className='nickname'
            type="text"
            placeholder="닉네임을 입력해주세요."
            ref={nicknameRef}
          />
          <input
            className='userlocation'
            type="text"
            placeholder="지역을 입력해주세요."
            ref={locationRef}
          />
        </div>
        <div>
          <button className='nextButton' onClick={nextBut}>다음</button>
        </div>
      </div>
    </>
  )
}

export default FirstLogin
