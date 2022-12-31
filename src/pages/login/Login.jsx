import React from 'react'
import { useNavigate } from 'react-router-dom';
import { KAKAO_AUTH_URL, NAVER_AUTH_URL } from "../../shared/OAuth";
import "./styled.scss";

const Login = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className='loginBox'>
        <div className='login'>
          <p>로그인</p>
        </div>
        <button className='naverLogin'
          onClick={() => {
            navigate('/emaillogin');
          }}>이메일 로그인
        </button>
        <button className='naverLogin'
          onClick={() => {
            window.location.href = NAVER_AUTH_URL;
          }}>네이버로그인
        </button>
        <button className='kakaoLogin'
          onClick={() => {
            window.location.href = KAKAO_AUTH_URL;
          }}>카카오로그인
        </button>
        <div>
          <button onClick={() => navigate('/signup')}>회원가입</button>
        </div>
      </div>
    </>
  )
}

export default Login
