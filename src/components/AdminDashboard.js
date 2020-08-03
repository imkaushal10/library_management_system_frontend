import React, { Component } from 'react';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Form, FormGroup, Label, Input, Button, Card, CardHeader, CardBody, CardFooter, Col, Row} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'

import axios from 'axios';
// import { Redirect } from 'react-router-dom';

toast.configure();

export default class AdminDashboard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            title: '',
            author: '',
            publisher: '',
            format: '',
            published_year: '',
            image: null

            // isRegistered: false
        }
    }

    handleChange = (e)=>{
        this.setState({
        [e.target.name]: e.target.value    
        })
    }

    handleImageChange = (e)=>{
        this.setState({
            image: e.target.files[0]
        })
    }

    handleAddbook = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('author', this.state.author);
        formData.append('publisher', this.state.publisher);
        formData.append('format', this.state.format);
        formData.append('publlished_year', this.state.published_year);
        formData.append('image', this.state.image, this.state.image.name);

        axios.post('http://localhost:3001/books ', formData, 
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        })
        // .then(()=> this.props.onCreate())
        .then((res)=>{
          console.log(res); 
          toast('Book Added Successfully')
        //   this.setState({
        //       isRegistered: true
        //   })
        }).catch(err=> console.log(err));
    };
    
    
    
    render() {
        let {title, author, publisher, format, published_year} = this.state;
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
                         onChange= {this.handleImageChange}/>         
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
