import React, { Component } from 'react'


export default class ErrorBoundary extends Component {

state={hasError:false}

static getDerivedStateFromError(error){
    return {
        hasError:true
    }
}


    render() {

          async function userError() {
            window.location.href = "/";
          } 

     


        if (this.state.hasError) {
            userError();
            window.alert("Username and password don't match to any account, please verify your credentials or Register") 
        }
        
        return this.props.children
    }
}
