import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className='center ma'>
      <div style={{display: 'flex', justifyContent: 'center'}} className='mt2'>
      
        <div style={{position: 'relative', width: '500px'}}>
          <img id='imageinput' alt='Your image will display here' src={imageUrl} width='500px' height='auto'/>
          <div className='bounding-box' style={{top: box.positionTop, 
                                                left: box.positionLeft, 
                                                width: box.boxWidth, 
                                                height: box.boxHeight}}> 
          </div>
       </div>
    
     </div>
    </div>
  );

}


export default FaceRecognition;