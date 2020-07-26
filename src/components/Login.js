import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import axios from 'axios';
import {Redirect} from 'react-router-dom';


export default class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            username: '',
            password: '',
            isloggedin: false
        }
    }

    handleChange = (e)=>{
        this.setState({
        [e.target.name]: e.target.value    
        })
    }

    handleLogin = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:3001/users/login', { 
        username: this.state.username,
        password: this.state.password
        }).then((res)=>{
            console.log(res);
            localStorage.setItem('token', res.data.token);
            this.setState({
                isloggedin: true
            })
        }).catch(err=>console.log(err));
    }
    
    
    render() {
        let {username, password, isloggedin} = this.state;
        if(isloggedin){
            return <Redirect to='/dashboard' />
        }
        return (
            <div className='container'>
                <Form>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input type='text' name="username" id="username" 
                        value={username} onChange= {this.handleChange}/>         
                    </FormGroup>

                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type='password' name="password" id="password" 
                        value={password} onChange= {this.handleChange}/>         
                    </FormGroup>

                    <Button color='primary' block onClick= {this.handleLogin}>Sign In</Button>
                </Form>
            </div>
        )
    }
}
