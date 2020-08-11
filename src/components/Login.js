import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Card, CardBody, CardHeader, CardFooter } from 'reactstrap';
import axios from 'axios';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Redirect} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';

toast.configure();

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
            toast('Welcome' + this.state.email)
        }).catch(err=>console.log(err));
    }
    
    
    render() {
        let {email, password, isloggedin} = this.state;
        // if(isloggedin || role === 'admin'){
        //     return <Redirect to='/admindashboard' />
        // }
       
        if (isloggedin && !(email === "admin123@gmail.com")){
            return <Redirect to='/dashboard' />
        }
        
        if (isloggedin && (email === "admin123@gmail.com")){
            return <Redirect to='/admindashboard'/>
        }

        return (
            <div className="d-flex justify-content-center loginform">    
            <Card className="bg-light mt-5"  style = {{width: "350px"}}>

            <CardHeader className="bg-info text-white text-center"><FontAwesomeIcon icon={faUser}/>LOGIN</CardHeader>

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

                </Form>
                </CardBody>  

                <CardFooter>
                   <Button className="btn btn-info" block onClick= {this.handleLogin}>Sign In</Button>
                </CardFooter>

                </Card>
            </div>
        )
    }
}
