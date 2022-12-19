import React from 'react'
import './styled.scss'
const PostBox = () => {
    return (
        <div className='warp'>
            <div>
                <div className='dec'>디스크립션 adsfuiadosfuiaopdufioadpsufiaopsdufopasdufpaosdufopasdiufipoasufiopasudfipoasudiofpaufopasuf</div>
                <div className='cartegory'>카테고리</div>
            </div>
            <div>
                <div>
                    <p>닉네임</p>
                    <p>반려동물 종</p>
                    <p>지역(동단위)</p>
                    <p>작성 시간</p>
                </div>
                <div>
                    <p>좋아요</p>
                    <p>댓글 수</p>
                </div>
            </div>
        </div>
    )
}

export default PostBox