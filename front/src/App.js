import React, { Component } from 'react'
import './App.css';
import Carousel from './components/Carousel'
import Footer from './components/Footer';
import 'font-awesome/css/font-awesome.min.css';
import { withCookies } from 'react-cookie';
import ErrorBoundary from './components/ErrorBoundary';
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body, html {
    background-color: #282c34;
    background-image:none;
    color:white
  }
`

class App extends Component {

  state = {
    images: [],
    clickedImage:null,
    last_clickedImage:null,
    editedImage:null,
    highlighted:-1,
    mount:null,
    token: this.props.cookies.get('ir-token')
  }


  getImages = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/images/`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${this.state.token}`
      }}
    ) 
    .then(res => res.json())
    .then(this.setState({last_clickedImage:this.state.clickedImage}))
    .then(res => this.setState({images:res, clickedImage:null}))
    .catch(e => console.log(e))
  }


  onMount = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/images/`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${this.state.token}`
      }}
    ) 
    .then(res => res.json())
    .then(res => this.setState({images:res, mount:null}))
    .then(res => this.setState({clickedImage:this.state.images[this.state.images.length -1]}))
    .catch(e => console.log(e))
  }

  componentDidMount() {
    if (this.state.token) {
    this.getImages()}
    else {
      window.location.href = '/';
    }
  }


  handleClick = img => {
    this.setState({clickedImage: img, editedImage:null});
    
  }

  deleteImage = selectedImage => {
    const images = this.state.images.filter(img => img.id !== selectedImage.id);
    this.setState({images:images, clickedImage: null})
  }

  updateImage = img => {
    this.setState({editedImage:img})
  }

  newImage = () => {
    this.setState({editedImage: {location: '', description: ''} });
  }

  cancelForm = () => {
    this.setState({editedImage: null});
  }

  highlightRate = high => evt => {
    this.setState({highlighted: high});
}

 sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
}

settingStars = m => {
  this.setState({mount: true});
  this.sleep(4000).then(() => {
  this.setState({clickedImage:this.state.last_clickedImage})
  this.setState({mount: null, highlighted:-1});
})
}



  render() {
    return ( 

      <div>
          <GlobalStyle/>

            <h1 className='title'><i className="fa fa-camera incline"></i> Image Rater</h1> 

            <ErrorBoundary>
            <Carousel images={this.state.images} handleClick={this.handleClick}
             clickedImage={this.state.clickedImage} deleteImage={this.deleteImage} 
             updateImage={this.updateImage} editedImage={this.state.editedImage}
             cancelForm={this.cancelForm} newImage={this.newImage} getImages={this.getImages} 
             highlightRate={this.highlightRate} highlighted={this.state.highlighted}
             token={this.state.token} settingStars={this.settingStars} 
             mount={this.state.mount}   />
            </ErrorBoundary>

          
            <Footer/>
            </div>
          
    )
  }
}
export default withCookies(App);