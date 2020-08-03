import React, { Component } from 'react'
import {Nav, Navbar} from 'reactstrap'
import {Link} from 'react-router-dom'

import booklogo from '../booklogo.png'

export default class Navigationbar extends Component {
    render() {
        return (
            <div>
                <Navbar color="light">
                    <Link to={""} className="navbar-brand text-dark">
                        <img src={booklogo} width="30" height="30" alt="logo"/>Book Reservation
                    </Link>
                    <Nav className="mr-auto">
                        <Link to={"dashboard"} className="nav-link text-muted">Books</Link>
                        <Link to={""} className="nav-link text-muted">ABC</Link>
                    </Nav>    
                </Navbar>
            </div>
        )
    }
}
