import React, {useState} from 'react'


const SignIn = ({ onRouteChange, loadUser }) => {
  const [signInInput, setSignInInput] = useState({email: "", password: ""})


 function handleChange(event) {
    const { name, value } = event.target
    setSignInInput(prevInput => ({...prevInput, [name]: value}))
  }

  async function onSubmitSignIn() {
    const resp = await fetch('http://localhost:3001/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(signInInput)
    })
     const user = await resp.json()
      if (user.id) {
        loadUser(user)
        onRouteChange('home')
      } else {
        alert('Opps! Seems your email or password is incorrect. Perhaps you need to register?')
      }
  }
  

  return (

     <article className="br3 ba b--black-10 shadow-5 mv4 w-200 w-50-m w-25-l mw6 center">
  
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input type="email" 
                        name="email" 
                        value={signInInput.email} 
                        id="email-address" 
                        onChange={handleChange}
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input  type="password" 
                        value={signInInput.password}
                        name="password"  
                        id="password"
                        onChange={handleChange}
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"/>
              </div>
            
              </fieldset>
              <div className="">
                <input onClick={onSubmitSignIn}
                      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                      type="submit" 
                      value="Sign in"/>
              </div>
              <div className="lh-copy mt3">
                <p onClick={() => onRouteChange('register')} 
                  className="f6 link dim black db pointer grow">
                  Register</p>
            
            </div>
          </div>
        </main>
      </article>


  )
}

export default SignIn