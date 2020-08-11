import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Card, CardBody, CardHeader, CardFooter, Col, Row } from 'reactstrap';

import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
// import { toast } from 'react-toastify';


export default class RegisterForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            errors: {},
            isRegistered: false
        }
    }

    handleValidation(){
        let {firstname, lastname, email, password} = this.state;
        let errors = {};
        let formIsValid = true;

        //firstname
        if(!firstname){
           formIsValid = false;
           errors["firstname"] = "Required";
        }

        // if(typeof firstname !== "undefined"){
        //    if(!firstname.match(/^[a-zA-Z]+$/)){
        //       formIsValid = false;
        //       errors["firstname"] = "Only letters";
        //    }        
        // }

        //lastname
        if(!lastname){
            formIsValid = false;
            errors["lastname"] = "Required";
        }


        //Email
        if(!email){
           formIsValid = false;
           errors["email"] = "Required";
        }

        if(typeof email !== "undefined"){
           let lastAtPos = email.lastIndexOf('@');
           let lastDotPos = email.lastIndexOf('.');

           if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
              formIsValid = false;
              errors["email"] = "Email is not valid";
            }
       }  

       //password
       if(!password){
            formIsValid = false;
            errors["password"] = "Required";
        }

        

       this.setState({errors: errors});
       return formIsValid;
   }


    handleChange = (e)=>{
        this.setState({
        [e.target.name]: e.target.value    
        })
    }

    handleRegister = (e)=>{
        if(this.handleValidation()){
        axios.post('http://localhost:3001/users/register ', this.state)
        .then(res=>{
          console.log(res); 
          this.setState({
              isRegistered: true
          })
        }).catch(err=> console.log(err));
    }
    // }else{
    //     toast('Please fill the required fields')
    }
    

    
    render() {
        let {email, password, firstname, lastname, isRegistered} = this.state;
        if(isRegistered){
            return <Redirect to='/'/>;
        }
        return (

        <div className="d-flex justify-content-center">    
            <Card className="bg-light mt-3"  style = {{width: "400px"}}>
            <CardHeader className="bg-info text-white text-center"><FontAwesomeIcon icon={faUserPlus}/>REGISTER</CardHeader>
            <Form>
                <CardBody> 
                <Row form> 
                <Col md={6}>
                        <FormGroup>
                            <Label for="firstname">Firstname</Label>
                            <Input type='text' name="firstname" id="firstname" 
                            value={firstname} onChange = {this.handleChange}/> 
                            <span style={{color: "red"}}>{this.state.errors["firstname"]}</span>
        
                        </FormGroup>
                 </Col>       
                 <Col md={6}> 
                        <FormGroup>
                            <Label for="lastname">Lastname</Label>
                            <Input type='text' name="lastname" id="lastname" 
                            value={lastname} onChange= {this.handleChange}/>  
                            <span style={{color: "red"}}>{this.state.errors["lastname"]}</span>       
                        </FormGroup>
                </Col>  
                </Row>        
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type='text' name="email" id="email" 
                            value={email} onChange= {this.handleChange}/> 
                            <span style={{color: "red"}}>{this.state.errors["email"]}</span>        
                        </FormGroup>

                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type='password' name="password" id="password" 
                            value={password} onChange= {this.handleChange}/>  
                            <span style={{color: "red"}}>{this.state.errors["password"]}</span>       
                        </FormGroup>

                </CardBody>
                </Form>
                
                <CardFooter>
                   <Button className="btn btn-info" block onClick= {this.handleRegister}>Sign Up</Button>
                </CardFooter>
                
            </Card>

        </div>      
        )
    }
}
