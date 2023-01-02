import axios from 'axios';
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import "../styled.scss";

const EmaliLogin = () => {
  const navigate = useNavigate();

  // input에 입력한 값을 저장
  const usernameRef = useRef();
  const passwordRef = useRef();

  // 로그인 버튼 click시 서버로 데이터 전송
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // 서버로 보낼 데이터
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    // input이 비었을 때 alert
    if (usernameRef.current.value === "" || passwordRef.current.value === "") {
      return;
    }

    // 서버로 전송 후, 받아온 토큰을 로컬에 저장
    else {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/member/login`, user);

        sessionStorage.setItem("ACCESS_TOKEN", response.headers.authorization);
        sessionStorage.setItem("REFRESH_TOKEN", response.headers.refreshtoken);
        sessionStorage.setItem("nickname", response.data.data.nickname);

        navigate('/');
      }catch{
        alert("이메일 또는 비밀번호를 확인해주세요")
      }
   }};

  return (
    <>
      <div className='loginBox'>
        <div className='emailLogin'>
          <p>로그인</p>
        </div>
        <div className='inputBox'>
          <form onSubmit={onSubmitHandler}>
            <div>
              <div>
                <label>
                  <div className='loginTitle'>
                    <b>이메일</b>
                  </div>
                  <input
                    className='loginInput'
                    type="text"
                    placeholder="이메일을 입력해주세요."
                    ref={usernameRef}
                  />
                </label>
              </div>
              <div>
                <label>
                  <div className='loginTitle'>
                    <b>비밀번호</b>
                  </div>
                  <input
                    className='loginInput'
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                    ref={passwordRef}
                  />
                </label>
              </div>
            </div>
            <div className='butDiv'>
              <button className='loginBut'>로그인</button>
              <button className='cancelBit' onClick={() => navigate('/login')}>뒤로가기</button>
            </div>  
          </form>
        </div>
      </div>  
    </>
  )
};

export default EmaliLogin;