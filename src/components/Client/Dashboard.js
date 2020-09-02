import React, { Component } from 'react';
import axios from 'axios';
// import MyToast from './MyToast'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Table, Card, CardBody, CardHeader, ButtonGroup, Button, Form, FormGroup, Label, 
    InputGroup, Input, Modal, ModalFooter, ModalBody, ModalHeader} from 'reactstrap';   
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faList, faPlusCircle, faEye, faBook, faSearch} from '@fortawesome/free-solid-svg-icons'
// import {Link} from 'react-router-dom'
import Navigationbar from './Navigationbar'




toast.configure();
export default class Dashboard extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
            bookid: '',
            books: [],
            reviews:[],
            search: '',
            bookings: [],
            reviewModal: false,
            reviewsViewModal: false,
            description:'',
            IsBooked: false,
            selectedValue:'',
            reviewid:'',
            show: false,
            // Authorization: 'Bearer' + localStorage.getItem('token')

            config: {
                headers: {'authorization': `Bearer ${localStorage.getItem('token')}`}
            }
        }
    }

    componentDidMount(){
    //    alert(this.state.books);
    //    this.viewReserves();
       this.getbooks();
    //    let bookId = this.props.match.params.id 
    //    if(bookId){
    //     this.AddReview(bookId);
    //    }
    
    //    this.getreviews(); 
    }


    getbooks(){
        axios.get('http://localhost:3001/books', this.state.config) 
       .then(res=>{
           console.log(res);
           this.setState({books: res.data})
       }).catch(err=> console.log(err));
    }


    ///searching
    handlesearch=(e)=>{
       this.setState({
        [e.target.name]: e.target.value 
       })
    }
    ///searching


   //getreserves
//    viewReserves(){
//         let bookId = this.state.selectedValue;   
//         // alert(bookId) 
//         axios.get(`http://localhost:3001/books/${bookId}/bookings`, this.state.config) 
//         .then(res=>{
//             console.log(res);
//             this.setState({bookings: res.data})
//         }).catch(err=> console.log(err));
//    }
   //getreserves


    // booking
    ReserveBook=(bookId)=>{
        let IsBooked = this.state;
        // toast('Book reserved Successfully');
        const params = new URLSearchParams();
        params.append('booked_by', params._id);
        // alert(params._id);
            if(this.state.IsBooked){
                axios.post(`http://localhost:3001/books/${bookId}/bookings`, params._id, this.state.config) 
                .then(res=>{
                    console.log(res);
                    // if(res.data[0].booked_by[0].email){
                    //     toast("You have already reserved this book");
                    // }else{
                    //     toast('Book Reserved Successfully');
                    // }
                    // alert(res.data[8].booked_by[0].email);
                    this.setState({
                        IsBooked: true
                    })
                    toast('Book Reserved Successfully');
                  
                }).catch(err=> console.log(err))
            }else{
                toast('You have already reserved')
            }
            
    }

    // booking
      


    // addingreviewmodal
    AddReview = () =>{ 
        const bookId = this.state.selectedValue;
        const params = new URLSearchParams();
        params.append('user', params.id);
        params.append('description', this.state.description);

        // alert(bookId);
        
        axios.post(`http://localhost:3001/books/${bookId}/reviews`, params, this.state.config) 
       .then(res=>{
           console.log(res);
            toast("Review Added Successfully");
       }).catch(err=> console.log(err));
    }
 
    handleChange = (e)=>{
        this.setState({
        [e.target.name]: e.target.value    
        })
    }


    toggleReviewModal(bookid){
        this.setState({
            selectedValue: bookid
        })
        this.setState({
            reviewModal: true
        })
        
    }



    // addingreviewmodal 
    
    

    //viewreviewsModal
    
     
    
//    getreviews
    // toggleReviews(bookId){
    //     // const params = new URLSearchParams();
    //     // params.append(reviewId, params._id);
    //     // alert(bookId + '' +reviewId);
    //     // let reviewId = this.state.reviewid;
    //     alert(reviewId);
    //     axios.get(`http://localhost:3001/books/${bookId}/reviews`, this.state.config) 
    //     .then(res=>{
    //         // console(params._id)
    //         console.log(res);
    //         this.setState({reviews: res.data})
    //     }).catch(err=> console.log(err));

    //     this.setState({
    //         reviewsViewModal: true
    //     })
    // }

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


   ///handle close view review modal
    handleCloseModal = (reviewId)=>{
        this.setState({
            reviewModal: false
        })
        this.setState({
            reviewsViewModal: false,
        })
        // this.setState({
        //     reviewid: reviewId
        // })
    };


    //viewreviewsModal  

    render() { 
       
       let {search} = this.state;
       let filteredBooks = this.state.books.filter((book)=>{
          return book.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
       })
    //    .filter(book=>{
        //    alert(this.state.books.title);
        //    return book.title.toLowerCase().indexof(search.toLocaleLowerCase()) !== -1
    //    }) 

        return (

           
        <div className="main" style= {{width:'auto'}}>
            <Navigationbar/>
           
        <div className="container">
            
        {/* AddReviewModal      */}
    
    
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
        </Modal> 

        {/* AddReviewModal       */}


        {/* viewreviewsmodal */}
            
            <Modal isOpen={this.state.reviewsViewModal} toggle={this.toggleReviews.bind(this)}>
            <ModalHeader  toggle={this.handleCloseModal.bind(this)}>Reviews</ModalHeader>     
               
                <ModalBody>
                <Table bordered hover striped>
                            <thead className="bg-info text-white text-center">
                                <tr>
                                    <th>Reviewed By</th>
                                    <th>Description</th>
                                    {/* <th>Close</th> */}
                                </tr>    
                            </thead> 
                            <tbody className="responsive text-center">
                            {
                                this.state.reviews.length === 0?
                                <tr align="center">
                                    <td colSpan="9">Reviews Not Available.</td>
                                </tr>:
                                this.state.reviews.map(review=>(
                                       
                                    <tr key={review._id}>
                                      
                                      <td>
                                          {review.user.email}                      
                                       </td>
                                       <td>
                                           {review.description} 
                                        </td>
                                        {/* <td>{review.description}</td> */}


                                        {/* <td>
                                        <Button color="danger" onClick= {this.handleCloseModal.bind(review._id)}>Cancel</Button>
                                        </td> */}
                                    </tr> 
                                ))
                            }                           
                            </tbody>  
                    </Table> 

                </ModalBody>

            </Modal> 
         

        {/* viewreviewsmodal */}

{/* 
            <div style={{"display": this.state.show? "block": "none"}}>
                <MyToast children={{show:this.state.show, message: "Book Deleted Successfully"}}/>
            </div>    */}
        <InputGroup className="mt-5" style={{width: "400px"}}>
        <FontAwesomeIcon className="fa-2x" icon={faSearch}/><Input  name="search" placeholder="Search Book"
        value={this.state.search} onChange={this.handlesearch}></Input>
        </InputGroup>


        <Card className="mt-5 table-responsive">
        <CardHeader className="bg-info text-white"><FontAwesomeIcon icon={faList}/>Book Lists
        </CardHeader>
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
                                {/* <th>Status</th> */}
                                <th>Review</th>
                                <th>Reserve</th>
                            </tr>    
                        </thead> 
                        {/* <img height="50" width="43" alt="logo"
             src={this.state.pic}  */}
                        <tbody className="text-center">
                        {
                            this.state.books.length === 0?
                            <tr align="center">
                                <td colSpan="9">Books Available.</td>
                            </tr>:
                            filteredBooks.map((book)=>(
                                <tr key = {book._id}>
                                
                                    <td> 
                                    <img src={`http://localhost:3001/uploads/${book.image}`} alt="bookcover" width="100px" height="100px" style={{borderRadius: "50%"}}/>                                            
                                    </td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.publisher}</td>
                                    <td>{book.format}</td>
                                    <td>{book.published_year}</td>
                                    {/* <td>{book.status}</td> */}
                                    <td align="center">
                                        <ButtonGroup>
                                            <Button onClick={this.toggleReviewModal.bind(this, book._id)} size="sm" color="outline-primary"><FontAwesomeIcon icon={faPlusCircle}/></Button>
                                            <Button onClick={this.toggleReviews.bind(this, book._id)} size="sm" color="outline-primary"><FontAwesomeIcon icon={faEye}/></Button>
                                        </ButtonGroup>
                                    </td>
                                    <td>
                                        
                                            <Button size="sm" color="outline-success" onClick={this.ReserveBook.bind(this, book._id)}><FontAwesomeIcon icon={faBook}/></Button>
                                        
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
