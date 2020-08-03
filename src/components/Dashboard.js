import React, { Component } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Table, Card, CardBody, CardHeader, CardFooter, ButtonGroup, Button, Form, FormGroup, Label, Input, Modal, ModalFooter, ModalBody, ModalHeader} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faList, faEdit, faTrash, faPlusCircle, faEye} from '@fortawesome/free-solid-svg-icons'
import Navigationbar from './Navigationbar'



export default class Dashboard extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
            books: [],
            reviewModal: false,
            description:'',

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
           this.setState({books: res.data})
       }).catch(err=> console.log(err));
    }

    
    // addingreviewmodal
    handleReview = (e) =>{
        axios.post('http://localhost:3001/books/:bookid/reviews', this.state.config) 
       .then(res=>{
           console.log(res);
           toast('Review Added Sucessfully')
       }).catch(err=> console.log(err)); 
    }

    handleChange = (e)=>{
        this.setState({
        [e.target.name]: e.target.value    
        })
    }


    toggleReviewModal(){
        this.setState({
            reviewModal: true
        })
    }



    // addingreviewmodal    

    render() { 
        
        return (
         <div className="container">

        {/* AddReviewModal      */}
    
    
        <Modal isOpen={this.state.reviewModal} toggle={this.toggleReviewModal.bind(this)}>
            <ModalHeader toggle={this.toggleReviewModal.bind(this)}>Review</ModalHeader>
               <ModalBody>
            
                <Form>
                    <FormGroup>
                        <Label for="description">Your View on this book</Label>
                        <Input type='text' name="description" id="description" 
                        value= {this.state.description} onChange= {this.handleChange} />         
                    </FormGroup>

                </Form>
            
               </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.handleReview}>Submit</Button>{' '}
                <Button color="danger">Cancel</Button>
            </ModalFooter>
        </Modal> 

        {/* AddReviewModal       */}

            <Card className="mt-5 table-responsive ">
                <CardHeader className="bg-info text-white"><FontAwesomeIcon icon={faList}/>Book Lists</CardHeader>
                <CardBody>
                     <Table bordered hover striped>
                        <thead className="bg-info text-white text-center">
                            <tr>
                                <th>Cover<br/>Image</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Publisher</th>
                                <th>Format</th>
                                <th>Published Year</th>
                                <th>Review</th>
                                <th>Actions</th>
                            </tr>    
                        </thead> 
                        {/* <img height="50" width="43" alt="logo"
             src={this.state.pic}  */}
                        <tbody className="responsive text-center">
                        {
                            this.state.books.length === 0?
                            <tr align="center">
                                <td colSpan="9">Books Available.</td>
                            </tr>:
                            this.state.books.map((book)=>(
                                <tr key = {book._id}>
                                    <td> 
                                    <img src={`image;base64,${book.image.name}`} 
                                    alt={book.image.name}/>) 
                                    </td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.publisher}</td>
                                    <td>{book.format}</td>
                                    <td>{book.published_year}</td>
                                    <td align="center">
                                        <ButtonGroup>
                                            <Button onClick={this.toggleReviewModal.bind(this)} size="sm" color="outline-primary"><FontAwesomeIcon icon={faPlusCircle}/></Button>
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
