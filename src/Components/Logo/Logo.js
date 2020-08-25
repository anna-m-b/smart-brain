import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain2.png';

function Logo() {
    return(
        <div className="ma4 mt0">
            <Tilt className="Tilt shadow-2 br3" 
            options={{ max : 60 }} 
            style={{ height: 200, width: 200, display: 'grid' }} >
                <div className="Tilt-inner" 
                style={{height: 130, width: 130, 
                        placeSelf: 'center', 
                        paddingBottom: '9rem'}}>
                        <img src={brain}/>
                </div>
            </Tilt>
        </div>
     
    )
}

export default Logo