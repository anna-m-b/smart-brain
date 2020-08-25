import React from 'react';
import './ImageUrlInput.css';


function ImageUrlInput ({ handleChange, onSubmit, getEntries }) {
    return(
    <React.Fragment>
      
        
        <p className="f4">
        Paste an image URL here and our Smart Brain-Machine will detect any faces
      </p> 
      <div className="center-flex">
      <div className="form center-flex pa5 pt4 pb4 br2 shadow-5">
         
          <input type="text" className="f4 pa2 center-flex w-70 br1" onChange={handleChange} />
          <button className="w-30 grow link ph3 pv2 dib white bg-light-purple" onClick={onSubmit}>Detect</button>
          </div>
      </div>
    </React.Fragment>

    )
}

export default ImageUrlInput