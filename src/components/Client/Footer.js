import React, { Component } from 'react'
import {Navbar, Container, Col} from 'reactstrap'
import { Link } from 'react-router-dom'


export default class Footer extends Component {
    render() {
        return (
            <Navbar fixed='bottom' color="light">
                <Container>
                    <Col lg={12} className="text-center text-muted">
                       <div>© 2020 All Rights Reserved <br/>
                        <Link to='dashboard'>Onlie Book Reservation</Link>
                       </div>
                    </Col>
                </Container>
            </Navbar>

        )
    }
}
