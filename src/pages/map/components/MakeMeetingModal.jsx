import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MakeMeetingModal = () => {
  
  const navigate = useNavigate();
  const location = useLocation();

  console.log('location on modal', location);

  // useEffect(() => {
    
  // }, [])

  return(
    <div style={{
      width:'100vw',
      height: '100vh',
      position: 'absolute',
      top: '0',
      backgroundColor: 'rgba(91, 112, 131, 0.4)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        width: '350px',
        height: '200px',
        backgroundColor: 'white',
        borderRadius: '5px',
      }}>
        <div>
          <p>주변에 아직 펫 미팅이 없어요 🐾</p>
          <p>새 미팅을 만드시겠습니까?</p>
        </div>
        <div>
          <button onClick={() => navigate('/')}>아니오</button>
          <button onClick={() => {navigate('/mapform')}}>네</button>
        </div>
      </div>
    </div>
  );
};

export default MakeMeetingModal;