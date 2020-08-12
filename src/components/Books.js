import React, { Component } from 'react';
import axios from 'axios';
// import MyToast from './MyToast'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Table, Card, CardBody, CardHeader, ButtonGroup, Button
    , Modal, ModalBody, ModalHeader} from 'reactstrap';   
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faList, faEdit, faTrash,faEye, faCheckCircle, faWindowClose} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import Navigation from './Navigation'



toast.configure();
export default class Dashboard extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
            books: [],
            reviews:[],
            bookings: [],
            reviewModal: false,
            reviewsViewModal: false,
            BookreservesViewModal: false,
            // Authorization: localStorage.getItem('token') 
            config: {
                headers: {'authorization': localStorage.getItem('token')}
            }
        }
    }

    componentDidMount(){
       this.getbooks();
        
         
    //    this.getreviews(); 
    }


    getbooks(){
        axios.get('http://localhost:3001/books', this.state.config) 
       .then(res=>{
           console.log(res);
           this.setState({books: res.data})
       }).catch(err=> console.log(err));
    }

    // UpdateBook= (bookid) =>{
    
    // //    toast('Updated')
    // }

    RemoveBook= (bookid) =>{
        axios.delete('http://localhost:3001/books/'+bookid)
        .then (res =>{    

            toast('Book Deleted Successfully');
            // if(res.data != null){
            //     this.setState({"show": true})
            //     setTimeout(() => this.setState({"show": false}), 3000);
             this.setState({
                books: this.state.books.filter(book => book._id !== bookid)
            })
            // }else{
            //     this.setState({"show": false});
            // }  

        }).catch(err=> console.log(err));
        
    }

    // booking
    // ReserveBook=(bookId)=>{
    //     // toast('Book reserved Successfully');
    
    //     axios.post(`http://localhost:3001/books/${bookId}/bookings`) 
    //     .then(res=>{
    //         console.log(res);
    //         toast('Booked Successfully')
    //         // alert(res);
    //     }).catch(err=> console.log(err));
    // }

    // booking
      


    // addingreviewmodal
    
    // AddReview = () =>{
    //     // alert(bookid);
    //     // const params = new URLSearchParams();
    //     // params.append('book_id', bookid);
    //     // params.append('review_id', reviewId);
    //     axios.post(`http://localhost:3001/reviews`, this.state.description, this.state.config) 
    //    .then(res=>{
    //        console.log(res);
    //        toast('Your Review Added Successfully');
    //     //    if(res.data != null){
    //     //         this.setState({"show": true})
    //     //         setTimeout(() => this.setState({"show": false}), 3000);
    //     //         // this.setState({
    //     //         //     books: this.state.books.filter(book => book._id !== bookid)
    //     //         // })
    //     //     }else{
    //     //     this.setState({"show": false});
    //     // }  
    //    }).catch(err=> console.log(err));
    // }
 
    // handleChange = (e)=>{
    //     this.setState({
    //     [e.target.name]: e.target.value    
    //     })
    // }


    // toggleReviewModal(){
        
    //     this.setState({
    //         reviewModal: true
    //     })
        
    // }



    // addingreviewmodal 
    
    

    //viewreviewsModal
    
     
    

    toggleReviews(){
        axios.get(`http://localhost:3001/reviews`, this.state.config) 
        .then(res=>{
            console.log(res);
            this.setState({reviews: res.data})
        }).catch(err=> console.log(err));

        this.setState({
            reviewsViewModal: true
        })
    }


    ViewReserves= (bookId) =>{
        axios.get(`http://localhost:3001/books/${bookId}/bookings`, this.state.config) 
        .then(res=>{
            console.log(res);
            this.setState({bookings: res.data})
        }).catch(err=> console.log(err));

        this.setState({
            BookreservesViewModal: true
        })

    }



    handleCloseModal = ()=>{
        this.setState({
            reviewModal: false
        })

        this.setState({
           BookreservesViewModal: false 
        })

        this.setState({
            reviewsViewModal: false
        })
    };

    //viewreviewsModal  

    render() { 
        
        return (

        <div className="main" style= {{width:'auto'}}>
            <Navigation/>
           
        <div className="container">
            
        {/* AddReviewModal      */}
{/*     
    
        <Modal isOpen={this.state.reviewModal} toggle={this.toggleReviewModal.bind(this)}>
            <ModalHeader toggle={this.handleCloseModal.bind(this)}>Review</ModalHeader>
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
                <Button color="primary" onClick={this.AddReview}>Submit</Button>{' '}
                <Button color="danger" onClick= {this.handleCloseModal.bind(this)}>Cancel</Button>
            </ModalFooter>
        </Modal>  */}

        {/* AddReviewModal       */}


        {/* viewreviewsmodal */}

            <Modal isOpen={this.state.reviewsViewModal} toggle={this.toggleReviews.bind(this)}>
                <ModalHeader toggle={this.handleCloseModal.bind(this)}>Reviews</ModalHeader>
                <ModalBody>
                
                <Table bordered hover striped>
                            <thead className="bg-info text-white text-center">
                                <tr>
                                    <th>Reviewed By</th>
                                    <th>Description</th>
                                </tr>    
                            </thead> 
                            <tbody className="responsive text-center">
                            {
                                // this.state.reviews.length === 0?
                                // <tr align="center">
                                //     <td colSpan="9">Reviews Available.</td>
                                // </tr>:
                                this.state.reviews.map((review)=>(
                                    <tr key = {review._id}>
                                        <td>{review.user}</td>
                                        <td>{review.description}</td>
                                    </tr>    
                                ))
                            }                            
                            </tbody>  
                    </Table> 

                </ModalBody>

            </Modal> 
         

        {/* viewreviewsmodal */}


         {/* viewbookreservesmodal */}

         <Modal isOpen={this.state.BookreservesViewModal} toggle={this.ViewReserves.bind(this)}>
                <ModalHeader toggle={this.handleCloseModal.bind(this)}>Book Reserves</ModalHeader>
                <ModalBody>
                
                <Table bordered hover striped>
                            <thead className="bg-info text-white text-center">
                                <tr>
                                    <th>Booked By</th>
                                    <th>Booked On</th>
                                    <th>Action</th>
                                </tr>    
                            </thead> 
                            <tbody className="responsive text-center">
                            {
                                // this.state.reviews.length === 0?
                                // <tr align="center">
                                //     <td colSpan="9">Reviews Available.</td>
                                // </tr>:
                                this.state.bookings.map((booking)=>(
                                    <tr key = {booking._id}>
                            
                                        <td>{booking.booked_by.email}</td>
                                        <td>{booking.booking_date}</td>

                                        {/* onClick={this.ViewReserves.bind(this, book._id)}  */}
                                        <td align="center">
                                           <ButtonGroup> 
                                            <Button size="sm" color="outline-success">                     
                                            <FontAwesomeIcon icon={faCheckCircle}/></Button>
                                            <Button size="sm" color="outline-danger">
                                            <FontAwesomeIcon icon={faWindowClose}/></Button>
                                           </ButtonGroup> 
                                        </td>
                                    </tr>    
                                ))
                            }                            
                            </tbody>  
                    </Table> 

                </ModalBody>

            </Modal> 
         

        {/* viewbookreservesmodal */}

{/* 
            <div style={{"display": this.state.show? "block": "none"}}>
                <MyToast children={{show:this.state.show, message: "Book Deleted Successfully"}}/>
            </div>    */}
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
                                <th>Reviews</th>
                                <th>Reserves</th>
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
                                    {book.image}                                             
                                    </td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.publisher}</td>
                                    <td>{book.format}</td>
                                    <td>{book.published_year}</td>
                                    <td align="center">
            
                                            {/* <Button onClick={this.toggleReviewModal.bind(this)} size="sm" color="outline-primary"><FontAwesomeIcon icon={faPlusCircle}/></Button> */}
                                            <Button onClick={this.toggleReviews.bind(this, book._id)} size="sm" color="outline-primary"><FontAwesomeIcon icon={faEye}/></Button>
                                        
                                    </td>
                                    <td align="center">
            
                                            {/* <Button onClick={this.toggleReviewModal.bind(this)} size="sm" color="outline-primary"><FontAwesomeIcon icon={faPlusCircle}/></Button> */}
                                            <Button onClick={this.ViewReserves.bind(this, book._id)} size="sm" color="outline-primary"><FontAwesomeIcon icon={faEye}/></Button>
                                        
                                    </td>
                                    <td>
                                        <ButtonGroup>
                                            <Link to={"update/"+book._id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit}/></Link>
                                            <Button size="sm" onClick={this.RemoveBook.bind(this, book._id)} color="outline-danger"><FontAwesomeIcon icon={faTrash}/></Button>
                                        
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
        </div>    

        )
    }
}
