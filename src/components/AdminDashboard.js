import React, { Component } from 'react';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Form, FormGroup, Label, Input, Button, Card, CardHeader, CardBody, CardFooter, Col, Row} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faList,faEdit, faSave, faPlusSquare, faRecycle} from '@fortawesome/free-solid-svg-icons'
import Navigation from './Navigation'
import axios from 'axios';

// import { Redirect } from 'react-router-dom';

toast.configure();

export default class AdminDashboard extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
            bookid: '',
            title: '',
            author: '',
            publisher: '',
            format: 'Hardcover',
            published_year: '',
            image: ''

            // isRegistered: false
        }
    }

    
    initialState = {
        bookid:'', title: '', author: '', publisher: '',  format: '', published_year: '', files: ''
    }

    componentDidMount(){
        const bookId = this.props.match.params.id;
        if(bookId){
         this.findbyIdandUpdateBook(bookId);
        }

    };

    
 

    handleChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.name === 'published_year' ? parseInt(e.target.value) : e.target.value
            // [e.target.name]: e.target.value
        });  

    };

    // handlePublishedYear = (e)=>{
    //     this.setState({
    //     [e.target.name]: parseInt(e.target.value)
    //     // [e.target.name]: e.target.valueAsNumber || e.target.value  
    // });  

    // };


    handleImageChange = (e)=>{
        this.setState({
            image: e.target.files[0]
        })
    };

    handleAddbook = (e)=>{
        // alert(`${this.state.format}`)
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('author', this.state.author);
        formData.append('publisher', this.state.publisher);
        formData.append('format', this.state.format);
        formData.append('published_year', this.state.published_year);
        formData.append('image', this.state.image);

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

    updateBook = ()=>{
        // const bookId
        const formData = new FormData();
        formData.append('bookid', this.state.bookid);
        formData.append('title', this.state.title);
        formData.append('author', this.state.author);
        formData.append('publisher', this.state.publisher);
        formData.append('format', this.state.format);
        formData.append('published_year', this.state.published_year);
        formData.append('image', this.state.image);

        axios.put(`http://localhost:3001/books/`+this.state.bookid, formData, 
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        })
        // .then(()=> this.props.onCreate())
        .then((res)=>{
          console.log(res); 
        //   <Redirect to = '/dashboard'/>
          toast('Book Updated Successfully')
        //   this.setState({
        //       isRegistered: true
        //   })
        }).catch(err=> console.log(err));
    };
    
    

    findbyIdandUpdateBook= (bookid) =>{
        // alert(bookId)
        axios.get('http://localhost:3001/books/'+bookid, this.state.config) 
        .then(res=>{
            // alert(res.data._id)
            if(res.data != null){
                this.setState({
                   bookid: res.data._id,
                   title: res.data.title,
                   author: res.data.author,
                   publisher: res.data.publisher,
                   format: res.data.format,
                   published_year: res.data.published_year,
                   image: res.data.image              
                })
            }
            
        }).catch(err=> console.log(err));
    };

    handleViewbook = ()=>{
        return this.props.history.push("/books")
    };

    handleReset = ()=>{
        this.setState(()=> this.initialState);
    };
    
    
    render() {
        let {bookid, title, author, publisher, format, published_year} = this.state;
        // if(isRegistered){
        //     return <Redirect to='/'/>;
        // }
        return (
        <div>
            <Navigation/>    
        <div className="container">
            <Card className="bg-light mt-5" > 
            <CardHeader className="bg-info text-white">
                <FontAwesomeIcon icon={this.state.bookid? faEdit: faPlusSquare}/>{this.state.bookid? "Update Book": "Add New Book"}</CardHeader>
            <Form onReset={this.handleReset}>
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
                        <Label for="published_year">Year of publication</Label>
                        <Input type='number' name="published_year" id="published_year" placeholder="Enter Book Published Year" 
                        value={published_year} onChange= {this.handleChange}/>     
                
                    </FormGroup>
                </Col> 

                <Col md={6}> 
                <FormGroup>
                <Label for="format">Format</Label>
                    <select className="form-control" name="format" id="format"
                    value={format} onChange= {this.handleChange}>
                        <option value="Hardcover">Hardcover</option>
                        <option value="Journal">Journal</option>
                        <option value="Magazine">Magazine</option>
                    </select>
                      
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

               <Button type="submit" size="sm" color='info' onClick={bookid? this.updateBook : this.handleAddbook}>
                   <FontAwesomeIcon icon={bookid ? faEdit: faSave}/>{bookid ? "UPDATE":"SAVE"}</Button>{' '}
               <Button type="reset" size="sm" color='info' onClick= {this.handleReset.bind()}>
                   <FontAwesomeIcon icon={faRecycle}/>RESET</Button>{' '}
               <Button size="sm" color='info' onClick= {this.handleViewbook.bind()}>
                   <FontAwesomeIcon icon={faList}/>View Books</Button>
            </CardFooter>
            </Card>  
              
        </div>
        </div>
        )
    }
}
