import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import axios from 'axios';
import { Redirect } from 'react-router-dom';


export default class RegisterForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            isRegistered: false
        }
    }

    handleChange = (e)=>{
        this.setState({
        [e.target.name]: e.target.value    
        })
    }

    handleRegister = (e)=>{
        axios.post('http://localhost:3001/users/register ', this.state)
        .then(res=>{
          console.log(res); 
          this.setState({
              isRegistered: true
          })
        }).catch(err=> console.log(err));
    }
    
    
    render() {
        let {email, password, firstname, lastname, isRegistered} = this.state;
        if(isRegistered){
            return <Redirect to='/'/>;
        }
        return (
            <div className='container'>
                <Form>
                    <FormGroup>
                        <Label for="firstname">Firstname</Label>
                        <Input type='text' name="firstname" id="firstname" 
                        value={firstname} onChange = {this.handleChange}/>         
                    </FormGroup>

                    <FormGroup>
                        <Label for="lastname">Lastname</Label>
                        <Input type='text' name="lastname" id="lastname" 
                        value={lastname} onChange= {this.handleChange}/>         
                    </FormGroup>
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

                    <Button color='primary' block onClick= {this.handleRegister}>Sign Up</Button>
                </Form>
            </div>
        )
    }
}
