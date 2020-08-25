import React, {useState} from 'react';


const Register = ({ onRouteChange, loadUser }) => {
  const [registerInput, setRegisterInput] =  useState({ name: "", email: "", password: ""})

  function handleChange(event) {
    const { name, value} = event.target;
    setRegisterInput(prevRegisterInput => ({...prevRegisterInput, [name]: value}))
  }

  async function onRegisterSubmit() {
    const resp = await fetch('https://frozen-castle-11524.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(registerInput)
    })
    const user = await resp.json()
   
   if (user.name) {
      loadUser(user)
      alert(`Welcome to Smart Brain ${user.name}! Happy to have you!`)
      onRouteChange('home')
    } else {
      alert('Please check you have entered a valid name, email address and password')
    }
  }

  return(
    <article className="br3 ba b--black-10 shadow-5 mv4 w-200 w-50-m w-25-l mw6 center">
 
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
            <input 
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
              type="text" 
              name="name"
              value={registerInput.name} 
              onChange={handleChange}
              id="name"/>
           </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input 
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="email" 
                name="email"  
                value={registerInput.email} 
                onChange={handleChange}
                id="email-address"/>
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input 
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="password" 
                name="password" 
                value={registerInput.password}  
                onChange={handleChange}
                id="password"/>
            </div>
           
          </fieldset>
          <div className="">
            <input onClick={onRegisterSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
          </div>
        </div>
      </main>
    </article>


  )
}

export default Register