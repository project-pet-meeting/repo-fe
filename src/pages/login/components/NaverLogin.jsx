import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NaverLogin = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    naverLogin()
  },[]);

  console.log(code)
  const naverLogin = async () => {
    try{
      //백엔드로 인가코드 보내기
      const res = await axios.get(`${process.env.REACT_APP_SERVER_API}/login/oauth2/code/naver?code=${code}&stat=${process.env.REACT_APP_STATE_STRING}`);
    
      console.log(res)      
      sessionStorage.setItem("ACCESS_TOKEN", res.headers.authorization);
      sessionStorage.setItem("REFRESH_TOKEN", res.headers.refreshtoken);
      sessionStorage.setItem("nickname", res.data.data.nickname);

      alert("환영합니다!")
      navigate('/')
    }
    catch(err) {
      console.error("네이버 로그인 실패"); 
    };
  };
  return null;
};

export default NaverLogin
