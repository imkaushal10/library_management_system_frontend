import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';


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

        <div className="d-flex justify-content-center">    
            <Card className="bg-light mt-5"  style = {{width: "400px"}}>
            <CardHeader className="bg-info text-white"><FontAwesomeIcon icon={faUserPlus}/>Register</CardHeader>
            <Form>
                <CardBody> 
                <Row form> 
                <Col md={6}>
                        <FormGroup>
                            <Label for="firstname">Firstname</Label>
                            <Input type='text' name="firstname" id="firstname" 
                            value={firstname} onChange = {this.handleChange}/>         
                        </FormGroup>
                 </Col>       
                 <Col md={6}> 
                        <FormGroup>
                            <Label for="lastname">Lastname</Label>
                            <Input type='text' name="lastname" id="lastname" 
                            value={lastname} onChange= {this.handleChange}/>         
                        </FormGroup>
                </Col>  
                </Row>        
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

                        <Button className="btn btn-info" block onClick= {this.handleRegister}>Sign Up</Button>
                </CardBody>
                </Form>
            </Card>

        </div>      
        )
    }
}
