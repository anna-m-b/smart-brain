import React from 'react';


function Navigation ({ onRouteChange, route }) {
    return(
        <nav style={{'display': 'flex', 'justifyContent': 'flex-end'}}>
           <p className={'f3 pa3 gray link underline dim pointer grow'} onClick={() => onRouteChange('signin')}>
           { route === 'home' ? 'Sign out'
            : 'Sign In'
            }

           </p>
           <p className={'f3 pa3 gray link underline dim pointer grow'} onClick={() => onRouteChange('register')}>Register</p>
        </nav>
    )
}

export default Navigation