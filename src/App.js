import React from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageUrlInput from './Components/ImageUrlInput/ImageUrlInput';
import UserRank from './Components/UserRank/UserRank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import SignIn from './Components/SignIn/SignIn'
import Register from './Components/Register/Register';




const particlesOptions = {
  particles: {
   number: {
     value: 100,
     density: {
       enable: true,
       value_area: 500
     }
    }   
  }
}

const initialState = {
            input: '',
            imageUrl: '',
            box: {},
            user: {
              id: '',
              name: '',
              email: '',
              entries: 0,
              joined: ''
            },
            route: 'signin'
}

class App extends React.Component {

  state = initialState;

  async componentDidMount() {
    const resp = await fetch('https://frozen-castle-11524.herokuapp.com/')
    const users = await resp.json()
    console.log('this.state.user in componentDidMount', this.state.user)

  }


  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })

  }

  calculateFaceLocation = (data) => {
     const clarifaiFace =  data.outputs[0].data.regions[0].region_info.bounding_box;
     const image = document.getElementById('imageinput');
     const width = Number(image.width) // Number() makes sure it is a number
     const height = Number(image.height) 
     
     
     return  { 
              positionLeft: clarifaiFace.left_col * width,
              positionTop: clarifaiFace.top_row * height,
              boxWidth: (clarifaiFace.right_col * width) - (clarifaiFace.left_col * width),
              boxHeight: (clarifaiFace.bottom_row * height) - (clarifaiFace.top_row * height)
            }             
 }

 displayFaceBox = (box) => {
   this.setState({box})
 }

 updateEntries = (numEntries) => {
   this.setState(Object.assign(this.state.user, {entries: numEntries}))
 }

 handleChange = (e) => {
   this.setState({ input: e.target.value })
   
 }
//https://docs.clarifai.com/api-guide/predict/prediction-parameters#by-model-version-id

 onSubmit = () => {
  this.setState({imageUrl: this.state.input})
  fetch('https://frozen-castle-11524.herokuapp.com/mageUrl', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({input: this.state.input})
  })
      .then(response => response.json())
      .then(response => {
        if (response) {
        this.getEntries()
        this.displayFaceBox(this.calculateFaceLocation(response))
        }})
      .catch(err =>  {
        alert('Please check the format of your url: it should end in .jpg or other image file format')
        console.log(err)
      })    
 }

 getEntries = () => {
    fetch('https://frozen-castle-11524.herokuapp.com/image', {
    method: 'put',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({id: this.state.user.id})
    })
  .then(resp => resp.json())
  .then(count=> {
     this.updateEntries(count)
    })
    .catch("something went wrong")
 }



 onRouteChange = (route) => {
   if (route == 'signin') {
     this.setState(initialState)
   }
      this.setState({route: route})
  }
 


render() {

  const { route, user, box, imageUrl } = this.state;

    return (
      <React.Fragment>
        <Particles className="particles"
          params={particlesOptions}
        />

        <Navigation onRouteChange={this.onRouteChange} route={route}/>
        
        { route === 'signin' ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
             
        : (route === 'register') ? <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             
        : <React.Fragment>
            
            <Logo/>
            <UserRank name={user.name} entries={user.entries}/>
            <ImageUrlInput handleChange={this.handleChange} onSubmit={this.onSubmit} getEntries={this.getEntries} />
            <FaceRecognition imageUrl={imageUrl} box={box}/>
            </React.Fragment>
        }
      </React.Fragment>
    );
  }
}

export default App;
