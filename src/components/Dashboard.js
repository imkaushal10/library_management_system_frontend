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

        )
    }
}
