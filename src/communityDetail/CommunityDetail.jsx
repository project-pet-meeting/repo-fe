import React from 'react'
import Comment from './component/Comment'

const CommunityDetail = () => {
    return (
        <div>
            <div>
                <div className='flex'>
                    <p>닉네임</p>
                    <p>반려동물 종</p>
                </div>
                <div className='flex profile-box'>
                    <div className='profile-img'></div>
                    <div className='cartegory'>
                        <p>카테고리</p>
                    </div>
                </div>
            </div>
            <div className='detail-decbox'>
            <div className='detail-dec'>디스크립션</div>
            <p>조회수</p>
            </div>
            <div className='flex input-box'>
                <input type="text" />
                <button>댓글 작성</button>
            </div>
            <Comment/>
        </div>
    )
}

export default CommunityDetail