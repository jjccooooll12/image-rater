import React, { Component } from 'react'


export default class ErrorImage extends Component {

state={hasError:false}

static getDerivedStateFromError(error){
    return {
        hasError:true
    }
}


    render() {

          async function userError() {
            window.location.href = "/images";
          } 


        if (this.state.hasError) {

            userError();
            window.alert("Pls upload only .jpg or .png files")           
        }
        
        return this.props.children
    }
}
