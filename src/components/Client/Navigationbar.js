import React, { Component } from 'react'
import {Nav, Navbar, Button} from 'reactstrap'
import {Link, Redirect} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
// import Login from './Login'

import booklogo from './booklogo.png'

export default class Navigationbar extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            isloggedout: false
        }
    }

    handleLogout= () =>{
        localStorage.removeItem('token');
        this.setState({
            isloggedout: true
        })
    }


    render() {  
        let {isloggedout} = this.state;
        if(isloggedout){
            return <Redirect to= '' /> 
        }
        
        return (
          
                <Navbar className="col-lg-12" color="light">
                    <Link to={"dashboard"} className="navbar-brand text-dark">
                        <img src={booklogo} width="30" height="30" alt="logo"/>Book Reservation
                    </Link>
                    
                    <Nav className="mr-auto">
                    <Link to={"dashboard"} className="nav-link text-muted mr-auto">Books</Link>
            
                    </Nav>
                    <Button className="" color="info" onClick={this.handleLogout}>
                        <FontAwesomeIcon icon={faPowerOff}/>Log Out</Button>    
                </Navbar>
            
        )
         
    }
}
