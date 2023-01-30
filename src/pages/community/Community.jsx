import React from 'react'
import PostBox from './component/PostBox'
import './component/styled.scss'
const Community = () => {




  return (
    <div>
        <div className='header-bar'>
            <div>
                <div className='flex side-bar'>
                    <p>채팅</p>
                    <p>알림</p>
                    <p>검색</p>
                </div>
            </div>
            <div>
                <h2>지역(시단위 구단위)</h2>
            </div>
            <div>
                <ul className='flex cartegory-box'>
                    <li>카테고리</li>
                    <li>카테고리</li>
                    <li>카테고리</li>
                    <li>카테고리</li>

                </ul>
            </div>
        </div>
        <PostBox/>
    </div>
  )
}

export default Community