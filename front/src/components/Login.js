import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import './css/Login.css';



class Login extends Component {

    state = {
        credentials: {
            username: '',
            password: ''
        },
        isLoginView: true
    }
    inputChanged = event => {
        let cred = this.state.credentials;
        cred[event.target.name] = event.target.value;
        this.setState({credentials: cred});
    }


    catch (error) {
                
    }

    login = event => {
        if(this.state.isLoginView) {
            fetch(`${process.env.REACT_APP_API_URL}/auth/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(this.state.credentials)
                }).then( resp => resp.json())
                .then( res => {
                    this.props.cookies.set('ir-token', res.token);
                    window.location.href = "/images";
                })
                .catch( error => console.log(error))
        } else {
            fetch(`${process.env.REACT_APP_API_URL}/api/users/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(this.state.credentials)
                }).then( resp => resp.json())
                .then( res => {
                    this.setState({isLoginView: true});
                })
                .catch( error => console.log(error)) } }  


    toggleView = () => {
        this.setState({isLoginView: !this.state.isLoginView});
    }

    render(){
        return (

            
      
        <div className='container'>
            <div className='row justify-content-center'>
                <div className=' col-auto'>
                    <div className=' wrapper' >
                        <h1 className='h1-login'>
                            { this.state.isLoginView ? 'Login' : 'Register'}
                        </h1>

                        <span>Username</span><br/>
                        <input type="text" name="username" value={this.state.credentials.username}
                            onChange={this.inputChanged}/><br/>
                        
                        <span>Password</span><br/>
                        <input type="password" name="password" value={this.state.credentials.password}
                            onChange={this.inputChanged}/><br/>
                        
                        <span className='d-flex align-content-center'>  
                        <button onClick={this.login}>
                            { this.state.isLoginView ? 'Login' : 'Register'}
                        </button>
                        
                        <p onClick={this.toggleView}>
                            { this.state.isLoginView ? 'Register' : 'Back'}
                        </p>
                        
                        </span>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default withCookies(Login);