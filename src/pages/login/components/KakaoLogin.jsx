import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const KakaoLogin = () => {
  const navigate = useNavigate();

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    kakaoLogin(code);
  }, []);

  console.log(code)
  const kakaoLogin = async (code) => {
    try {
      //백엔드로 인가코드 보내기
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/kakao/callback?code=${code}`);
      console.log(res)
      console.log(res.data.nickname)
      sessionStorage.setItem("ACCESS_TOKEN", res.headers.authorization);
      sessionStorage.setItem("REFRESH_TOKEN", res.headers.refreshtoken);
      sessionStorage.setItem("nickname", res.data.data.nickname);

      alert("환영합니다!")
      navigate("/");

    } catch (error) {
      console.log("카카오 로그인 실패");
    }
  };

  return (
    <>
      
    </>
  )
}

export default KakaoLogin
