import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Card, CardHeader, CardBody, CardFooter, Col, Row} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faList, faEdit, faTrash, faPlusCircle, faEye, faPlus} from '@fortawesome/free-solid-svg-icons'

import axios from 'axios';
// import { Redirect } from 'react-router-dom';


export default class AdminDashboard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            title: '',
            author: '',
            publisher: '',
            format: '',
            published_year: '',
            image: ''

            // isRegistered: false
        }
    }

    handleChange = (e)=>{
        this.setState({
        [e.target.name]: e.target.value    
        })
    }

    handleAddbook = (e)=>{
        axios.post('http://localhost:3001/books ', this.state)
        .then(res=>{
          console.log(res); 
        //   this.setState({
        //       isRegistered: true
        //   })
        }).catch(err=> console.log(err));
    }
    
    
    
    render() {
        let {title, author, publisher, format, published_year, image} = this.state;
        // if(isRegistered){
        //     return <Redirect to='/'/>;
        // }
        return (
        <div className="container">
            <Card className="bg-light mt-5" > 
            <CardHeader className="bg-info text-white"><FontAwesomeIcon icon={faPlus}/>Add New Book</CardHeader>
            <Form>
               <CardBody>  
                <Row form> 
                <Col md={6}>
                    <FormGroup as={Col}>
                        <Label for="title">Title</Label>
                        <Input type='text' name="title" id="title" placeholder="Enter Book Title"
                        value={title} onChange = {this.handleChange}/>         
                    </FormGroup>
                </Col>

                <Col md={6}>
                    <FormGroup as={Col}>
                        <Label for="author">Author</Label>
                        <Input type='text' name="author" id="author" placeholder="Enter Book Author" 
                        value={author} onChange= {this.handleChange}/>         
                    </FormGroup>
                </Col> 
                </Row>      

                <Row form>
                <Col md={6}>
                <FormGroup>
                        <Label for="published_year">Year of Publication</Label>
                        <Input type='number' name="published_year" id="published_year" placeholder="Enter Published Year" 
                        value={published_year} onChange= {this.handleChange}/>         
                    </FormGroup>
                </Col> 

                <Col md={6}> 
                <FormGroup>
                        <Label for="format">Format</Label>         
                        <Input type='text' name="format" id="format" placeholder="Enter Book Format"
                        value={format} onChange= {this.handleChange}/>         
                    </FormGroup>
                </Col>
                </Row>

                <Row form>  
                <Col md={6}> 
                    <FormGroup >
                        <Label for="publisher">Publisher</Label>
                        <Input type='text' name="publisher" id="publisher" placeholder="Enter Book Publisher"
                        value={publisher} onChange= {this.handleChange}/>         
                    </FormGroup>
                </Col>
              
                <Col md={6}>
                    <FormGroup>
                        <Label for="image">Image</Label>
                        <Input type='file' name="image" id="image" 
                        value={image} onChange= {this.handleChange}/>         
                    </FormGroup>
                </Col>
                </Row>
                </CardBody>
            </Form>

            <CardFooter style={{textAlign:"right"}}>
               <Button color='info' onClick= {this.handleAddbook}>ADD</Button>
            </CardFooter>
            </Card>  
              
        </div>
        )
    }
}
