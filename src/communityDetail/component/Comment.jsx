import React from 'react'
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
const Comment = () => {
    
  return (
    <div className='flex width'>
        <div className='profile-img'></div>
        <div className='width'>
            <div className='flex'>
            <p>닉네임</p>
            <p>반려동물 종</p>
            </div>
            <div className='detail-dec'>디스크립션 디스크립션</div>
        </div>
    </div>
  )
}

export default Comment