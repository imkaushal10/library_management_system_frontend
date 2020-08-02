import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Card, CardBody } from 'reactstrap';

import axios from 'axios';
// import { Redirect } from 'react-router-dom';


export default class AdminDashboard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            title: '',
            author: '',
            publisher: '',
            numberofpages: '',
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
        let {title, author, publisher, numberofpages, published_year, image} = this.state;
        // if(isRegistered){
        //     return <Redirect to='/'/>;
        // }
        return (
            <div className='d-flex justify-content-center container'>
            <Card className="bg-light mt-5"  style = {{width: "400px"}}> 
               <CardBody>  
                <Form>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type='text' name="title" id="title" 
                        value={title} onChange = {this.handleChange}/>         
                    </FormGroup>

                    <FormGroup>
                        <Label for="author">Author</Label>
                        <Input type='text' name="author" id="author" 
                        value={author} onChange= {this.handleChange}/>         
                    </FormGroup>
                    <FormGroup>
                        <Label for="publisher">Publisher</Label>
                        <Input type='text' name="publisher" id="publisher" 
                        value={publisher} onChange= {this.handleChange}/>         
                    </FormGroup>

                    <FormGroup>
                        <Label for="numberofpages">No of Pages</Label>
                        <Input type='number' name="numberofpages" id="numberofpages" 
                        value={numberofpages} onChange= {this.handleChange}/>         
                    </FormGroup>

                    <FormGroup>
                        <Label for="published_year">Year of Publication</Label>
                        <Input type='number' name="published_year" id="published_year" 
                        value={published_year} onChange= {this.handleChange}/>         
                    </FormGroup>

                    <FormGroup>
                        <Label for="image">Image</Label>
                        <Input type='file' name="image" id="image" 
                        value={image} onChange= {this.handleChange}/>         
                    </FormGroup>

                    <Button color='primary' block onClick= {this.handleAddbook}>ADD</Button>
                </Form>
                </CardBody>
            </Card>    
            </div>
        )
    }
}
