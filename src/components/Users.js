import React, { Component } from 'react';
import axios from 'axios';
// import MyToast from './MyToast'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Table, Card, CardBody, CardHeader, ButtonGroup, Button} from 'reactstrap';   
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faList, faTrash} from '@fortawesome/free-solid-svg-icons'
// import {Link} from 'react-router-dom'
import Navigation from './Navigation'



toast.configure();
export default class Dashboard extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
            users: [],
            // Authorization: 'Bearer' + localStorage.getItem('token')
            config: {
                headers: {'authorization': `Bearer`+ localStorage.getItem('token')}
            }
        }
    }

    componentDidMount(){
       this.getusers();
    //    const bookId = this.props.match.params.id 
         
    //    this.getreviews(); 
    }


    getusers(){
        axios.get('http://localhost:3001/users', this.state.config) 
       .then(res=>{
           console.log(res);
           this.setState({users: res.data})
       }).catch(err=> console.log(err));
    }

    // UpdateBook= (bookid) =>{
    
    // //    toast('Updated')
    // }

    RemoveUser= (userId) =>{
        axios.delete('http://localhost:3001/users/'+userId)
        .then (res =>{    

            toast('User Deleted Successfully');
            // if(res.data != null){
            //     this.setState({"show": true})
            //     setTimeout(() => this.setState({"show": false}), 3000);
             this.setState({
                users: this.state.users.filter(user => user._id !== userId)
            })
            // }else{
            //     this.setState({"show": false});
            // }  

        }).catch(err=> console.log(err));
        
    }

    render() { 
        
        return (

        <div className="main" style= {{width:'auto'}}>
            <Navigation/>
           
        <div className="container">
        
{/* 
            <div style={{"display": this.state.show? "block": "none"}}>
                <MyToast children={{show:this.state.show, message: "Book Deleted Successfully"}}/>
            </div>    */}
            <Card className="mt-5 table-responsive ">
                <CardHeader className="bg-info text-white"><FontAwesomeIcon icon={faList}/>Users Lists</CardHeader>
                <CardBody>
                     <Table bordered hover striped>
                        <thead className="bg-info text-white text-center">
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>    
                        </thead> 
                        {/* <img height="50" width="43" alt="logo"
             src={this.state.pic}  */}
                        <tbody className="responsive text-center">
                        {
                            this.state.users.length === 0?
                            <tr align="center">
                                <td colSpan="9">Users Not Available.</td>
                            </tr>:
                            this.state.users.map((user)=>(
                                <tr key = {user._id}>
                                    <td> 
                                    {user.email}                                             
                                    </td>
                                    <td>{user.firstname}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.role}</td>
                                    <td align="center">
                                        <ButtonGroup>
                                
                                            <Button onClick={this.RemoveUser.bind(this, user._id)} size="sm" color="outline-danger"><FontAwesomeIcon icon={faTrash}/></Button>
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
