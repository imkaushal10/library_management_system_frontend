import React, { Component, Fragment } from 'react';
import axios from 'axios';
import {Table, Card, CardBody, CardHeader, ButtonGroup, Button, Navbar} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faList, faEdit, faTrash, faPlusCircle, faEye} from '@fortawesome/free-solid-svg-icons'
import Navigationbar from './Navigationbar'



export default class Dashboard extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
            books: [],
            // categoryName: '',
            config: {
                headers: {'Authorization': localStorage.getItem('token')}
            }
        }
    }

    componentDidMount(){
       this.getbooks();
    }

    getbooks(){
        axios.get('http://localhost:3001/books', this.state.config) 
       .then(res=>{
           console.log(res);
           this.setState({books: res.data});
       }).catch(err=> console.log(err));
    }
    

    render() {  
        return (
      
            <div className="container">
            <Card className="mt-5 table-responsive ">
                <CardHeader className="bg-info text-white"><FontAwesomeIcon icon={faList}/>Book Lists</CardHeader>
                <CardBody>
                     <Table bordered hover striped>
                        <thead className="bg-info text-white">
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Publisher</th>
                                <th>Format</th>
                                <th>Published Year</th>
                                <th>Review</th>
                                <th>Actions</th>
                            </tr>    
                        </thead> 

                        <tbody className="responsive">
                        {
                            this.state.books.length === 0?
                            <tr align="center">
                                <td colSpan="9">Books Available.</td>
                            </tr>:
                            this.state.books.map((book)=>(
                                <tr key = {book._id}>
                                    <td>{book.image}</td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.publisher}</td>
                                    <td>{book.format}</td>
                                    <td>{book.published_year}</td>
                                    <td align="center">
                                        <ButtonGroup>
                                            <Button size="sm" color="outline-primary"><FontAwesomeIcon icon={faPlusCircle}/></Button>
                                            <Button size="sm" color="outline-primary"><FontAwesomeIcon icon={faEye}/></Button>
                                        </ButtonGroup>
                                    </td>
                                    <td>
                                        <ButtonGroup>
                                            <Button size="sm" color="outline-primary"><FontAwesomeIcon icon={faEdit}/></Button>
                                            <Button size="sm" color="outline-danger"><FontAwesomeIcon icon={faTrash}/></Button>
                                        </ButtonGroup>
                                    </td>

                                </tr>    
                            ))
                        }                            
                        </tbody>  
                     </Table>    
                </CardBody> 
            </Card>   

            </div>

        )
    }
}
