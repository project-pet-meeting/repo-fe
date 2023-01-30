import React from "react";
import { IoPaw } from "react-icons/io5";
import { MdGpsFixed } from "react-icons/md"



const MapBtn = ({onClick, icons, style}) => {

  return(
    <div>
      <button
        style={{
          width:'60px', 
          height:'60px', 
          backgroundColor:'#00E690',
          border:'1px solid white', 
          borderRadius:'50%',
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          ...style
        }}
        onClick={onClick}
      >
        {icons === 'paw' 
          ? <IoPaw
            style={{width:'50%', height:'50%'}}
          />
          : icons === 'gps'
          ? <MdGpsFixed
            style={{width:'50%', height:'50%'}}
          />
          : null
        }
        
      </button>
    </div>
  )
};

export default MapBtn;