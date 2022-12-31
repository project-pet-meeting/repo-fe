import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [passwordConfirm,setPasswordConfirm] = useState("")

  const initialState = {
      email: "",
      password: ""
  };
  //비밀번호 정규표현식
  const emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
  
  //회원가입시 유저정보
  const [user, setUser] = useState(initialState);

  // 이메일 인증을 위해 입력받은 email을 저장할 state
  const [emailCheck, setEmailCheck] = useState({ email: "" });

  const emailChangeHandler = (e) => {
    setEmailCheck({ email: e.target.value });
  };

  //user정보를 state로 저장
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  
  const onChangeHandler1 = (event, setState) => setState(event.target.value);

  //이메일 중복 확인
  const emailCheckHandler = async (e) => {
    e.preventDefault();

    if(user.email === "" || emailRegex.test(user.email) === false){
      alert("이메일을 확인해주세요!")
    }else{
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/member/emailConfirm?email=${emailCheck.email}` , {
        headers: {
          "content-type": "application/json",
        },
      });
      setGetCode(res.data.data.object)
    }
  };

  // 입력받은 인증코드를 저장할 state
  const [code, setCode] = useState({ object: "" });
  const [getCode, setGetCode] = useState("");

  const codeChangeHandler = (e) => {
    setCode({object: e.target.value});
  };

  //나중에 이메일 인증 확인 후 변경해야함****
  // 이메일 인증코드 일치 여부
  const [sameCode, setSameCode] = useState(true);

  // 이메일 인증코드 제출 여부
  const [codeSubmit, setCodeSubmit] = useState(true);

  // 이메일 인증 코드 제출
  const codeSubmitHandler = async (e) => {
    e.preventDefault();
    setCodeSubmit(true);
    // const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/emailConfirm?email=${emailCheck.email}` , code, {
    //   headers: {
    //     "content-type": "application/json",
    //   },
    // })
      if(getCode === code.object){
        setSameCode(true);
      }
  };

  const users = {
    data:{
      email:user.email,
      password: user.password,
    }
  };
  
  // 회원가입
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // 이메일 중복확인을 안 했을 경우
    if (codeSubmit === false) {
      alert("이메일 인증을 진행해주세요.")
      return false;
    }

    // 이메일 인증코드가 정확하지 않을 경우
    else if (sameCode === false) {
      alert("인증코드를 확인해주세요.")
      return false;
    }

    // 모든 항목을 입력하지 않고 회원가입 버튼을 click했을 경우
    else if (
      user.username === "" ||
      user.password === "" ||
      passwordConfirm === ""
    ) {
      alert("모든항목을 입력해주세요")
      return false;
    }

    // 비밀번호와 비밀번호 확인이 일치하지 않을 경우
    else if (user.password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.")
      return false;
    }else {
      // 모든 조건을 충족했을 시, 서버로 데이터 전송
      try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/member/signup`, user);
        console.log(response)
        alert("회원가입을 축하드립니다.")
        setUser(initialState);
        navigate("/login");
      } catch {
        console.log()
      };
    }};

  return (
    <>
      <div>
        <h1>회원가입</h1>
      </div>
      <div>
        <p>이메일</p>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={(e) => {
            onChangeHandler(e);
            emailChangeHandler(e);
          }}
          placeholder="이메일을 입력해주세요."
        />
        <button onClick={emailCheckHandler}>인증하기</button>
      </div>
      <div>
        {user.email === "" ? null : emailRegex.test(
          user.email) ? (
          <p
            style={{
              color: "green",
              textAlign: "left",
              lineHeight: "20px",
            }}
          >
            올바른 이메일 형식입니다.
            <br /> 「인증하기」를 누른 후 잠시 기다려주세요.
          </p>
        ) : (
          <p style={{ color: "red" }}>이메일 형식이 맞지 않습니다.</p>
        )}
      </div>
      {/* 이메일 중복확인을 통과했을 경우, 인증번호 입력 input 생성 */}
        <div>
          <div>
            <input
              placeholder="인증번호를 입력해주세요."
              name="code"
              value={code.object}
              onChange={(e) => {
                codeChangeHandler(e);
              }}
            />
            <button onClick={codeSubmitHandler}>확인</button>
          </div>
          {/* 올바른 인증코드인지 설명해주는 문구 */}
          <div>
            {codeSubmit === true && sameCode === false ? (
              <p style={{ color: "red" }}>인증코드를 다시 확인해주세요.</p>
            ) : codeSubmit === true && sameCode === true ? (
              <p style={{ color: "green" }}>인증되었습니다.</p>
            ) : null}
          </div>
        </div>

      {/* 비밀번호 검증 */}
      <div>
        <label>
          <div>
            <p>비밀번호</p>
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={(e) => {
                onChangeHandler(e);
              }}
              placeholder="숫자, 영문자를 혼용하여 8자리 이상 입력해주세요."
            />
          </div>
          {/* 올바른 비밀번호인지 설명해주는 문구 */}
          <div>
            {user.password === "" ? null : passwordRegex.test(
                user.password
              ) ? (
              <p style={{ color: "green" }}>안전한 비밀번호예요!</p>
            ) : (
              <p style={{ color: "red" }}>
                숫자, 영문자 조합으로 8자리 이상 입력하세요.
              </p>
            )}
          </div>
        </label>
      </div>
      {/* 비밀번호 확인 */}
      <div>
        <input
          type="password"
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={(event) => onChangeHandler1(event,setPasswordConfirm)}
          placeholder="비밀번호를 다시 입력해주세요."
        />

        {/* 두 개의 비밀번호가 일치하는지 설명해주는 문구 */}
        <div>
          {passwordConfirm === "" ? null : user.password ===
            passwordConfirm ? (
            <p style={{ color: "green" }}>비밀번호가 일치합니다.</p>
          ) : (
            <p style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</p>
          )}
        </div>
      </div>
      <div>
        <button onClick={onSubmitHandler}>가입하기</button>
        <button onClick={() => navigate('/login')}>뒤로가기</button>
      </div>
    </>
  )
}

export default Signup
