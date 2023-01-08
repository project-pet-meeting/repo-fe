import React, { useRef, useState } from 'react'
import imageCompression from "browser-image-compression";
import "../styled.scss";
import dog from "../../../assert/loginImage/dog.png"
import { useEffect } from 'react';

const PetInfo = () => {
  const [image, setImage] = useState([]);
  const [fileImage, setFileImage] = useState([]);
  const [select, setSelect] =useState("")
  const [kind, setKind] = useState(false)
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const nickname =sessionStorage.getItem("nicknameRef");
  const location = sessionStorage.getItem("locationRef");

  const dogChecked = () => {
    setChecked(true);
    setChecked2(false);
    setKind(true);
    setSelect("dog")
  };
  const catChecked = () => {
    setChecked2(true);
    setChecked(false);
    setKind(true);
    setSelect("cat")
  }

  const ageRef = useRef();
  const weightRef = useRef();

  //이미지 리사이징
  const compressImage = async (image) => {
    try{
      const options = {
        maxSizeMb: 1,
        maxWidthOrHeight: 600,
        alwaysKeepResolution : true, //품질만 낮추고 항상 너비와 높이 유지
      }
      return await imageCompression(image, options);
    } catch(e){
      console.log(e);
    };
  };

  //이미지 미리보기 및 리사이징
  const onChangeImg = async(e) => {
    const imageList = e.target.files;
    let imageLists = [...image];
    let imgFiles = [...fileImage];
    for (let i = 0; i < imageList.length; i++) {
      const nowImageUrl = URL.createObjectURL(e.target.files[i]);
      imgFiles.push(nowImageUrl);
    }
    for (let i = 0; i < imageList.length; i++) {
      const nowImageUrl1 = e.target.files[i];
      const compressedImage = await compressImage(nowImageUrl1);
      imageLists.push(compressedImage);
    }

    //이미지 개수 최대 1개까지 등록가능
    if (imageLists.length >= 2) {
      imageLists = imageLists.slice(1, 2);
    }
    if (imgFiles.length >= 2) {
      imgFiles = imgFiles.slice(1, 2);
    }
    setFileImage(imgFiles);
    setImage(imageLists);
  };


  const onAddInform = async (e) => {
    e.preventDefault();
    if (ageRef.current.value === "" || kind === false || weightRef.current.value === ""){
      alert("필수항목을 입력해주세요!")
      return;
    }
    const data = {
      nickname:nickname,
      location:location,
      age: ageRef.current.value,
      weight: weightRef.current.value,
      kind:select
      // nickname:nickname
    }; 
    console.log(data)
    let json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    const formData = new FormData();
    formData.append("image", image[0]);
    formData.append("data", blob);

    const payload = {
      formData: formData,
    };
    for (let value of payload.formData.values()) {
      console.log(value);
    }
  };
  // console.log(image)
  // console.log(fileImage)
  return (
    <>
      <div className='box'>
        <div className='login'>
          <p>펫 정보 입력</p>
        </div>
        <div className='petinfo'>
          {fileImage.length === 0
          ?(
            <img className='defaultImg' alt='default' src={dog}/>
           )
          :<img className='defaultImg' alt='petimage' src={fileImage[0]}/>
          }
          <label>
            <p className='petImageText'>나의 펫 사진 등록</p>
            <input
              className='petImage'
              type="file"
              name="imgUrl"
              accept="image/*"
              onChange={onChangeImg}
              id="image"
            />
          </label>
          <div className='petKind'>
            <button 
              className={
                checked === false
                ? 'dogKind'
                : 'dogSelect'
              }
              onClick={dogChecked}
            >
              강아지
            </button>
            <button 
              className={
                checked2 === false
                ? 'catKind'
                : 'catSelect'
              }
              onClick={catChecked}
            >
             고양이
            </button>
          </div>
          <input
            className='petAge'
            type='number'
            placeholder="반려동물 연령"
            ref={ageRef}
          />
          <input
            className='petWeight'
            type='number'
            placeholder="반려동물 몸무게"
            ref={weightRef}
          />
        </div>
        <div>
          <button className='clearButton' onClick={onAddInform}>완료</button>
        </div>
      </div>
    </>
  )
}

export default PetInfo
