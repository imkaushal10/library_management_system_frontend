import React, { Component } from 'react';
import axios from 'axios';
import {Form, Input, Button, ListGroup, ListGroupItem} from 'reactstrap';

export default class Dashboard extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
            categories: [],
            categoryName: '',
            config: {
                headers: {'Authorization': localStorage.getItem('token')}
            }
        }
    }

    componentDidMount(){
       axios.get('http://localhost:3001/categories', this.state.config) 
       .then(res=>{
           console.log(res);
           this.setState({categories: res.data});
       }).catch(err=> console.log(err));
    }
    

    render() {  
        return (
            <div className="container">
                <Form>
                    <Input type="text" name="category" placeholder="category" />
                </Form>

                <Button color="info">Add Category</Button>
            <hr/>

            <ListGroup>
              {
                this.state.categories.map((category)=>{
                 return <ListGroupItem key= {category._id}>{category.name}</ListGroupItem>
                })
              } 
            </ListGroup>
            </div>

            
            // <div className="container">
            //     <Form>
            //         <FormGroup>
            //             <Label for="title">Title</Label>
            //             <Input type="text" name="title" placeholder="book title" />
            //          </FormGroup>

            //          <FormGroup>
            //             <Label>Author</Label>
            //             <Input type="text" name="author" placeholder="book author" />
            //          </FormGroup>

            //          <FormGroup>
            //             <Label>Publisher</Label>
            //             <Input type="text" name="publisher" placeholder="book publisher" />
            //          </FormGroup>

            //          <FormGroup>
            //             <Label>Number of Pages</Label>
            //             <Input type="text" name="numberofpages" placeholder="pages" />
            //          </FormGroup>

            //          <FormGroup>
            //             <Label>Format</Label><br/>
            //             <select type="text" name="format"> 
            //                 <option>Hardcover</option>
            //                 <option>Magazine</option>
            //                 <option>Article</option>
            //             </select>
            //          </FormGroup>

            //          <FormGroup>
            //             <Label>Published Year</Label>
            //             <Input type="number" name="published_year" placeholder="year" />
            //          </FormGroup>

            //          <FormGroup>
            //             <Label>Image</Label>
            //             <Input type="file" name="image"/>
            //          </FormGroup>
            //          <Button color="warning">Add Book</Button>
            //    </Form>
            // </div>
        )
    }
}
