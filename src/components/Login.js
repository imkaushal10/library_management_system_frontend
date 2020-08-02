import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Card, CardBody } from 'reactstrap';

import axios from 'axios';
import {Redirect} from 'react-router-dom';


export default class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            email: '',
            password: '',
            // role: '',
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
        email: this.state.email,
        password: this.state.password,
        // role: this.state.role
        }).then((res)=>{
            console.log(res);
            localStorage.setItem('token', res.data.token);
            this.setState({
                isloggedin: true,
            })
        }).catch(err=>console.log(err));
    }
    
    
    render() {
        let {email, password, isloggedin} = this.state;
        // if(isloggedin || role === 'admin'){
        //     return <Redirect to='/admindashboard' />
        // }
        if(isloggedin){
            return <Redirect to='/dashboard' />
        }
    
        return (
            <div className="d-flex justify-content-center loginform">    
            <Card className="bg-light mt-5"  style = {{width: "400px"}}>

            <h3 className="text-center">LOGIN</h3>

                <CardBody >
                <Form>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type='text' name="email" id="email" 
                        value={email} onChange= {this.handleChange}/>         
                    </FormGroup>

                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type='password' name="password" id="password" 
                        value={password} onChange= {this.handleChange}/>         
                    </FormGroup>

                    <Button className="btn btn-info" block onClick= {this.handleLogin}>Sign In</Button>
                </Form>
                </CardBody>  

                </Card>
            </div>
        )
    }
}
